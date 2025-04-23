# Testes de performance com k6

<h1 align="left">
    <img src=".github/logo-stiker.png" width="250px">
</h1>

# User API

## 🔖 Requisitos funcionais

### Cadastro

- [X] Deve retornar os id ao cadastrar um novo usuário e retornar status 201
      Exemplo de um cadastro via curl na rota signup da api:

    > curl --request POST --url http://localhost:3333/signup --header 'Content-Type: application/json' --data '{"email": "qa@teste.io", "password": "pwd123"}'

- [X] Deve retornar 400 ao tentar cadastrar sem email e senha
- [X] Deve retornar 400 se o email for duplicado

| campos   | descrição                             | tipo     | obrigatório |
| :-----   | :------------------------------------ | :------- | :---------- |
| email    | usuário identificador único           | email    | sim         |
| password | senha do usuário                      | texto    | sim         |

## 🔖 Requisitos não funcionais

### Cadastro [Signup]

- [X] O cadastro com sucesso deve ocorrer em até 2 segundos
- [X] Cadastros sem sucesso devem ocorrer em até 2 segundos
- [X] Deve poder cadastrar até 100 usuários simultâneos
- [X] A margem de erro no cadastro deve ser de pelo menos 1%

## 🚀 Tecnologias

- [Node.js] - plataforma de desenvolvimento
- [Express] - framework onde a API foi construída
- [MongoDB] - Banco de dados (Não relacional)
- [Docker] - Para rodar o projeto localmente!
- [k6] - ferramenta para teste de carga, performance, stress etc...

## 👨🏻‍💻 Como executar o projeto

[Docker](https://www.docker.com/get-started/) Docker é utilizado para criar contêineres e gerar imagens, incluindo imagens que contêm o banco de dados MongoDB, possibilitando a execução do MongoDB em ambientes isolados de forma eficiente e portátil.

[Node.js](https://nodejs.org/) v16 ou superior para executar.

Execute os comandos abaixo para instalar das dependências do projeto:

```sh
cd curso-k6-basico/api
npm install
```

## 🧪 Executar teste

Execute o comando abaixo para executar o teste e gerar o relatorio summary em html:

```sh
 k6 run --env TEST_NAME=signup-smoke tests/signup/signup-smoke.js
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
## Créditos:

Projeto da API, Feito com 💜 &nbsp;por Fernando Papito 👋 &nbsp;[Meu linkedin](https://www.linkedin.com/in/papitoio/)
