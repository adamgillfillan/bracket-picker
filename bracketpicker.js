const teams = require('./teams.json');

const getDivision = (teams, division) => {
  return teams.filter((team) => {
    return team.division === division;
  })
};
const divisions = {
  'east': getDivision(teams, 'East'),
  'west': getDivision(teams, 'West'),
  'south': getDivision(teams, 'South'),
  'midwest': getDivision(teams, 'Midwest'),
};
let games = {};

const init = () => {
  games = {
    64: {
      east: bm.east,
      west: bm.west,
      south: bm.south,
      midwest: bm.midwest
    },
    32: {
      east: [],
      west: [],
      south: [],
      midwest: []
    },
    16: {
      east: [],
      west: [],
      south: [],
      midwest: []
    },
    8: {
      east: [],
      west: [],
      south: [],
      midwest: []
    },
    4: {
      east: [],
      west: [],
      south: [],
      midwest: []
    },
    2: {},
    1: {}
  };
};

const getWinner = (home, away, strategy) => {
  let winner = '';

  if (strategy === 'coinflip') {
    winner = (Math.random() > .5) ? home : away;
  }

  if (strategy === 'seed') {
    winner = away;

    if (home.seed < away.seed) {
      winner = home;
    } else if (home.seed === away.seed) {
      winner = (Math.random() > .5) ? home : away;
    }
  }

  return {home, away, winner};
};

const doRound = (round, strategy) => {
  for (let division in games[round]) {
    for (let i=0; i < (round / 8); i++) {
      let home, away;

      if (round === 64) {
        home = games[round][division][i];
        away = games[round][division][games[round][division].length - (i + 1)];
      } else {
        home = games[round][division][i].winner;
        away = games[round][division][games[round][division].length - (i + 1)].winner;
      }

      games[round/2][division].push(getWinner(home, away, strategy));
    }
  }
};

const doFinalFour = (strategy) => {
  doRound(64, strategy);
  doRound(32, strategy);
  doRound(16, strategy);
  doRound(8, strategy);

  let home = getWinner(games[4].east[0].winner, games[4].west[0].winner, strategy);
  let away = getWinner(games[4].south[0].winner, games[4].midwest[0].winner, strategy);

  games[2] = {home: home.winner, away: away.winner};
};

// bracketmanager
const bm = module.exports = {
  teams: JSON.stringify(teams),
  east: divisions.east,
  west: divisions.west,
  south: divisions.south,
  midwest: divisions.midwest,

  createBracket: (strategy) => {
    init();
    doFinalFour(strategy);

    games[1] = getWinner(games[2].home, games[2].away, strategy).winner;

    return games;
  },
};

// createBracket('coinflip')
// createBracket('weighted')
// createBracket('record')
// createBracket('historical')
// createBracket('race')
