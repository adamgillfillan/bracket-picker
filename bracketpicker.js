const teams = require('./teams.json');

module.exports = {
    teams: JSON.stringify(teams),
    createBracket: () => {
        // whatever
        console.log('teams', teams);
        return teams;
    },
    bar: () => {
        // whatever
    }
};