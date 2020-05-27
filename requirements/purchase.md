# Adicionar Compra

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/purchase**
2  ✅ Valida se o cliente está logado para adicionar uma compra
3. ✅ Valida dados obrigatórios
4. ✅ Cria uma compra
5. ✅ Retorna 204


> ## Exceções

1.  ✅ Retorna erro **404** se a API não existir
2.  ✅ Retorna erro **400** se **os valores** não forem fornecidos pelo cliente
3.  ✅ Retorna erro **500** se der erro ao tentar criar a compra

# Adicionar uma compra
> ## APIs relacionadas a Login

POST api/purchases API para cadastrar uma compra
Essa rota só pode ser executada por usuários autenticados e no header da requisição deve conter o token para acesso
Exemplo no Postman em Headers passar exatemente conforme abaixo

```
Key                     Value
"x-access-token"        "seu_token"
"Content-Type"          "application/json"
```

```
{
  "code": "string",
	"value": "number",
	"cpf": "string"
}

```
O Retorno é um token para continuar para as outras rotas que precisam de autenticação

```
{
  "code": "01",
  "value": "1955.78",
  "cpf": "153.509.460-56",
  "percentage": "20",
  "cashbackAmount": "391.15",
  "status": "Aprovado",
  "date": "ISODate("YYYY-MM-DDT00:23:52.431Z""
}
```
