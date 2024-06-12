## Steps

### Intialized and Setup

- npm install
- npm run dev

### TODO:

- [x] Add logout and view profile drop down
- [ ] Create a github like chart that will show the days logged in and session completed.
  - Getting session data for each date
    - Should get it before the days are drawn
    - It should receive a count of all the sessions
    - Attach data to each day
    - Using the data:
      - Add color for the max and min frequency of data.
      - Show data legend
- [ ] Show Annonymous profile if the user is not logged in
- [ ] Save the data in the localstorage for annon user
- [ ] Add the Ability to drag and drop task and save the position on the database
- [ ] Seperate sound control
- [ ] Add task filtering
- [ ] Attach session with specific task
- [ ] Track time spent on task (per minute)
- [ ] Show bar chart for reports (min per day)
- [ ] add theme picker on the drop down
- [ ] add forgot password page.

### TODO POMODORO:

- [ ] need to add proper modal alert for changes
- [x] need to save setting on database
- [ ] create custom selection table
- [ ] Allow users to add 1 more min
- [ ] Hardcore mode (where everything is locked down)
- [ ] Give users reward for spending more time on studying (extra breaks)
- [x] custom slider breaks down when you get out of slider and get in (it resets to 12, 13, 14).
- [x] custom slider breaks when clicked on the radio button. It updates to the preset values (need to be applied to the new ones, need to save the slider value in the localhost and database).

### TODO Task

- [x] connect the task to the database
- [x] create specific API for updating completion
- [ ] add drag and drop capabilities (and store them in database)
- [ ] save the position of the files that are dragged on localhost and database (not sure how right now, thinking of adding a position value and incrementing it based on object added)

### TODO Reports

- [ ] Show their most active hours and days
- [ ] Their streak
- [ ] What they mostly focused on

### TODO MORE:

- [ ] add a 4 sided column and create a 7 habits important and urgent tabs. (make sure all the data have those tags too.)

### BUG Report:
