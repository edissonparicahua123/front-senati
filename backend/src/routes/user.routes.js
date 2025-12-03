const express = require("express");
const controller = require("../controllers/user.controller");
const router = express.Router();

router.get("/users/", controller.listUsers);
router.post("/users/new/", controller.createUser);
router.put("/users/:id", controller.updateUser);
router.delete("/users/:id", controller.destroidUser);

module.exports = router;