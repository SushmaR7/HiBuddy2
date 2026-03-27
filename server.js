
const fs= require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
 
app.use(express.json());
app.use(cors());
const file="./db.json";
//--read & write json------------


function readJson(){
  const data=fs.readFileSync(file,"utf-8");
  console.log(data);
  return JSON.parse(data);
}
function writeJson(data)
{
  fs.writeFileSync(file,JSON.stringify(data,null,2));
}
//-------
// Fake database

let users = require("./db.json").note;

// CREATE
app.post("/users",  (req, res) => {
   const data =readJson();

  const newUser = {
    id: users.length + 1,
    notes: req.body.notes
  };
  data.note.push(newUser);
   writeJson(data);
  res.status(201).json(newUser);
});

// READ (all)
app.get("/users", (req, res) => {
  
  res.json(readJson().note);
});

// READ (single)
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});


// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});