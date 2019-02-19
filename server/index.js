const express = require('express');
const bodyParser = require('body-parser');

const connect = require('./connect');
const authRoutes = require('./routes/auth/index');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', express.static('dist'));


// Sample API

// GET - /api/polls - All Polls
// POST - /api/auth/login 
// POST - /api/auth/register
// POST - /api/polls/:userId/new - Create a Poll (If Logged in)
// GET - /api/polls/:pollId - view details of a poll (secured)
// POST - /api/polls/:pollId - register a vote on a poll (once per user or IP)
// PUT - /api/polls/:pollId - Add an option on a poll (will not be included)
// DELETE - /api/polls/:pollId - Delete a poll (only if the creator of a poll)

app.use('/api/auth', authRoutes);

// Sample front end routes

app.get('/', (req, res) => {
  res.render(process.cwd() + '/dist/index.html');
});

// Catchall route

app.get('*', (req, res) => {
  res.redirect('/');
});

app.use(function(error, req, res, next) {
  res.json({ message: error.message });
});

const port = process.env.PORT || 3000;


connect('mongodb://localhost:27017/test-db-delete')
  .then(() => {
    app.listen(port, () => console.log(`> Listening on port ${port}!`));
  })
