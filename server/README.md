#### TODO:

- [x] fix the mysql workbench. Create connections and populate the data.
- [x] run previous seeders.
- [ ] might need to use a dependecy injection and mock the database. I don't want to add real data to the database so mocking sounds like a better idea. Currently, it fails the authentication api test because signup tries to create a user but the server is not open so, tomorrow I need to fix that by using dependecy injection.
- [ ] [testing api](https://www.youtube.com/watch?v=r5L1XRZaCR0)
- [ ] [dependency injection](https://www.youtube.com/watch?v=IDjF6-s1hGk&list=PL0X6fGhFFNTd5_wsAMasuLarx_VSkqYYX&index=5)
- [ ] create test for all the routers, models, and functions
- [ ] automate the tests and create a ci/cd pipeline.
- [ ] implement Oauth

## Start:

Type `npm run dev` to run the client server. It will open the file in localhost:5000.

## creating migrations:

```sh
npm run migration:create -- --name name_of_the_migration

```
