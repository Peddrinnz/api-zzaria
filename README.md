# Pi-Zzaria

Sistema completo de comercialização de pizzas com API REST, MongoDB e autenticação JWT.

## Funcionalidades

- **Usuários**: Registro, login, perfil
- **Pizzas**: CRUD de pizzas
- **Pedidos**: Criar pedidos, gerenciar status
- **Autenticação**: JWT para proteger rotas
- **Documentação**: Swagger UI em `/api-docs`

## Tecnologias

- Node.js
- Express.js
- MongoDB com Mongoose
- JWT para autenticação
- Swagger para documentação

## Instalação

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure o arquivo `.env` baseado no `.env.example`
4. Execute: `npm run dev` para desenvolvimento ou `npm start` para produção

## Variáveis de Ambiente

- `PORT`: Porta do servidor (padrão 3000)
- `MONGO_URI`: URI de conexão com MongoDB
- `JWT_SECRET`: Chave secreta para JWT

## Endpoints

### Usuários
- `POST /api/users/register` - Registrar usuário
- `POST /api/users/login` - Fazer login
- `GET /api/users/profile` - Obter perfil (autenticado)
- `PUT /api/users/profile` - Atualizar perfil (autenticado)
- `DELETE /api/users/profile` - Deletar conta (autenticado)

### Pizzas
- `GET /api/pizzas` - Listar pizzas
- `GET /api/pizzas/:id` - Obter pizza por ID
- `POST /api/pizzas` - Criar pizza (autenticado)
- `PUT /api/pizzas/:id` - Atualizar pizza (autenticado)
- `DELETE /api/pizzas/:id` - Deletar pizza (autenticado)

### Pedidos
- `POST /api/orders` - Criar pedido (autenticado)
- `GET /api/orders/my` - Obter pedidos do usuário (autenticado)
- `GET /api/orders` - Obter todos os pedidos (autenticado, admin)
- `GET /api/orders/:id` - Obter pedido por ID (autenticado)
- `PUT /api/orders/:id/status` - Atualizar status do pedido (autenticado)
- `DELETE /api/orders/:id` - Deletar pedido (autenticado)

## Documentação

Acesse `/api-docs` para ver a documentação completa da API.