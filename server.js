const express = require("express");

const fs = require("fs");

const apiRoutes = require("./routes/api");
const htmlRoutes = require("./routes/htmlroutes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json()); //required to make a call
app.use(express.urlencoded({ extended: true })); //required for form data
app.use(express.static("public")); //this allows the client side to use anything in the public folder without having and end point defined

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
