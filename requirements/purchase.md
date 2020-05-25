# Adicionar Compra

> ## Caso de sucesso

1. Recebe uma requisição do tipo **POST** na rota **/api/purchase**
2. Valida dados obrigatórios
3. Cria uma compra
4. ✅ Retorna 204


> ## Exceções

1.  Retorna erro **404** se a API não existir
2.  Retorna erro **400** se **os valores** não forem fornecidos pelo cliente
3.  ✅ Retorna erro **400** se **os valores** não forem fornecidos pelo cliente
4.  ✅ Retorna erro **500** se der erro ao tentar criar a compra
