const router = require("express").Router();
const songsController = require("../../controllers/songsController");

// Matches with "/api/song"
router.route("/")
.get(songsController.findAll)
.post(songsController.create);

// Matches with "/api/song/:id"
router
.route("/:id")
.get(songsController.findById)
.put(songsController.update)
.delete(songsController.remove);


module.exports = router;
