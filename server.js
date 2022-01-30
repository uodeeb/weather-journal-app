import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Setup empty JS object to act as endpoint for all routes
let projectData = [];
const port = 8000;

// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// collect data from UI
app.post("/get-data", async function (req, res) {
  projectData = req.body;
  console.log(projectData);
  console.log("the post request is here!!!!");
});
// get the server data
app.get("/get-data", async function (req, res) {
  console.log("i receive a GET request");
  setTimeout((_) => {
    return res.json(projectData);
  }, 1000);
});

// Setup Server
app.listen(port, () => {
  console.log(`running on localhost:${port}`);
});
