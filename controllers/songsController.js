const db = require("../database/models");

//defining methods for the Collections collection
module.exports = {
    findAll: function(req, res) {
        db.Song
            .find(req.query)
            .sort({date: -1})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Song
            .findById({_id: req.params.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByName: function(req, res) {
        db.Song
            .find({name: req.params.name})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Song
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Song
          .findByIdAndUpdate(req.params.id , req.body, {new: true} )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Song
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel=> res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}