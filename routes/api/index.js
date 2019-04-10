const router = require("express").Router();
const songRoutes = require("./song");

// Collection routes
// for "/api/"
router.use("/song", songRoutes);

// router.use("/signin",signinRoutes);

module.exports = router;
