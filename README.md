# 📘 LP — Bloco de Notas com Supabase

Um sistema simples de **bloco de notas** (CRUD completo) desenvolvido com **JavaScript**, **Tailwind CSS**, e **Supabase via API RESTful**.  
Com ele é possível criar, listar, editar e excluir notas de forma rápida, leve e totalmente integrada ao banco de dados do Supabase.

---

## 🚀 Funcionalidades

- Criar notas com título e conteúdo  
- Listar todas as notas cadastradas  
- Editar notas usando um modal elegante  
- Excluir notas com confirmação  
- Integração direta com o Supabase via API REST (sem SDK)  
- Interface moderna com Tailwind CSS  
- Código simples, modular e fácil de entender  

---

## 🧱 Tecnologias Utilizadas

- **JavaScript Vanilla**
- **HTML5 + CSS3**
- **Tailwind CSS**
- **Supabase (REST API / Banco de Dados)**
- **Fetch API**

---

## 📂 Estrutura de Pastas do Projeto
  /API
    /DB
      Get.js → buscar notas (SELECT)
      Post.js → criar notas (INSERT)
      Up.js → atualizar notas (UPDATE)
      Del.js → deletar notas (DELETE)
    /SupaBase
      config.js → guarda API_URL e API_KEY para o Supabase
  /scripts
    index.js → lógica de frontend (eventos + renderização)
index.html → página principal
README.md → documentação


---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, você precisa:

1. Criar um projeto no **Supabase**
2. Criar a tabela:

 **TB_LP**
 id (int4) PK
 Titulo (text)
 Conteudo (text)

3. Ativar **RLS (Row Level Security)**  
4. Criar policies que permitam inserir, selecionar, editar e excluir dados via API pública  
5. Inserir sua **API_URL** e **API_KEY** no arquivo:
  ***/API/SupaBase/config.js***

---

## 🔧 Como Rodar o Projeto Localmente

1. Clone o repositório:

```bash
git clone https://github.com/EnzoKevin/LP.git
```

2. Abra o projeto no VS Code ou outro editor
3. Configure o arquivo:
  ***/API/SupaBase/config.js***
      export const API_URL = "https://SEU_PROJETO.supabase.co/rest/v1";
      export const API_KEY = "SUA_CHAVE_ANON";

4. Rode o projeto com um servidor local:
     ***npx http-server .***

Ou use o Live Server do VS Code.
