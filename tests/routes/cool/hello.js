const { Router } = require("../../../dist");
const router = Router();

router.get("/hello", (req, res) => {
  res.send("Hello World!");
});

exports.default = router;
