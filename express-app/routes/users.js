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

router.get('/', function(req, res, next) {
  res.send([obj1, obj2]);
});

module.exports = router;
