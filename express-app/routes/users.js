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

const users = []
users.push(obj1);
users.push(obj2);
router.post('/', function(req, res){
  const user = req.body;
  users.push(user);
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
    res.status(404).send(' мяу');
  } else {
    res.json(user);
  }
});
module.exports = router;
