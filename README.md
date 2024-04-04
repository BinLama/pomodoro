<h1 align="center"> Pomodoro Timer App </h1>

<!-- add picture here -->
<!-- ![](/srouce/to/image) -->
<p align="center">
  Pomodoro App built with React
</p>

## Short Description

A full-stack pomodoro timer app with todo list, drag and drop functionality, customization of timer, authentication, capability to work offline. Responsive and tested with Jest. You can find a list of [features](#features) and [technologies used](#techonologies-used) below.

<!-- ## 🔴 Demo -->
<!-- 🧪 [Live Demo]() available. Click "Live Demo" to open it. -->

## Performance

TODO:

- [ ] Test performance of my website using google lighthouse
- [ ] Perform end to end testing of the server

## Features

- Responsive and clear UI/UX
- Set pomodoro timer with alarms
- Mute, change and contorl timer sounds
- Skip to any session desired
- Reset all completed sessions
- Auto Start different sessions
- Add Todo list
- Remove Todo list
- Hide all completed list
- Auto sort completed list to the bottom
- Change all todo's status to completed
- Add description to todo list
- Login and logout
- Auto sign in
- Animated timer
- Server to store all tasks and settings

TODO:

- [ ] customize colors
- [ ] Drag and drop sorting of tasks
- [ ] disable auto sort of completed tasks
- [ ] add Seven Habits tracker bar
- [ ] add drag and drop functionality to seven habits tracker
- [ ] extended description of todo can be modified to add different formatting

## RUN:

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

#### TEST:

Testing using Jest

```bash
foo@bar/server: ~$ npm test
```

#### TODO:

- [ ] refactor the frontend using react
- [ ] design the frontend using other people's example
- [ ] add tasks, setting,
- [ ] save the dark mode or light mode preference to local storage.
- [ ] create a visualization using d3 on the number of seconds spent on studying.
- [ ] [D3 Chart](https://d3-graph-gallery.com/graph/connectedscatter_legend.html)
- [ ] Connect to todoist and integrate it automatically.
