# profissa-livre-sync

Ferramenta de linha de comando para sincronizar dados do MongoDB e arquivos do Cloudinary de um ambiente de produção para um ambiente beta. O script apaga a base de dados e os arquivos existentes no beta antes de copiar os recursos de produção, garantindo que ambos os ambientes fiquem alinhados.

## Recursos

- Clona todas as coleções do MongoDB do ambiente de produção para o beta.
- Copia imagens, vídeos e arquivos *raw* do Cloudinary.
- Limpa previamente os dados e os *assets* no ambiente beta antes da sincronização.
- Compatível com Node.js 18 ou superior.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou mais recente.
- Contas e credenciais para MongoDB e Cloudinary nos ambientes de produção e beta.

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Copie o arquivo `.env.example` para `.env` e preencha as variáveis com suas credenciais:

| Variável | Descrição |
| --- | --- |
| `PROD_MONGO_URI` | URI de conexão do MongoDB de produção. |
| `BETA_MONGO_URI` | URI de conexão do MongoDB do beta. |
| `PROD_CLOUDINARY_CLOUD_NAME` | Nome do *cloud* do Cloudinary de produção. |
| `PROD_CLOUDINARY_API_KEY` | API key do Cloudinary de produção. |
| `PROD_CLOUDINARY_API_SECRET` | API secret do Cloudinary de produção. |
| `BETA_CLOUDINARY_CLOUD_NAME` | Nome do *cloud* do Cloudinary do beta. |
| `BETA_CLOUDINARY_API_KEY` | API key do Cloudinary do beta. |
| `BETA_CLOUDINARY_API_SECRET` | API secret do Cloudinary do beta. |

## Uso

Compile o projeto e execute o script de sincronização:

```bash
npm run build
node dist/index.js
```

Durante o desenvolvimento é possível rodar diretamente com TypeScript:

```bash
npm run dev
```

## Aviso

**Atenção:** a sincronização **remove todos os dados e arquivos** existentes no ambiente beta antes de copiar os recursos de produção. Certifique-se de que este é o comportamento desejado.

## Testes

Para garantir que o projeto compila corretamente, execute:

```bash
npm test
```

## Licença

Este projeto está licenciado sob a licença ISC.

