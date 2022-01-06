# API NODEJS:

Siga as instruções abaixo para conseguir executar a API.

## 1° Banco de dados

O banco de dados utilizado foi o PostgreSQL, então tenha o mesmo instalado em sua máquina, ou rode pelo Docker e simplifique sua vida:

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -d postgres
```
Veja: https://hub.docker.com/_/postgres para mais informações.

## 2º Variáveis de ambiente

Mofique o arquivo .env para sua realidade, configurando principalmente a parte do banco de dados, siga o exemplo padrão abaixo.

```text
# BASE URL
BASE_URL=http://localhost:3333

# DEFAULT NODE PORT
NODE_PORT=3333

# DATABASE POSTGRESQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_DEFAULT=vacinacao
```

## 3º Intalando dependências

É necessário ter o [NodeJS](https://nodejs.org) instalado em sua máquina, instale a versão LTS

Ele inclui o NPM que é o gerenciador de pacotes do Node, e é com ele que será possível instalar as dependências do sistema, ou se quiser pode usar o [Yarn](https://yarnpkg.com) também.

```bash
cd pasta_da_api

# Com NPM
npm install

# Ou com Yarn
yarn install
```

## Criando as tabelas do banco

Foi utilizado nesse projeto o [Knex](https://knexjs.org/) que é um Query Builder, no arquivo **package.json**, já tem alguns scripts que deixei pronto para ajudar na criação, inserção e nos drops das tabelas.


Criar as tabelas:

```bash
# Com NPM
npm run knex:migrate
# Com Yarn
yarn knex:migrate
```

## Executar as seeds para já inserir alguns dados nas tabelas

Esse processo ajuda muito, pra já ter populado na tabela os dados necessários para utilização.

Rodar as seeds:

```bash
# Com NPM
npm run knex:seed
# Com Yarn
yarn knex:seed
```

## Dropar as tabelas

Como o Knex trabalha com o conceito de migrations, ele gera umas tabelas dele mesmo, que contrala o versionamento das migrations que foram criadas, para dropar as alterações feitas acima basta executar:

```bash
# Com NPM
npm run knex:rollback
# Com Yarn
yarn knex:rollback
```

## Executar o servidor

Agora basta rodar o projeto de fato, executando o servidor Node.

```bash
# Com NPM
npm run dev
# Com Yarn
yarn dev
```

## Endpoints

### Usuários: endpoint com todas as funcionalidades de um CRUD e com a autenticação do mesmo

> **post -> /user/create**

```json
{
	"nome": "user1",
	"email": "user1@mail.com",
	"senha": "123456789"
}
```

> **post -> /user/login**

```json
{
	"email": "user1@mail.com",
	"senha": "123456789"
}
```

> **put -> /user/update/:id**

```json
{
	"nome": "user1_update",
	"email": "user1_update@mail.com",
	"senha": "12345678910"
}
```

> **delete -> /user/delete/:id**

```text
http://localhost:3333/user/delete/1
```

> **get -> /user/show/:id**

```text
http://localhost:3333/user/show/1
```

> **get -> /user/index**

```text
http://localhost:3333/user/index
```

<br />
<br />

### Pessoas: endpoint para criar e listar pessoas

> **post -> /people/create**

```json
{
  "nome": "Pessoa 1",
  "bairro": "Bairro A",
  "cidade": "Cidade A",
  "estado": "AA",
  "data_nascimento": "2000-12-31",
  "cpf": "12345678910"
}
```

> **get -> /people/index**

```text
http://localhost:3333/people/index
```

<br />
<br />

### Vacinas: endpoint para criar, atualizar e listar todas as vacinas

> **post -> /vaccine/create**

```json
{
  "nome": "PFizer",
  "fabricante": "PFizer fabricante",
  "pais": "PFizer Pais",
  "doses": 3
}
```

> **put -> /vaccine/update/:id**

```json
{
  "nome": "PFizer Update",
  "fabricante": "PFizer fabricante Update",
  "pais": "PFizer Pais Update",
  "doses": 2
}
```

> **get -> /people/index**

```text
http://localhost:3333/vaccine/index
```

<br />
<br />

### Unidades: listar todas as unidades e excluir

> **get -> /unity/index**

```text
http://localhost:3333/unity/index
```

> **delete -> /unity/delete/:id**

```text
http://localhost:3333/unity/delete/1
```

<br />
<br />


### Registros: endpoint com todas as funcionalidades de um CRUD para registrar as informações

> **post -> /register/create**

```json
{
	"pessoa_id": 1,
  "unidade_id": 2,
  "vacina_id": 1,
  "dose": 2,
  "data": "2021-12-31T15:47:07.362Z"
}
```

> **put -> /register/update/:id**

```json
{
	"pessoa_id": 2,
  "unidade_id": 3,
  "vacina_id": 2,
  "dose": 3,
  "data": "2022-01-01T15:47:07.362Z"
}
```

> **delete -> /register/delete/:id**

```text
http://localhost:3333/register/delete/1
```

> **get -> /register/show/:id**

```text
http://localhost:3333/register/show/1
```

> **get -> /register/index**

```text
http://localhost:3333/register/index
```
