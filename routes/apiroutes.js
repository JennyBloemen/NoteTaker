const router = require("express").Router();

const fs = require("fs");

// // GET Route for retrieving all the tips
// tips.get('/', (req, res) => {
//   readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
// });

// POST Route for a new UX/UI tip

router.get("/notes", function (req, res) {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    return err ? console.log(err) : res.json(JSON.parse(data));
  });
});

// router.post("/notes", function (req, res) {
//   let jsonFilePath = path.join(__dirname, "db/db/.json");
//   let newNote = req.body;
//   let highestId = 99;
//   for (let i = 0; i < database.length; i++) {
//     let individualNote = database[i];

//     if (individualNote.id > highestId) {
//       highestId = individualNote.id;
//     }
//   }

//   newNote.id = highestId + 1;
//   database.push(newNote);

//   fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log("Your note was saved!");
//   });
//   res.json(newNote);
// });

module.exports = router;
