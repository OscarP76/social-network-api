const { Schema, Types } = require('mongoose');
const reactionSchema = require('./Reaction')
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: Schema.Types.ObjectId,
      required: true,
      maxlength: 280,
      minlength: 0,
    },
    createdAt: {
      type: Date,
      default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000), 
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = assignmentSchema;
