# Product and User Graphql Example with Postgresql Database

Make README.md file to separate CRUD query examples. You should fill every fields for database to work without any problem.

Read [How to use multiple Gpaphql typeDefs and resolvers](https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2).

## CRUD for product

1. C

```js
mutation {
  createProduct(input:{
    price_in_cents: 500
    title: "a product"
    description: "cheap"
    discount: {
      pct: 0.01
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

```
{
  getProducts {
    id
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

```Js
mutation {
  deleteProducts
}
```

## CRUD for user

1. C

```js
mutation {
  createUser(input: {
    id: "steadylearner"
    first_name: "first"
    last_name: "last"
    date_of_birth: "2019-01-01"
  })
}
```

2. R

```js
{
  getUser(id: "f3930e2bb16ce09838eb") {
    first_name
    last_name
    date_of_birth
  }
}
```

```js
{
  getUsers {
    id
  }
}
```

3. U

```js
mutation {
  updateUser(id: "0b3e90418413a496adf7", input: {
    first_name: "first"
    last_name: "last"
    date_of_birth: "2019-01-01"
  }) {
    first_name
    last_name
    date_of_birth
  }
}
```

4. D

```js
mutation {
  deleteUser(id: "6a104d6eabc764ff0aa3")
}
```

```js
mutation {
  deleteUsers
}
```