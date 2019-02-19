# parcel-react-express-boilerplate
Boilerplate for Full-stack JS projects: Includes React with all babel plugins, Express &amp; Mongoose setup, bundled with parcel 

* Scripts:

```json
    "build-watch": "parcel watch ./client/index.html",
    "start-watch": "nodemon server/index.js",
    "dev": "concurrently --kill-others \"npm run start-watch\" \"npm run build-watch\"",
    "build": "parcel build ./client/index.html",
    "start": "npm run build && node server/index.js",
```

## Development with auto reloading

* `npm run dev`
* Visit http://localhost:3000
* Change some files!

## Run

* `npm start`
* Visit http://localhost:3000
