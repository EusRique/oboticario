# **Back-End Developer - O Boticario**

Desafio: Eu revendedor O Boticário quero ter benefícios de acordo com o meu volume de vendas.

## **Importante**
Verifique o arquivo env.ts para a configuração de variáveis de ambiente, altere se necessário.
Path: src/main/config/env.ts

## **Requerimentos**
- Node 13x
- MongoDB

## **Depois de tudo configurando**
Instale as dependências do projeto rodando o seguinte comando no terminal.

```npm install```

Para iniciar a API execute o comando abaixo no terminal. 

```npm run dev```

Após a inicialização o sistema ficará disponível no endereço

```http://localhost:3000/api/```

Para rodar os testes unitarios

```npm test:unit ```

Teste Integração

```npm test:integration```

Testes Verbosos

```npm test``` 	     
```npm test:verbose```

Test CI para toda vez que dor feito um push

```npm test:ci```

## **Abaixo os links para a documentação da API**

1. [Cadastro](./requirements/signup.md)
2. [Login](./requirements/login.md)
3. [Adicionar uma compra](./requirements/purchase.md)
4. [Listar todas as compras de um cliente](./requirements/load-purchase.md)
5. [Atualizar a compra de um cliente](./requirements/update-purchase.md)

Checklist:
---

- [x] Utilizado NodeJS
- [x] Utilizado MongoDB
- [x] Testes unitário;
- [x] Teste de integração;
- [x] Teste de CI/CD;
- [x] Autenticação por JWT;
- [x] Logs;

