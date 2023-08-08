const { Router } = require("express");
const router = Router();

const {
  getMusic,
  postMusic,
  deleteMusic,
  updateMusic,
  getWork,
} = require("../controller/index_controller");

router.get("/song", getMusic);

router.post("/song", postMusic);

router.delete("/song", deleteMusic);

router.patch("/song", updateMusic);

router.get("/work", getWork);

module.exports = router;
