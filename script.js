'use strict';

import { commentCorner } from './speaker/speaker.js';
import { getRandomItem, randomUpTo, waitSeconds, getDataFrom } from './helpers.js';
import { buildTeam } from './builders/TeamBuilder.js';
import { Stats } from './models/Stats.js';
import { Commentator } from './models/Commentator.js';

const fenerbahceData = await getDataFrom('./data/fenerbahce.json');
const galatasarayData = await getDataFrom('./data/galatasaray.json');

const fenerbahce = buildTeam(fenerbahceData);
const galatasaray = buildTeam(galatasarayData);

console.log(fenerbahce);
console.log(galatasaray);

// DOM Elements
const commentContainer = document.querySelector('#comment');

// ////////////////////////////////

class Match {
  constructor(teamHome, teamAway) {
    this.teamHome = teamHome;
    this.teamAway = teamAway;
    this.time = 0;
    this.isMatchOver = false;
    this.observers = [];

    // Set Starting Conditions

    this._setWhoHasBall(teamHome);
    this.addObserver(new Commentator());
    this.addObserver(new Stats(teamHome, teamAway));
    this._startMatch();
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, team, player) {
    this.observers.forEach(observer => observer.update(event, team, player));
  }

  _setWhoHasBall(team) {
    this.whoHasBall = team;
  }

  _goal(team, isDirect, player) {
    if (isDirect) {
      this.notifyObservers('goal', team, player);
    } else {
      const scorer = player || getRandomItem(team.getOffensivePlayers());

      this.notifyObservers('goal', team, scorer);

      // await this._checkOffside(team);
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
    const goalKeeper = teamDefense.players.find(player => player.position === 'KL');

    if ((goalKeeper.reflexes + goalKeeper.bounce) / 2 > randomUpTo(100)) {
      console.log(await commentCorner(undefined, goalKeeper, false, false));
    } else {
      const allPlayers = [...attackPlayers, ...defensePlayers];
      const whoHeadedBall = getRandomItem(allPlayers);

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
    this._goal(this.teamHome, true, getRandomItem(this.teamHome.players));

    this._goal(this.teamAway, false, undefined);

    await this._corner(this.teamAway, this.teamHome);

    // await this._goal(this.teamHome, undefined, undefined);

    // await waitSeconds(3);

    // await this._goal(this.teamAway, undefined, undefined);

    // await waitSeconds(3);

    // await this._corner(this.teamHome, this.teamAway);
  }
  _finishMatch() {}
}

// for (let index = 0; index < 20; index++) {
//   const match = new Match(fenerbahce, galatasaray);
// }

const match = new Match(fenerbahce, galatasaray);

console.log(match);
