const express = require('express');
const router = express.Router();

/* GET users listing. */
const obj1 = {
  "id": 1,
  "name": "Кискина Арина"
}
const obj2 = {
  "id": 2,
  "name": "Черезов Тимофей"
}

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);


const users = []
users.push(obj1);
users.push(obj2);

router.post('/', function(req, res){
  const user = req.body.name;
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [user]);
  res.status(201).json(user);
});
router.get('/', function(req, res, next) {
  res.send(users);
});
router.get('/:id', function(req, res, next) {
  const userId = parseInt(req.params.id);

  const user = users.find(user => user.id === userId);
  console.log(user)
  if (!user) {
    next(new Error('No user found.'));
  } else {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    });
  }
});
module.exports = router;
