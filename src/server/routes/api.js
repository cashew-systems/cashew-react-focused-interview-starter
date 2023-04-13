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

router.get("/flashcards", async function(req, res, next) {
  const results =  await db.query('select * from flashcards');
  res.send(results);
});

// {term, definition}
router.post("/flashcards", async function(req, res, next) {
  const { term, definition } = req.body;

  await db.query(`insert into flashcards(term, definition) values ('${term}', '${definition}')`);
  // console.log(result);

  res.sendStatus(201);
});


module.exports = router;
