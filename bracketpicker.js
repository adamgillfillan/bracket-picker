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

// returns: {home: Villanova, away: Mt. St. Mary's / N Orleans, winner: Villanova}
const getWinner = (home, away, strategy) => {
  if (strategy === 'coinflip') {
    const winner = (Math.random() > .5) ? home : away;
    return {home: home.school, away: away.school, winner: winner.school}
  }
};

let games = {
  roundof64: {
    east: [],
    west: [],
    south: [],
    midwest: []
  },
  roundof32: {
    east: [],
    west: [],
    south: [],
    midwest: []
  },
  sweet16: {
    east: [],
    west: [],
    south: [],
    midwest: []
  },
  elite8: {
    east: [],
    west: [],
    south: [],
    midwest: []
  },
  final4: {},
  championship: {}
};
const buildFirstRound = () => {
  for (let division in games.roundof64) {
    for (let i=0; i < 7; i++) {
      games.roundof64[division].push(getWinner(bm[division][i], bm[division][bm[division].length - (i + 1)], 'coinflip'));
    }
  }

  console.log(games.roundof64.east);
  console.log(games.roundof64.west);
};

// bracketmanager
const bm = module.exports = {
  teams: JSON.stringify(teams),
  east: divisions.east,
  west: divisions.west,
  south: divisions.south,
  midwest: divisions.midwest,

  createBracket: () => {
    // console.log('teams', teams);
    buildFirstRound(teams);
    return teams;
  },
};

// createBracket('coinflip')
// createBracket('weighted')
// createBracket('record')
// createBracket('historical')
// createBracket('race')
