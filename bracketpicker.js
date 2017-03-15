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
    champion: {}
  };
};

const getWinner = (home, away, strategy) => {
  if (strategy === 'coinflip') {
    const winner = (Math.random() > .5) ? home : away;

    return {home, away, winner};
  }
};

const doRound = (round) => {
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

      games[round/2][division].push(getWinner(home, away, 'coinflip'));
    }
  }
};

const doFinalFour = () => {
  doRound(64);
  doRound(32);
  doRound(16);
  doRound(8);

  let home = getWinner(games[4].east[0].winner, games[4].west[0].winner, 'coinflip');
  let away = getWinner(games[4].south[0].winner, games[4].midwest[0].winner, 'coinflip');

  games[2] = {home, away};
};

// bracketmanager
const bm = module.exports = {
  teams: JSON.stringify(teams),
  east: divisions.east,
  west: divisions.west,
  south: divisions.south,
  midwest: divisions.midwest,

  createBracket: () => {
    init();
    doFinalFour();

    games.champion = getWinner(games[2].home.winner, games[2].away.winner, 'coinflip');

    console.log(games.champion.winner);
    return games;
  },
};

// createBracket('coinflip')
// createBracket('weighted')
// createBracket('record')
// createBracket('historical')
// createBracket('race')
