'use strict';

export class Stats {
  constructor(teamHome, teamAway) {
    this._setTeamsStatistics([teamHome, teamAway]);
    this.goalsObject = {};
  }

  update(event, team, player, otherTeam, time) {
    if (event === 'goal') {
      this.goal(team, player, time);
    } else if (event === 'shot' || event === 'fv_shot_corner' || event === 'freekick' || event === 'penalty') {
      this.shot(team, player);
    } else if (event === 'corner') {
      this.corner(team);
    } else if (event === 'gk_save_shot' || event === 'gk_save_corner' || event === 'gk_save_freekick' || event === 'gk_save_penalty') {
      this.gkSaveShot(team, player);
    }
  }

  _setTeamsStatistics(teams) {
    teams.map(team => {
      this[team.fullName] = {
        team: {
          score: 0,
          shots: 0,
          possesion: 0 / 100,
          offsides: 0,
          corners: 0,
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goalTimes: [],
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
              fouls: 0,
              yellowCard: 0,
              redCard: 0,
            };
          }
        }),
      };
    });
  }

  findPlayer(player, team) {
    return team.find(teamPlayer => teamPlayer.fullName === player.fullName);
  }

  findTeam(team) {
    return this[team.fullName];
  }

  goal(team, player, time) {
    const currentTeam = this.findTeam(team);
    const currentPlayer = this.findPlayer(player, currentTeam.players);

    currentTeam.team.score++;
    currentTeam.team.shots++;
    currentTeam.team.goalTimes.push(time);
    currentPlayer.goals++;
    currentPlayer.shots++;

    this.goalsObject[time] = { team: team.fullName, score: currentTeam.team.score };
    console.log(this.goalsObject);
  }

  shot(team, player) {
    const currentTeam = this.findTeam(team);
    const currentPlayer = this.findPlayer(player, currentTeam.players);

    currentTeam.team.shots++;
    currentPlayer.shots++;
  }

  corner(team) {
    const currentTeam = this.findTeam(team);

    currentTeam.team.corners++;
  }

  gkSaveShot(team, player) {
    const currentPlayer = this.findPlayer(player, this.findTeam(team).players);

    currentPlayer.saves++;
  }
}
