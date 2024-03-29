const express = require("express");
const app = express();
var cors = require('cors')
const port = 3000;
const { v4: uuidv4 } = require("uuid");

var gtts = require("node-gtts")("en");
var path = require("path");

app.use(express.static("voices"));
app.use(cors())

app.get("/", (req, res) => {
  const id = uuidv4();
  const fileName = `${id}_voice.mp3`;
  var filepath = path.join(__dirname, "voices", fileName);

  gtts.save(filepath, req.query.text, function () {
    res.status(200).json({ file: fileName, success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
