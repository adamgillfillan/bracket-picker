const express = require('express');
const router = express.Router();
const bracketpicker = require('../bracketpicker');
const teams = bracketpicker.teams;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      {
        title: 'Bracket Picker',
        teams: teams
      }
  );
});

module.exports = router;
