# User Graphql Example with Postgresql Database

Make README.md file to separate CRUD examples.

## CRUD

1. C

```js
mutation {
  createUser(input: {
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
