# Birdnest
This is an implementation aimed at the following assignment: http://assignments.reaktor.com/birdnest/ 
# Missing features

+re-render the table when the pilot list updates. This feature currently does not work as intended.
+closestDistance. This is currently displaying last distance. Comparison between last distance and closestDistance needs to be implemented
+deploy somewhere. This is currently not deployed anywhere and only tested locally.
+remove debugging. Clean console logs and debug buttons.

# To build

this project requires a mongoDB database, with two collections: drones, and pilots.

The database needs to be connected through a .env file containing a DB_URI variable.


To start the backend, run the following command from the backend directory
```
npm run dev
```


To start the frontend, run the following command from the frontend directory
```
npm start
```

