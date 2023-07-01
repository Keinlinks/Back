const { Router } = require("express");
const router = Router();

const {
  getMusic,
  postMusic,
  deleteMusic,
  updateMusic,
} = require("../controller/index_controller");

router.get("/song", getMusic);

router.post("/song", postMusic);

router.delete("/song", deleteMusic);

router.patch("/song", updateMusic);

module.exports = router;
