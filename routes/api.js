const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//route to get the notes 
router.get("/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    return err ? console.log(err) : res.json(JSON.parse(data));
  });
});
//route to save new notes
router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  let id = uuidv4();

  fs.readFile("./db/db.json", (err, data) => {
    const dbInfo = JSON.parse(data); //handling data read from ./db/db.json

    console.log(dbInfo);

    if (!title || !text) {
      console.log("Missing fields");
      return res.status(500).json({ Error: "Missing fields" });
    }

    dbInfo.push({ title, text, id });
    const dbNotes = JSON.stringify(dbInfo);
    fs.writeFile("./db/db.json", dbNotes, (err) => {
      if (err) {
        console.log("Error");
      } else {
        console.log("Note added");
        res.sendFile(path.join(__dirname, "../", "/db/db.json"));
      }
    });
  });
});
//route to delete notes, does not work
router.delete("/api/notes/:id", (req, res) => {
  console.log("hit");
  let deleteId = req.params.id;
  fs.readFile("./db/db.json", (err, data) => {
    let dbInfo = JSON.parse(data); //handling data read from ./db/db.json

    console.log(dbInfo, deleteId);
    dbInfo = dbInfo.filter((n) => {
      //this is a type of for loop
      return n.id != deleteId;
    });
    console.log(dbInfo);
  });
  const dbNotes = JSON.stringify(dbInfo);
  fs.writeFile("./db/db.json", dbNotes, (err) => {
    if (err) {
      console.log("Error");
    } else {
      console.log("Note added");
      res.sendFile(path.join(__dirname, "../", "/db/db.json"));
    }
  });
});

module.exports = router;
