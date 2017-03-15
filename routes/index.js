const express = require('express');
const router = express.Router();
const bracketpicker = require('../bracketpicker');

/* GET home page. */
router.get('/', function (req, res, next) {
  const strategy = req.query.strategy ? req.query.strategy : 'coinflip';
  const games = bracketpicker.createBracket(strategy);

  res.render('index',
    {
      title: '#beatmarc',
      games: JSON.stringify(games, null, 4),
      champion: games[1].school,
      seed: games[1].seed
    }
  );
});

router.get('/bracket', function (req, res, next) {
  const strategy = req.query.strategy ? req.query.strategy : 'coinflip';
  const games = bracketpicker.createBracket(strategy);

  res.setHeader('Content-Type', 'application/json');
  res.send(games);
});


module.exports = router;
