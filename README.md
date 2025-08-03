# profissa-livre-sync

A Node.js utility that clones MongoDB data and Cloudinary assets from a production environment to a beta environment. The script wipes the beta database and storage before copying resources to keep both environments in sync.

## Features

- Copies every MongoDB collection from production to beta.
- Mirrors Cloudinary images, videos, and raw files.
- Deletes existing data and assets on the beta environment prior to synchronization.

## Prerequisites

- Node.js 18 or later.
- Credentials for both production and beta MongoDB and Cloudinary accounts.

## Setup

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in the required credentials.

   | Variable | Description |
   | --- | --- |
   | `PROD_MONGO_URI` | MongoDB connection URI for the production database. |
   | `BETA_MONGO_URI` | MongoDB connection URI for the beta database. |
   | `PROD_CLOUDINARY_CLOUD_NAME` | Cloud name of the production Cloudinary account. |
   | `PROD_CLOUDINARY_API_KEY` | API key for the production Cloudinary account. |
   | `PROD_CLOUDINARY_API_SECRET` | API secret for the production Cloudinary account. |
   | `BETA_CLOUDINARY_CLOUD_NAME` | Cloud name of the beta Cloudinary account. |
   | `BETA_CLOUDINARY_API_KEY` | API key for the beta Cloudinary account. |
   | `BETA_CLOUDINARY_API_SECRET` | API secret for the beta Cloudinary account. |

## Usage

Build the project and execute the synchronization script:

```bash
npm run build
node dist/index.js
```

For development, run the script directly with TypeScript:

```bash
npm run dev
```

## Warning

Running the synchronization **deletes all data and files** in the beta environment before copying resources from production. Ensure this is the desired behavior before running the script.

## Testing

Compile the TypeScript sources to verify the build:

```bash
npm test
```

## License

This project is licensed under the ISC License.

