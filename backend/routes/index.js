// // routes/index.js
// const express = require("express");
// const router = express.Router();

// // Sample Route (can be a health check)
// router.get("/", (req, res) => {
//   res.send({ message: "API is running 🟢" });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));

module.exports = router;
