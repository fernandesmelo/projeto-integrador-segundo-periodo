# Sistema de Agendamento para o Salão Empresa Pedagógica - Senac Pernambuco


## 🚀 Guia de Como Baixar e Rodar o Projeto

Este guia fornece instruções detalhadas para baixar, configurar e executar um projeto full-stack, com front-end feito em HTML, CSS, Bootstrap e JavaScript, e back-end desenvolvido com TypeScript, Node.js, TypeORM, Express e banco de dados MySQL.

---

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu computador:

#### 1. Ferramentas Essenciais
- **Node.js** (v16 ou superior): [Baixar Node.js](https://nodejs.org/)
- **Git** (para clonar o repositório): [Baixar Git](https://git-scm.com/)
- **MySQL**: [Baixar MySQL](https://dev.mysql.com/downloads/mysql/)

#### 2. Editor de Código
- Recomendado: [Visual Studio Code (VSCode)](https://code.visualstudio.com/download)  
  **Configuração**:
  - Instale as extensões:
    - **ESLint**
    - **Prettier - Code Formatter**
    - **Node.js Extension Pack**

---

### 📦 Passo a Passo para Baixar e Configurar o Projeto

#### 1. Clone o Repositório
- Abra o terminal ou prompt de comando.
- Execute o seguinte comando:
  ```bash
  git clone [URL_DO_REPOSITORIO]
  ```
  Substitua `[URL_DO_REPOSITORIO]` pelo link do repositório no GitHub.

#### 2. Acesse a Pasta do Projeto
- Navegue até a pasta do projeto:
  ```bash
  cd [NOME_DA_PASTA_DO_PROJETO]
  ```

---

### 🔧 Configuração do Front-End

#### 1. Acesse a Pasta do Front-End
- Entre na pasta onde os arquivos do front-end estão localizados:
  ```bash
  cd frontend
  ```

#### 2. Abra o Projeto no Navegador
- Abra o arquivo `index.html` diretamente no navegador **ou** use a extensão **Live Server** no VSCode para rodar o projeto localmente.

---

### 🔧 Configuração do Back-End

#### 1. Acesse a Pasta do Back-End
- Navegue até a pasta do back-end:
  ```bash
  cd backend
  ```

#### 2. Instale as Dependências
- Execute o comando para instalar todas as dependências necessárias:
  ```bash
  npm install
  ```

#### 3. Configure o Banco de Dados MySQL
- Crie um banco de dados no MySQL com o nome especificado no arquivo `.env` ou no `ormconfig.json`.
- Atualize as variáveis de ambiente no arquivo `.env`:
  ```env
  DB_HOST=localhost
  DB_USER=[SEU_USUARIO]
  DB_PASSWORD=[SUA_SENHA]
  DB_NAME=[NOME_DO_BANCO]
  DB_PORT=3306
  ```
  Substitua `[SEU_USUARIO]`, `[SUA_SENHA]` e `[NOME_DO_BANCO]` pelos valores adequados ao seu ambiente.

#### 4. Execute as Migrações do Banco
- Para criar as tabelas no banco de dados, execute o comando:
  ```bash
  npm run typeorm migration:run
  ```

#### 5. Inicie o Servidor Back-End
- Execute o comando para iniciar o servidor:
  ```bash
  npm run dev
  ```

---

### ▶️ Executando o Projeto

#### 1. Inicie o Front-End
- Abra o arquivo `index.html` no navegador ou use a extensão **Live Server** no VSCode.

#### 2. Inicie o Back-End
- Certifique-se de que o servidor está rodando no endereço padrão: `http://localhost:3000`.

#### 3. Teste a Integração
- Utilize ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar as rotas do back-end.
- Navegue pelo front-end para verificar se está interagindo corretamente com o back-end.

---

Agora você está pronto para explorar, testar e personalizar este projeto! 🎉
```
