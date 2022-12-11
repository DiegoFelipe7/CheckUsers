const { Router } = require("express");
const router = Router();
const userController = require("../controller/userController");
router.get("/user/:idUser/:idFarm", userController.farm);
router.post("/user/:idUser/:idFarm", userController.insertCollaborator);
module.exports = router;
