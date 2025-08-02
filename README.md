# profissa-livre-sync

Ferramenta em Node.js para sincronizar dados do MongoDB e arquivos do Cloudinary do ambiente de produção para o ambiente beta. O processo realiza uma cópia completa dos recursos de produção após limpar o ambiente beta.

## Configuração

1. Copie o arquivo `.env.example` para `.env` e preencha as credenciais de produção e beta.
2. Instale as dependências:
   ```bash
   npm install
   ```

## Uso

Compile o projeto e execute o script de sincronização:

```bash
npm run build
node dist/index.js
```

Para desenvolvimento, é possível usar:

```bash
npm run dev
```

**Atenção:** a execução apaga todos os dados e arquivos do ambiente beta antes de copiar os recursos de produção.
