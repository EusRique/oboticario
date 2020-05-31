# Atualizar um registro de compra

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **PUT** na rota **/api/purchases/{purchaseId}/**
2  ✅ Valida se a requisição foi feita por um **usuário**
3. ✅ Valida o parâmetro **purchaseId**
4. ✅ Valida se os **campos** tem uma resposta válida
5. ✅ Valida se o registro a ser atualizado pertence aquele usuário.
6. ✅ **Atualiza** um registro com os dados fornecidos caso já tenha um registro
7. ✅ Retorna **200** com os dados do resultado da enquete

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se não for um usuário
3. ✅ Retorna erro **403** se o purchaseId passado na URL for inválido
4. ✅ Retorna erro **403** se a resposta enviada pelo client for uma resposta inválida
5. ✅ Retorna erro **403** se o usuário tentar fazer update em um registro que não pertence a ele
6. ✅ Retorna erro **500** se der erro ao tentar atualizar o resultado da enquete
7. ✅ Retorna erro **500** se der erro ao tentar criar o update do registro

# Attualizar uma compra
> ## APIs relacionadas a update de compra/registro

PUT api/purchases/:purchaseId API para atualizar uma compra
Essa rota só pode ser executada por usuários autenticados e no header da requisição deve conter o token para acesso
É valido se aquela compra pertence ao usuário que está tentando atualiza-la
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
O Retorno da rota

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
