const { User } = require('../models')


module.exports = {
  addFriend(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, {$push: {friends: req.body}})
    .then(function(friendData){
      res.json(friendData)
    })
  },

  removeFriend(req, res) {
    User.findOneAndDelete({_id: req.params.userId}, {$pull: {friends: req.params.friendId}})
    .then(function(friendData){
      res.json(friendData)
    })
  },
    // Get all users
    getUsers(req, res) {
      User.find()
      .populate('friends')
        .then(async (users) => {
          return res.json(users);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Get a single user
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.updateOne({_id: req.params.userId}, req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // Delete a user and remove them from the course
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No such user exists' })
            : User.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'User deleted, but no courses found',
              })
            : res.json({ message: 'User successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    addFriend: async (req, res) => {
      const user = await User.findOneAndUpdate({_id:req.params.userId}, {$push: {friends: req.params.friendId}})
      res.json(user)
    },
    removeFriend: async (req, res) => {
      const user = await User.findOneAndUpdate({_id:req.params.userId}, {$pull: {friends: req.params.friendId}})
      res.json(user)
    },
}