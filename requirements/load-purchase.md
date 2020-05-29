# Listar Compras Adicionadas

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/purchases**
2. ✅ Valida se a requisição foi feita por um **usuário autenticado**
3. ✅ Retorna **204** se não tiver nenhuma compra
4. ✅ Retorna **200** com os dados das compras

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se não for um usuário autenticado
3. ✅ Retorna erro **500** se der erro ao tentar listar as compras

# Adicionar uma compra
> ## APIs relacionadas a listar todas as compras cadastradas por usuários rota só pode ser acessada por admin

GET api/purchases API para listar todas as compras já cadastradas por usuários
Essa rota só pode ser executada por usuários autenticados e no header da requisição deve conter o token para acesso
Exemplo no Postman em Headers passar exatemente conforme abaixo

```
Key                     Value
"x-access-token"        "seu_token"
"Content-Type"          "application/json"
```

O Retorno é um todas as compras cadastradas

```
{
  "code": "01",
  "accountId": "01",
  "value": "1955.78",
  "cpf": "153.509.460-56",
  "percentage": "20",
  "cashbackAmount": "391.15",
  "status": "Aprovado",
  "date": "ISODate("YYYY-MM-DDT00:23:52.431Z""
}
```