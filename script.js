'use strict';

import { Manager } from './models/Manager.js';
import { GoalKeeper } from './models/GoalKeeper.js';
import { Footballer } from './models/Footballer.js';
import { Team } from './models/Team.js';
import { commentCorner } from './speaker/speaker.js';
import { randomUpTo } from './helpers.js';
import { waitSeconds } from './helpers.js';

const responseFener = await fetch('./players/fenerbahce.json');
const playersDataFener = await responseFener.json();

const responseGalata = await fetch('./players/galatasaray.json');
const playersDataGalata = await responseGalata.json();

const createPlayers = playerList => {
  const players = playerList.players.map(playerData => {
    if (playerData.type === 'GoalKeeper') {
      return new GoalKeeper(playerData.fullName, playerData.playerNumber, playerData.age, playerData.height, playerData.health, playerData.position, playerData.reflexes, playerData.bounce, playerData.oneOnOne);
    } else if (playerData.type === 'Footballer') {
      return new Footballer(
        playerData.fullName,
        playerData.playerNumber,
        playerData.age,
        playerData.height,
        playerData.health,
        playerData.position,
        playerData.technique,
        playerData.speed,
        playerData.finishing,
        playerData.shooting,
        playerData.dribbling,
        playerData.defense,
        playerData.tackling,
        playerData.aggression,
        playerData.stamina
      );
    }
  });

  return players;
};

// Fenerbahçe Players

const playersFenerbahce = createPlayers(playersDataFener);

// Fenerbahçe Manager

const zico = new Manager('Zico', 17, 18, 18, 15);

// Fenerbahçe Team

const fenerbahce = new Team('Fenerbahçe', 900000000, zico, playersFenerbahce);

// ////////////////////////////////

// Galatasaray Players

const playersGalatasaray = createPlayers(playersDataGalata);

// Galatasaray Manager

const fatihTerim = new Manager('Fatih Terim', 16, 18, 18, 18);

// Galatasaray Team

const galatasaray = new Team('Galatasaray', 800000000, fatihTerim, playersGalatasaray);

class Match {
  constructor(teamHome, teamAway) {
    this.teamHome = teamHome;
    this.teamAway = teamAway;
    this.time = 0;
    this.isMatchOver = false;

    // Set Starting Conditions
    this._setScore();
    this._setWhoHasBall(teamHome);
    this._setStatistics(teamHome);
    this._setStatistics(teamAway);

    this._startMatch();
  }

  _setScore() {
    this.score = {};
    this.score[this.teamHome.fullName] = 0;
    this.score[this.teamAway.fullName] = 0;
  }

  _setWhoHasBall(team) {
    this.whoHasBall = team;
  }

  _setStatistics(team) {
    team.statistics = {
      score: 0,
      shots: 0,
      shotsOnTarget: 0,
      possesion: 0 / 100,
      offsides: 0,
      corners: 0,
      fouls: 0,
      yellowCard: 0,
      redCard: 0,
    };

    team.players.map(player => {
      if (player.position === 'KL') {
        player.statistics = {
          saves: 0,
        };
      } else {
        player.statistics = {
          goals: 0,
          assists: 0,
          shots: 0,
          shotsOnTarget: 0,
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
        };
      }
    });
  }

  async _goal(team, isDirect, player) {
    if (isDirect) {
      team.statistics.shot++;
      team.statistics.shotsOnTarget++;
      team.statistics.score++;
      player.statistics.score++;
      player.statistics.shot++;
      player.statistics.shotsOnTarget++;
    } else {
      const possiblePlayers = team.players.filter(player => player.position === 'OS' || player.position === 'FV');
      const scorer = player || possiblePlayers[randomUpTo(possiblePlayers.length)];

      console.log(`Gol gol gol! ${scorer.fullName} topu ağlara gönderiyor!`);

      scorer.statistics.score++;
      scorer.statistics.shot++;
      scorer.statistics.shotsOnTarget++;

      await this._checkOffside(team);
    }
  }

  async _checkOffside(team) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (randomUpTo(100) > 85) {
          console.log('Ancak Hakemin bayrağı havada, ağlara giden top gol değeri kazanmıyor!');
        } else {
          team.statistics.score++;
        }
        resolve();
      }, 2000);
    });
  }

  fouls(team) {}

  penalty(team) {}

  async _corner(teamAttack, teamDefense) {
    const attackPlayers = teamAttack.players.filter(player => player.position !== 'KL' && player.height >= 180);
    const defensePlayers = teamDefense.players.filter(player => player.position !== 'KL' && player.height >= 180);
    const goalKeeper = teamDefense.players.filter(player => player.position === 'KL')[0];

    if ((goalKeeper.reflexes + goalKeeper.bounce) / 2 > randomUpTo(100)) {
      console.log(await commentCorner(undefined, goalKeeper, false, false));
    } else {
      const allPlayers = [...attackPlayers, ...defensePlayers];
      const whoHeadedBall = allPlayers[randomUpTo(allPlayers.length)];

      if (whoHeadedBall.team.fullName === teamDefense.fullName) {
        console.log(await commentCorner(whoHeadedBall, undefined, false, false));
      } else {
        if (randomUpTo(100) < 80) {
          console.log(await commentCorner(whoHeadedBall, goalKeeper, true, false));
        } else {
          console.log(await commentCorner(whoHeadedBall, goalKeeper, true, true));
          this._goal(teamAttack, true, whoHeadedBall);
        }
      }
    }

    teamAttack.statistics.corner++;
  }

  async _startMatch() {
    await this._goal(this.teamHome, undefined, undefined);

    await waitSeconds(3);

    await this._goal(this.teamAway, undefined, undefined);

    await waitSeconds(3);

    await this._corner(this.teamHome, this.teamAway);
  }
  _finishMatch() {}
}

// for (let index = 0; index < 20; index++) {
//   const match = new Match(fenerbahce, galatasaray);
// }

// const match = new Match(fenerbahce, galatasaray);
