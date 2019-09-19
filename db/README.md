# SQL to use before you start the project

Start with users to test the project

```sql
CREATE DATABASE graphql OWNER you;
CREATE TABLE users(
  id VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  date_of_birth Date NOT NULL,
);
```
