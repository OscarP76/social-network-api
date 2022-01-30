## social-network-api
repo for my social network API homework

## Languages used
ExpressJS <br>
NodeJs <br>
MongoDB <br>
Mongoose <br

## Code Snippet
```
 deleteReaction(req, res) {
    console.log('About to delete!!', req.body)
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: { reactions: {_id: req.body.reactionId}}})
      .then(function(thoughtData){
        console.log('Deleted reaction off thought!', thoughtData)
        res.json(thoughtData)
      }).catch((err) => {
        console.log('ERRR!', err)
        res.json(err)
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
```

## Links
[Github]()
[Walkthrough]()