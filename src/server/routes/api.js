const express = require("express");
const router = express.Router();
const { db } = require('../adapters/postgres');

// Sample code to show syntax, not relevant to application but should help get started

/* GET users listing. */
router.get("/users", async function(req, res, next) {
  const dataResults = await db.query('select * from flashcards');
  res.send({ users: ["joe2", "bernie", "tulsi", "donald", "bill", dataResults[0]?.definition] });
});

/* POST users listing. */
router.post("/users", function(req, res, next) {
  const { username, password } = req.body;
  console.log('POST "users" route hit');
  // create a user
  res.sendStatus(200)
});

// Begin coding here

/* GET flashcards listing. */
router.get("/flashcards", async function(req, res, next) {
  const dataResults = await db.query('select * from flashcards');
  console.log("here-3")
  console.log(dataResults)
  console.log("here-4")

  res.send(dataResults);
});


/* POST flashcards listing. */
router.post("/flashcards", async function(req, res, next) {
  const { term, definition } = req.body;
  console.log('POST "flashcards" route hit');
  // create a fc
  const myquery = `insert into flashcards(term, definition) values ('${term}', '${definition}')`;
  const dataResults = await db.query(myquery);

  res.sendStatus(200)
});

module.exports = router;
