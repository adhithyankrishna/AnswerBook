const express = require("express");
const cors = require("cors");
const port = 3030;

const app = express();
app.use(cors());

let users = [];
let question = "";
let answer = "a";
let quest_Set = {};

app.get("/", (req, res) => {
  const response = {
    name: "Kahoot 2.0",
    version: 1.0,
    developer: "ak",
  };
  res.send(response);
});

app.get("/register", (req, res) => {
  const { name } = req.query;

  const existingUser = users.find((user) => user.name === name);
  if (existingUser) {
    return res.status(409).send("User already exists");
  }

  const newUser = {
    name,
    score: 0,
  };

  users.push(newUser);

  res.send("User registered successfully");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/questionset", (req, res) => {
  question = req.query.question;
  optiona = req.query.opa;
  optionb = req.query.opb;
  optionc = req.query.opc;
  optiond = req.query.opd;

  answer = req.query.answer;

  const quest = {
    question: question,
    optiona: optiona,
    optionb: optionb,
    optionc: optionc,
    answer: answer,
  };

  quest_Set.push(quest);
});

//app.get("/getquestion", (req, res) => {

app.post("/question", (req, res) => {
  question = req.query.question;
  answer = req.query.answer;
  res.send("saved successufully " + question + " " + answer);
});

app.get("/answer", (req, res) => {
  const name = req.query.name;
  const ans = req.query.answer;
  const user = users.find((user) => user.name === name);
  if (user) {
    if (ans === answer) {
      user.score += 1;
      res.send("Correct answer");
    } else {
      res.send("Wrong answer" + ans);
    }
  }
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
