import { MongoClient } from 'mongodb';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

async function syncMongo() {
  const prodUri = process.env.PROD_MONGO_URI;
  const betaUri = process.env.BETA_MONGO_URI;

  if (!prodUri || !betaUri) {
    throw new Error('MongoDB connection URIs not provided');
  }

  const prodClient = new MongoClient(prodUri);
  const betaClient = new MongoClient(betaUri);

  await prodClient.connect();
  await betaClient.connect();

  const prodDb = prodClient.db();
  const betaDb = betaClient.db();

  await betaDb.dropDatabase();

  const collections = await prodDb.collections();
  for (const collection of collections) {
    const betaCollection = betaDb.collection(collection.collectionName);
    const cursor = collection.find();
    const batch: any[] = [];
    for await (const doc of cursor) {
      batch.push(doc);
      if (batch.length === 1000) {
        await betaCollection.insertMany(batch);
        batch.length = 0;
      }
    }
    if (batch.length > 0) {
      await betaCollection.insertMany(batch);
    }
  }

  await prodClient.close();
  await betaClient.close();
}

interface Resource {
  secure_url: string;
  public_id: string;
  resource_type: 'image' | 'video' | 'raw';
}

async function fetchResourcesByType(resource_type: 'image' | 'video' | 'raw'): Promise<Resource[]> {
  const resources: Resource[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.api.resources({
      resource_type,
      max_results: 500,
      next_cursor: nextCursor,
    } as any);
    resources.push(
      ...result.resources.map((r: any) => ({
        secure_url: r.secure_url,
        public_id: r.public_id,
        resource_type: r.resource_type,
      }))
    );
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return resources;
}

async function syncCloudinary() {
  const prodConfig = {
    cloud_name: process.env.PROD_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.PROD_CLOUDINARY_API_KEY,
    api_secret: process.env.PROD_CLOUDINARY_API_SECRET,
  };

  const betaConfig = {
    cloud_name: process.env.BETA_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.BETA_CLOUDINARY_API_KEY,
    api_secret: process.env.BETA_CLOUDINARY_API_SECRET,
  };

  if (Object.values(prodConfig).some((v) => !v) || Object.values(betaConfig).some((v) => !v)) {
    throw new Error('Cloudinary credentials not fully provided');
  }

  cloudinary.config(prodConfig);
  const images = await fetchResourcesByType('image');
  const videos = await fetchResourcesByType('video');
  const raws = await fetchResourcesByType('raw');
  const resources = [...images, ...videos, ...raws];

  cloudinary.config(betaConfig);
  for (const type of ['image', 'video', 'raw'] as const) {
    await cloudinary.api.delete_all_resources({ resource_type: type });
  }

  for (const resource of resources) {
    await cloudinary.uploader.upload(resource.secure_url, {
      public_id: resource.public_id,
      resource_type: resource.resource_type,
      overwrite: true,
    });
  }
}

async function main() {
  await syncMongo();
  await syncCloudinary();
  console.log('Sync completed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
