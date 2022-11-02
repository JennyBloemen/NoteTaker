const router = require("express").Router();
const fs = require("fs"); //file system
const path = require("path");

const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    return err ? console.log(err) : res.json(JSON.parse(data));
  });
});

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

router.delete("/delete-post", (req, res) => {
  // get the db.json file just as above
  // jsonify it just as above
  // in the array of objects returned, get the one matching your id from the request
  // remove it from the array
  // save the array back in db.json just as above
});

module.exports = router;
