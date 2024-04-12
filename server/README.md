<h1 align="center"> Pomodoro app backend </h1>

## Short Description

It is a RestAPI server for Pomodoro timer app. It is built using Nodejs for APIs and MySQL for storage. You can find a list of [features](#features) and [technologies used](#technologies-used) below.

## Server Notes

- Be sure to provide the following env variables (DB is for dev environment, Test is for test environment):

```
TEST_DB_USER
TEST_DB_PASSWORD
TEST_DB_DATABASE
TEST_DB_HOST
TEST_DB_PORT
DB_USER
DB_PASSWORD
DB_DATABASE
DB_HOST
DB_PORT
JWT_SECRET
COOKIE_SECRET
```

## Features

- Authentication and Authorization of users
- Todo Task API
- Creation of tables using Migrations
- Auto population of fake data to test database

## TODO:

- [ ] implement Oauth
- [ ] **need to perform end to end test**
- [ ] need to use a dependecy injection and mock the database. I don't want to add real data to the database so mocking sounds like a better idea. Currently, it fails the authentication api test because signup tries to create a user but the server is not open so, tomorrow I need to fix that by using dependecy injection.
- [ ] [testing api](https://www.youtube.com/watch?v=r5L1XRZaCR0)
- [ ] [dependency injection](https://www.youtube.com/watch?v=IDjF6-s1hGk&list=PL0X6fGhFFNTd5_wsAMasuLarx_VSkqYYX&index=5)
- [ ] task position update should be implemented
- [ ] automate the tests and create a ci/cd pipeline.
- [ ] host it using nginx

## Technologies Used

- Nodejs
- Sequelize (MySQL)
- Express
- Morgan
- Supertest

## Notes

### Migrations && Seeders

- running the migrations

```bash
foo@bar/server: ~$ bash migration.sh
```

- undo migration

```bash
foo@bar/server: ~$ bash migration.sh undo
```

- creating the seeders

```bash
foo@bar/server: ~$ bash seeders.sh create name_of_your_file
```

- running all seeders

```bash
foo@bar/server: ~$ bash seeders.sh
```

- undo latest seed

```bash
foo@bar/server: ~$ bash seeders.sh undo name_of_your_file
```

### TEST

Testing using Jest

```bash
foo@bar/server: ~$ npm test
```

## What I learned

- Using Nodejs and Express to create APIs
- Using Sequelize to create database
- Designing a relational database
- Using migrations to update tables
- Using seeders to insert data
- End to end testing of the whole API

## TODO

- Change my api to take in userId because it's the RestAPI way.
