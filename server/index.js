const express = require('express');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();

const connect = require('./connect');

const authRoutes = require('./routes/auth/index');
const pollRoutes = require('./routes/api/polls');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', express.static('dist'));


// Sample API

// POST -   /api/auth/login 
// POST -   /api/auth/register
// GET -    /api/polls - All Polls
// POST -   /api/polls/:userId/new - Create a Poll (If Logged in)
// GET -    /api/polls/:pollId - view details of a poll (secured)
// POST -   /api/polls/:pollId - register a vote on a poll (once per user or IP)
// PUT -    /api/polls/:pollId - Add an option on a poll (will not be included)
// DELETE - /api/polls/:pollId - Delete a poll (only if the creator of a poll)

app.use('/api/auth', authRoutes);

// polls routes
app.use('/api/polls', pollRoutes);

// Sample front end routes

app.get('/', (req, res) => {
  res.render(process.cwd() + '/dist/index.html');
});

// Catchall route

app.get('*', (req, res) => {
  res.redirect('/');
});

app.use((err, req, res, next) => {
  // if (err.isServer) {
    // log the error...
    // probably you don't want to log unauthorized access
    // or do you?
  // }
  return res.status(err.output.statusCode).json(err.output.payload);
})

const port = process.env.PORT || 3000;


connect('mongodb://localhost:27017/test-db-delete')
  .then(() => {
    app.listen(port, () => console.log(`> Listening on port ${port}!`));
  })
