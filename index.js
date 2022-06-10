const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}`);
});

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  let resObj = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };
  res.json(resObj);
});
