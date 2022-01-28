const { isValidObjectId } = require('mongoose')
const { Thought } = require('../models')


module.exports = {

  addReaction(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$push: { reactions: req.body}})
      .then(function(thoughtData){
        res.json(thoughtData)
      })
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: { reactions: {reactionId: req.body.reactionId}}})
      .then(function(thoughtData){
        res.json(thoughtData)
      })
  },
    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then(async (users) => {
          return res.json(users);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Get a single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then(async (thought) =>
          !thought
            ? res.status(404).json({ message: '' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create a new thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.updateOne({_id: req.params.thoughtId}, req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // Delete a thought and remove it from the site
    deleteThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought exists' })
            : Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((thought) =>
          !thought
            ? res.status(404).json({
                message: 'Thought deleted',
              })
            : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
}