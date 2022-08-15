# Card Drag And Drop App

![](https://i.imgur.com/m8q5u2M.gif)

A React project which has multiple elements in a grid with the functionality of drag and drop. You can easily drag and drop the tiles of items wherever you want in the grid and the grid will adjust based on that. Using PostgresSQL DB as the database to store the item's position and structure. Using uvicorn-gunicorn-starlette API framework as the backend to make REST API endpoints to fetchData, Insert, Update DB.

# HOW TO RUN

1. simply clone it using - `git clone https://github.com/tanishbaansal/CardDragDrop.git`
2. run docker compose command - `docker compose up`
3. Open the frontend on `http://localhost:3000/`

:fire: Voila, that's it

# For Testing

There's a .env.testing file in the frontend folder which contains the testing variables.
To check the saving screen which appears when you move items in the grid and data saves, just set REACT_APP_TESTING_MODE="true" as updation is pretty quick so implemented a sleep to make the function sleep for some time after updating so we can see the saving screen.
Set REACT_APP_TESTING_TIME to change the interval of time in ms when the app should save the data.

# After Changes

if doing any changes to the frontend or backend files after doing `docker compose up` be sure to run `docker compose down` and on the next run use `docker compose up --build` to rebuild the image with updated code

# Architectural / API design

The backend core logic was to 
-Fetch the data from the DB to get the list of items 
-Update the data whenever the user moves the elements in the grid
-Fetch the last time the data was saved

To do that we just need to create a simple REST API server, with the following endpoints 
- `/data` - Which will fetch the data from DB  using the `GET` method
- `/getlastsavedata` - To get the exact time when the last save was done
- `/updatedata` - To update the data using the `PUT` method
and also created one more endpoint `/insertdata` to insert new items into the DB using the `POST` method .

# Hypothetical API for this project 

1. For Adding - Already created a `/insertdata` endpoint which does the job of adding new elements to the DB. It takes in all the input in JSON data and adds it to the table.
2. For Removing - will be creating a `/deletedata` endpoint with DELETE method which will require a request containing a JSON object with the item's type to uniquely identify the item and remove that from the table using a Delete query using the where clause.
3. For Updating - Already created a `/updatedata` endpoint which gets the type and position of the element and updates the position of the element with the given data.

# Allowing multiple users to edit the board at the same time

For allowing multiple users to edit the board at the same time we would require a state management library like SyncState which would help us in syncing the state across multiple sessions also we will have to incorporate a framework server that supports real-time data transfer like socket.io or firebase so we create a Socket connection between client and server so that data will flow both ways. So when two users open the app the data/state will be fetched from the remote connection and if one user updates anything on the page then in real time that state/data flows to the remote connection like the socket.io database and the other user's App will fetch that newly updated data from the connected socket.io connection and update its state. So this will create an editable multiple users board.

# Thought Process

First read about the backend like what functionalities we need from the database and how the data would be stored in the DB. Then went on to create a simple structure of the table. After that the frontend, the frontend should be minimalist and easy to use for the end user so I choose the MUI styling framework as its open source and follow a materialistic design that is super easy for the end user to understand so it improves the UX of the project. Then moved on to the grid section as the array was linear so had to make an algo to distribute the elements in different rows and columns. 

After that, the drag and drop functionality was challenging to create so spent most of my time implementing that, and the edge cases for the position updation were a lot, so tested to move an element in every position of the grid to full proof the app so the user won't get any glitch in the app. After that created a simple lightbox and made that center to get full visibility with a backdrop. After the frontend and backend were finished, they were a decoupled microservices that needed to be started separately so created a docker-compose file to simply make containers for these microservices to ease the deployment process and so that we just need to type one command to make the backend and frontend services up. Also attached volumes to DB so that the data can persist
