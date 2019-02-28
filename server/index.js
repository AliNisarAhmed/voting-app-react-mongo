const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
require('dotenv').config();

const connect = require('./connect');

const authRoutes = require('./routes/auth/index');
const pollRoutes = require('./routes/api/polls');
const userRoutes = require('./routes/api/users');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', express.static('dist'));


// Sample API

// POST -   /api/auth/login 
// POST -   /api/auth/register
// GET -    /api/polls - All Polls
// POST -   /api/polls/new - Create a Poll (If Logged in)
// GET -    /api/polls/:pollId - view details of a poll
// POST -   /api/polls/:pollId - register a vote on a poll (once per user or IP) - cannot change once voted
// DELETE - /api/polls/:pollId - Delete a poll (only if the creator of a poll)

// GET -    /api/users/:userId - GET details on a logged in user

app.use('/api/auth', authRoutes);

// polls routes
app.use('/api/polls', pollRoutes);

// user routes
app.use('/api/users', userRoutes);

// Sample front end routes

app.get('/', (req, res) => {
  res.render(process.cwd() + '/dist/index.html');
});

// Catchall route

app.get('/*', (req, res) => {
  res.sendFile(process.cwd() + '/dist/index.html', function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.use((err, req, res, next) => {
  if (err.isServer) {
    // log the error...
    // probably you don't want to log unauthorized access
    // or do you?
    console.log(err);
  }
  return res.status(err.output.statusCode).json(err.output.payload);
})

const port = process.env.PORT || 3000;


connect('mongodb://localhost:27017/test-db-delete')
  .then(() => {
    app.listen(port, () => console.log(`> Listening on port ${port}!`));
  });

module.exports = app;