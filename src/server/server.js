// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("dist"));
// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log(`running on local host: ${port}`);
}
app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});
//get function
app.post("/removeTrip", removeTrip);
function removeTrip(req, res) {
  let data = req.body;
  delete projectData[data.date];
  res.send(projectData);
}
//post function
app.post("/saveTrip", saveTrip);
function saveTrip(req, res) {
  let data = req.body;
  console.log("server side data ", data);
  projectData[data.date] = data.location;
  res.send(projectData);
}
