'use strict';

export class Stats {
  constructor(teamHome, teamAway) {
    this.time = 0;

    this._setTeamsStatistics([teamHome, teamAway]);
  }

  _setTeamsStatistics(teams) {
    teams.map(team => {
      this[team.fullName] = {
        team: {
          score: 0,
          shots: 0,
          shotsOnTarget: 0,
          possesion: 0 / 100,
          offsides: 0,
          corners: 0,
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
        },
        players: team.players.map(player => {
          if (player.position === 'KL') {
            return {
              fullName: player.fullName,
              saves: 0,
              yellowCard: 0,
              redCard: 0,
            };
          } else {
            return {
              fullName: player.fullName,
              goals: 0,
              assists: 0,
              shots: 0,
              shotsOnTarget: 0,
              fouls: 0,
              yellowCard: 0,
              redCard: 0,
            };
          }
        }),
      };
    });
  }

  _findPlayer(player, team) {
    return team.find(teamPlayer => teamPlayer.fullName === player.fullName);
  }

  _goal(team, player) {
    const currentTeam = this[team.fullName];
    const currentPlayer = this._findPlayer(player, currentTeam.players);

    currentTeam.team.score++;
    currentTeam.team.shots++;
    currentTeam.team.shotsOnTarget++;
    currentPlayer.goals++;
    currentPlayer.shots++;
    currentPlayer.shotsOnTarget++;
  }

  update(event, team, player) {
    console.log(`${player.fullName} attığı ${event} ile takımını sırtlıyor!`);

    if (event === 'goal') {
      this._goal(team, player);
    }
  }
}
