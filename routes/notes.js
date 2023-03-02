const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const fsUtils = require("../helpers/fsUtils");

//get route
router.get("/", (req, res) => {
  console.info(`${req.method} request received`);
  fsUtils
    .readFromFile(fsUtils.fileName)
    .then((data) => {
      res.json(JSON.parse(data));
      console.log(data);
    })
    .catch((err) => {
      console.info(err);
    });
});


//post route
router.post("/", (req, res) => {
  console.info(`${req.method} request received`);
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    fsUtils.readAndAppend(newNote);
    res.json(newNote);
  } else {
    res.status(500).json("Error");
  }
});

router.delete("/:id", (req, res) => {
  console.info(`${req.method} request received`);
  let rawdata = fs.readFileSync(fsUtils.fileName);
  let parsedData = JSON.parse(rawdata);
  notesArr = parsedData.filter((note) => note.id != req.params.id);
  fsUtils.writeToFile(fsUtils.fileName, notesArr);
  res.json(notesArr);
});

module.exports = router;
