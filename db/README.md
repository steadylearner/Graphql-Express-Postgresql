# SQL to use before you start the project

Start with postgresql SQL commands. You can refer to [this](https://www.postgresql.org/docs/9.6/rowtypes.html) for nested type definition.

```sql
CREATE DATABASE graphql OWNER you;

CREATE TABLE users(
  id VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth Date NOT NULL
);

CREATE TYPE discount AS (
    pct       REAL,
    value_in_cents       INTEGER
);

CREATE TABLE products(
  id VARCHAR(255) PRIMARY KEY,
  price_in_cents INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  discount discount
);

DROP TABLE IF EXISTS users, products;
DROP TYPE IF EXISTS dicount;
```