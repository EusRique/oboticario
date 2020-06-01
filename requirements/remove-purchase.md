# Remover um registro de compra

1.  ✅ Recebe uma requisição do tipo **PUT** na rota **/api/purchase/{purchaseId}**
2.  ✅ Valida se a requisição foi feita por um **usuário**
3.  ✅ Valida o parâmetro **purchaseId**
4.  ✅ Valida se o status é diferente de **aprovado** 
5.  ✅ Retorna **204** com a remoção do registro

> ## Exceções

1.  ✅ Retorna erro **404** se a API não existir
2.  ✅ Retorna erro **403** se não for um usuário
3.  ✅ Retorna erro **403** se o purchaseId passado na URL for inválido
4.  ✅ Retorna erro **403** se o status da compra for igual a aprovado
5.  ✅ Retorna erro **500** se der erro ao tentar excluir o resultado da compra
6.  ✅ Retorna erro **500** se der erro ao tentar carregar a compra

> ## APIs relacionadas a remover uma compra cadastrada
DELETE api/purchases/:purchaseId API excluir uma compra
Essa rota só pode ser executada por usuários autenticados e no header da requisição deve conter o token para acesso
É valido se aquela compra pertence ao usuário que está tentando excluir
Exemplo no Postman em Headers passar exatemente conforme abaixo

```
Key                     Value
"x-access-token"        "seu_token"
"Content-Type"          "application/json"
```
