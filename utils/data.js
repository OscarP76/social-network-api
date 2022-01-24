const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Get some random assignment objects using a helper function that we imported from ./data
//   const assignments = getRandomAssignments(20);

  // Loop 20 times -- add students to the students array
//   for (let i = 0; i < 20; i++) {
//     const fullName = getRandomName();
//     const first = fullName.split(' ')[0];
//     const last = fullName.split(' ')[1];
//     const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      username,
      email,
      Thought,
      friends,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Thought.collection.insertOne({
    thoughtName: '',
    inPerson: false,
    users: [...users],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
//   console.table(assignments);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});