# 🚀 Projeto Fullstack com Next.js e Appwrite

Este repositório contém o projeto desenvolvido durante a masterclass ["Next.js and Appwrite Masterclass - Build FullStack Projects"](https://www.udemy.com/course/nextjs-and-appwrite-masterclass-build-fullstack-projects) disponível na Udemy. O foco da aplicação é demonstrar a integração entre Next.js (App Router) e Appwrite, com autenticação, banco de dados e layout modernos utilizando Tailwind CSS.

## 🛠️ Tecnologias Utilizadas

- [Next.js 13+ (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Appwrite](https://appwrite.io/) — Backend as a Service (BaaS)
- [ShadCN/UI](https://ui.shadcn.com/) — Componentes modernos com suporte a tema escuro

## 📁 Estrutura de Pastas

```
src/
├── app/                  # Rotas públicas e privadas (App Router)
├── components/           # Componentes reutilizáveis
├── config/               # Configurações do Appwrite
├── constants/            # Constantes da aplicação
├── helpers/              # Funções utilitárias
├── interfaces/           # Tipagens TypeScript
├── layout/               # Estrutura visual
├── lib/                  # Funções auxiliares e bibliotecas
├── services/             # Interações com Appwrite (auth, database, etc.)
└── store/                # Estado da aplicação
```

## ⚙️ Configuração Inicial

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. **Instale as dependências**:

```bash
npm install
# ou
yarn
```

3. **Configure as variáveis de ambiente**:

Renomeie o arquivo `.env.example` para `.env.local` e preencha com os valores do seu projeto Appwrite.

4. **Inicie o servidor local**:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o app rodando.

## 🔐 Variáveis de Ambiente

Crie o arquivo `.env.local` com o seguinte conteúdo:

```
NEXT_PUBLIC_APPWRITE_URL=http://localhost/v1
NEXT_PUBLIC_APPWRITE_PROJECT=SEU_PROJECT_ID
NEXT_PUBLIC_APPWRITE_DATABASE=SEU_DATABASE_ID
NEXT_PUBLIC_APPWRITE_COLLECTION=SEU_COLLECTION_ID
```

Esses valores devem ser obtidos diretamente no console do Appwrite.

## 👨‍💻 Autor

Projeto desenvolvido e publicado por [Stanislaw Cruz](https://github.com/stanycruz), com base nos estudos realizados durante a masterclass da Udemy sobre Next.js e Appwrite.

---

Sinta-se à vontade para contribuir ou adaptar este projeto para suas próprias necessidades.
