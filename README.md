# 🍽️ Plataforma de Gestão de Pedidos

Sistema completo para gerenciamento de pedidos, ideal para restaurantes, lanchonetes ou serviços de entrega. Permite que clientes façam pedidos e que atendentes/administradores gerenciem estoque, cardápio, pedidos, pagamentos e gerem relatórios.

## ✨ Funcionalidades

### 👤 Cliente

- Visualização do cardápio dinâmico
- Realização de pedidos com cálculo automático
- Acompanhamento do status do pedido
- Integração com sistema de pagamentos

### 🧑‍💼 Atendente / Admin

- **Dashboard** com métricas e indicadores
- **Gestão de cardápio** (CRUD de produtos, categorias, preços)
- **Controle de estoque** com atualização automática após pedidos
- **Painel de pedidos** em tempo real (novos, em preparo, entregues)
- **Geração de relatórios** (vendas, produtos mais vendidos, etc.)
- **Sistema de login** por usuário (autenticação)
- **Gestão de pagamentos** integrada

## 🧰 Tecnologias

| Ferramenta      | Versão                   |
| --------------- | ------------------------ |
| Node.js         | 24.13.1                  |
| React           | 19.2.3                   |
| Next.js         | 16.1.6                   |
| Prisma          | 7.8                      |
| Shadcn/ui       | 11.8.0                   |
| React Hook Form | 71.2                     |
| Banco de dados  | PostgreSQL (recomendado) |

## 📋 Pré-requisitos

- Node.js 24.13.1 (use [nvm](https://github.com/nvm-sh/nvm) se necessário)
- npm, yarn, pnpm ou bun
- PostgreSQL instalado ou serviço em nuvem (ex: [Neon](https://neon.tech), [Supabase](https://supabase.com))

## 🚀 Instalação e configuração

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

# Instale as dependências

npm install

### ou

yarn install

### ou

pnpm install

### ou

bun install

# Configure as variáveis de ambiente

# Banco de dados (PostgreSQL)

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

# Autenticação (exemplo com NextAuth – ajuste conforme sua implementação)

```bash
NEXTAUTH_SECRET="seu-segredo-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

- Opcional: chaves de gateway de pagamento, serviços externos etc.

# Execute as migrations do Prisma

```bash
npx prisma migrate dev --name init
```

# Gere o cliente Prisma (executado automaticamente no migrate)

```bash
npx prisma generate
```

# Inicie o servidor de desenvolvimento

```bash
npm run dev
```

## Comandos úteis do Prisma

### Criar nova migration

```bash
npx prisma migrate dev --name nome_da_mudanca
```

### Gerar cliente Prisma

```bash
npx prisma generate
```

### Abrir interface visual do banco

```bash
npx prisma studio (ou npx prisma studio --port 5556)
```

### Resetar banco e aplicar migrations

```bash
npx prisma migrate reset
```
