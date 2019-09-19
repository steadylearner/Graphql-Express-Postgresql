# Product Graphql Example with Postgresql Database

Make README.md file to separate CRUD query examples. You should fill every fields for database to work without any problem.

## CRUD

1. C

```js
mutation {
  createProduct(input:{
    price_in_cents: 500
    title: "a product"
    description: "cheap"
    discount: {
      pct: 0.05
      value_in_cents: 25
    }
  })
}
```

2. R

```js
{
  getProduct(id: "07eb68e8d1df28934b73") {
    title
    price_in_cents
    description
    discount {
      pct
      value_in_cents
    }
  }
}
```

3. U

```js
mutation {
  updateProduct(id: "c3abd499f372b1712f9f", input: {
    price_in_cents: 1000
    title: "another product"
    description: "expensive"
    discount: {
      pct: 0.05
      value_in_cents: 25
    }
  }) {
    title
  }
}
```

4. D

```js
mutation {
 deleteProduct(id: "07eb68e8d1df28934b73")
}
```
