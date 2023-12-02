## Intro:

This is a React/Nodejs/Sequelize/MySQL/SCSS based Pomodoro Project. Feel free to clone it and use it for you own use.

#### CLIENT:

#### RUN:

- Running the frontend:

```bash

foo@bar: ~$ cd frontend
foo@bar/frontend: ~$ npm install && npm run dev
```

#### SERVER:

#### RUN:

This is a React/Nodejs/Sequelize/MySQL/SCSS based Pomodoro Project. Feel free to clone it and use it for you own use.

- Running the server:

```bash

foo@bar: ~$ cd server
foo@bar/server: ~$ npm install && npm run dev
```

##### Server Notes:

- Be sure to provide any env variables needed. The env variables that I am using are as follows:

```
TEST_DB_USER
TEST_DB_PASSWORD
TEST_DB_DATABASE
TEST_DB_HOST
TEST_DB_PORT
JWT_SECRET
COOKIE_SECRET
```

You will need to provide atleast these variables for the server to run properly on your localhost.

Server uses port: 5000 and frontend uses port: 5173

##### Migrations && Seeders:

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

#### TODO:

- [ ] refactor the frontend using react
- [ ] design the frontend using other people's example
- [ ] add tasks, setting,
- [ ] save the dark mode or light mode preference to local storage.
- [ ] create a visualization using d3 on the number of seconds spent on studying.
- [ ] [D3 Chart](https://d3-graph-gallery.com/graph/connectedscatter_legend.html)
- [ ] Connect to todoist and integrate it automatically.
