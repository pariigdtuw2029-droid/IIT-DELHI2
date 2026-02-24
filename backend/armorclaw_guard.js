const express = require("express");
const bodyParser = require("body-parser");
const { policy, evaluatePolicy } = require("../src/policy");

const app = express();
app.use(bodyParser.json());

app.post("/evaluate", (req, res) => {
  const intent = req.body;

  const result = evaluatePolicy({ policy, intent });

  return res.json(result);
});

app.listen(4000, () => {
  console.log("ArmorClaw running on port 4000");
});