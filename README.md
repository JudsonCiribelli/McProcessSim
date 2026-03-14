# 🍔 McProcessim - Autoatendimento Digital

![Next Js](https://img.shields.io/badge/NextJs-000000?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![postgresql](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-039BE5?style=for-the-badge&logo=stripe&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)

> Autoatendimento Digital: Uma réplica funcional de um totem de autoatendimento, focada em UX fluida e processos de pagamento seguros.

---

## 💻 Sobre o Projeto

O McProcessim é uma aplicação Full-stack que simula a experiência completa de um terminal de autoatendimento. Desde a escolha do tipo de consumo (local ou viagem) até a personalização detalhada do pedido e checkout final.

O foco principal deste projeto foi a integridade dos dados e a experiência do usuário, garantindo que informações sensíveis como CPF sejam validadas corretamente antes de qualquer transação financeira.

### 🛡️ Destaques Técnicos

- **Validação de Dados com Zod**
  Implementei uma camada de segurança no checkout que valida o CPF e o nome do cliente. Isso evita que requisições malformadas cheguem à API de pagamentos, melhorando a confiabilidade do sistema.

- **Server-Side Logic**
  Utilizei Server Actions do Next.js para lidar com a criação das sessões de checkout do Stripe, mantendo as chaves secretas protegidas no servidor e garantindo uma comunicação segura entre o backend e o gateway.

### 🛡️ Segurança e Integridade de Dados

- **Checkout com Validação:** Coleta de nome e CPF do usuário validada via Zod para garantir dados consistentes antes do redirecionamento ao Stripe.

### 📊 Arquitetura e Estado Global

- **Context API:** Centralização da lógica de autenticação e dados de anúncios, evitando o prop drilling e melhorando a manutenção do código.
- **Custom Hooks:** Abstração de lógicas complexas para componentes reutilizáveis e código mais limpo.

### 🎨 UI/UX Responsiva (Mobile-First)

- Interface construída com Tailwind CSS, garantindo que a experiência de compra seja idêntica e fluida tanto em dispositivos móveis quanto em desktops.

---

## 🛠 Tecnologias Utilizadas

- **[NextJs](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática.
- **[Postgresql](https://www.postgresql.org/docs/)** - Database.
- **[Stripe](https://docs.stripe.com/)** - Gateway de pagamento.
- **[Tailwind](https://tailwindcss.com/)** - Estilização.
- **[Zod](https://zod.dev/)** - Validação de Schemas.

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado (v18 ou superior).

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/JudsonCiribelli/mcprocessim.git
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   **Crie um arquivo .env.local na raiz e adicione suas credenciais do Stripe**
   ```Snippet de código
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=...
   STRIPE_SECRET_KEY=...
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
4. **Rode o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

- Desenvolvido por Judson Rodrigues Ciribelli Filho 🚀

---
