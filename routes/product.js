// Test with client.js and move logics here later

// Expõe uma rota HTTP tal que GET / product retorne um json com uma lista de produtos.

// Essa rota deve receber opcionalmente via header X - USER - ID um id de usuário.

// Para obter o desconto personalizado este serviço deve utilizar o serviço 1.

// Caso o serviço 1 retorne um erro, a lista de produtos ainda precisa ser retornada, porém com esse produto que deu erro sem desconto.

// Se o serviço de desconto(1) cair, o serviço de lista(2) tem que continuar funcionando e retornando a lista normalmente, só não vai aplicar os descontos.
