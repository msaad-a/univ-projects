This is a project for a web development course that I did with three other students using React and an Express server. There is a large lack of polish due to limited time. 

NOTE: login button has a bug, need to double click and multiplayer, friends list, and game stats are not fully implemented

Default user logins:
Username: 'user'
Password: 'user'

Username: 'admin'
Password: 'admin'

Admins and users have different interfaces. Normal users can play a game of Wordle where they get to decide whether to try 5, 6, or 7 letter words.

Here is how to run the app locally after cloning the repo:

Use `yarn install` on both the top level and after doing `cd client`. Have two terminals open, one for running the react app and one for starting the express server. Always run `npm start` in the client folder first, and then `npm start` on the other terminal at the top level. From here, you can use the app locally. You can use a POST request to `/api/users` to create an admin user, just make sure to have `admin: true` when creating the user. To create a user, you can either sign up or log in with the admin user and create one. Once that is done, the app should be set up for use locally.




