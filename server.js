const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const {Thought } = require('./models')

const cwd = process.cwd();

const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  // Thought.create({
  //   thoughtText: 'Heloooooooooooooooooooooooooooooooo',
  //   username: 'Oscar'
  // })
  app.listen(PORT, () => {
    console.log(`API server for running on port ${PORT}!`);
  });
});