const router = require("express").Router();
const path = require('path');   //utility of node that will create the path for me

 
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));    //..means directory above the one this file is in. 
    });

//this should come last
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
    module.exports = router;