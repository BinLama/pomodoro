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

### Performance TODO

- [ ] Test performance of my website using google lighthouse
- [ ] Perform end to end testing of the server

## Features

### Frontend features

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

### Frontend TODO

- [ ] customize colors
- [ ] Drag and drop sorting of tasks
- [ ] capable of disabling auto sort of completed tasks
- [ ] add Seven Habits tracker bar
- [ ] add drag and drop functionality to seven habits tracker
- [ ] extended description of todo can be modified to add different formatting

### Backend features

- Authentication and Authorization of users
- Todo Task API
- Creation of tables using Migrations
- Auto population of fake data to test database

### Backend TODO

- [ ] implement Oauth

## Big TODO

- [ ] refactor the frontend using react
- [ ] design the frontend using other people's example
- [ ] add tasks, setting,
- [ ] save the dark mode or light mode preference to local storage.
- [ ] create a visualization using d3 on the number of seconds spent on studying.
- [ ] [D3 Chart](https://d3-graph-gallery.com/graph/connectedscatter_legend.html)
- [ ] Connect to todoist and integrate it automatically.

## Running program

### Running frontend:

```bash
foo@bar: ~$ cd frontend
foo@bar/frontend: ~$ npm install && npm run dev
```

### Running server:

```bash
foo@bar: ~$ cd server
foo@bar/server: ~$ npm install && npm run dev
```

You will need to provide atleast these variables for the server to run properly on your localhost.

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

Server uses port: 5000 and frontend uses port: 5173
