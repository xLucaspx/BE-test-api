# Teste - API de orçamento

Desenvolvida para retornar uma listagem de usuários e produtos, assim como um orçamento baseado na taxa do usuário selecionado e no valor dos produtos escolhidos.

## Índice

- [Endpoints](#endpoints)
- [Rodando o projeto](#rodando-o-projeto)
- [Código](#código)
- [Observações](#observações)
- [Dependências do projeto](#dependências-do-projeto)

## Endpoints

- `http://localhost:2000/users` retorna uma lista de usuários;
- `http://localhost:2000/users/:userId` retorna o usuário correspondente;
- `http://localhost:2000/products` retorna uma lista de produtos;
- `http://localhost:2000/products/:productId` retorna o produto correspondente;
- `http://localhost:2000/users/:userId/products?productIds` retorna o valor em reais a ser pago pelo usuário, calculado com base na taxa do usuário e preço da cada produto; **os ids de produtos devem ser uma lista separada por vírgulas e sem espaço (id1,id2,id3,...)**.

Apenas o método `GET` foi implementado. Todos os endpoints retornam dados em formado *JSON*. Caso seja passado algum valor inválido em `userId` ou `productId(s)`, o usuário será informado que aquele id não foi encontrado:

<div align="center">
  <img src="https://user-images.githubusercontent.com/102704083/216796819-ca3b48a2-d298-4cd6-903a-0f0568d80208.png" alt="GET com um id de produto inválido e resposta Erro ao buscar produto: O ID 7y não foi encontrado!" width="675" height="345">
</div>

## Rodando o projeto

Na pasta do projeto, execute `npm i` para instalar as dependências. Caso não possua o *json-server* instalado, instale-o globalmente com `npm i -g json-server`.

Em uma janela do terminal execute `json-server db.json -w` para subir os dados do arquivo *db.json*.
Em outra janela do terminal, execute `npm run server` para subir o servidor e poder testar os *endpoints* do projeto.

Para rodar os testes execute `npm t`. Para mostrar em detalhes os arquivos cobertos pelos testes, execute `npm run test:coverage`.

## Código

Todo o código e comentários foram escritos em inglês, assim como as mensagens de *commits*; as exceções foram as mensagens transmitidas para o usuário.
O projeto está dividido em:

- **server**: servidor *express* que roda na porta `2000`;
- **routes**: rotas e *endpoints* do servidor, acionam os controladores;
- **controllers**: usam os métodos de serviços para buscar os dados e devolver para o usuário; 
- **services**: fazem as requisições para retornar os dados solicitados pelos controladores;
- **utils**: funções para serem reaproveitadas em outras partes do código;
- **errors**: classes para melhorar a identificação e tratamento de erros;
- **tests**: testes unitários.

Outros arquivos:

- *.mockend.json*: usado para gerar os dados de [usuários](https://mockend.com/xLucaspx/BE-test-api/users) e [produtos](https://mockend.com/xLucaspx/BE-test-api/products);
- *db.json*: usado para guardar os dados gerados pelo mockend e acessá-los com [json-server](https://www.npmjs.com/package/json-server?activeTab=readme).

### Observações

No início do projeto as requisições eram feitas com o *axios* diretamente para os *endpoints* do *mockend*, porém o tempo de resposta por vezes ultrapassava dois segundos para cada requisição.
Ao utilizar o *json-server* para guardar os dados, o tempo de resposta caiu para *ms*, melhorando consideravelmente a performance do programa.

Inicialmente, devido a um erro de interpretação, a soma dos preços estava sendo calculada de forma errada, resultando em valores incorretos. Isso foi corrigido no commit [f1ab81c](https://github.com/xLucaspx/BE-test-api/commit/f1ab81cfd3a674dfda2458844e7d25aabaf4aaa0) e aprimorado no commit [bbbcb81](https://github.com/xLucaspx/BE-test-api/commit/bbbcb81b3cdda45b6abb1c04d5cfe7cb29f1485a).

### Dependências do projeto

[axios](https://axios-http.com/), [express](https://expressjs.com/) e [body-parser](https://www.npmjs.com/package/body-parser) para rodar o projeto e [nodemon](https://nodemon.io/) durante o desenvolvimento.

Para rodar o projeto também é necessário instalar o [json-server](https://www.npmjs.com/package/json-server?activeTab=readme) (não está no *package.json* pois está instalado globalmente).

Foram desenvolvidos testes unitários utilizando [jest](https://jestjs.io/pt-BR/) e [supertest](https://www.npmjs.com/package/supertest); também foi utilizada a ferramenta [postman](https://www.postman.com/).
