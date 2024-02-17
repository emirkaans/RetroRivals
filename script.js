'use strict';

import { getRandomItem, randomUpTo, waitSeconds, getDataFrom, isGkSaveCorner } from './helpers.js';
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
    this.isMatchOver = false;
    this.observers = [];

    // Set Starting Conditions

    this._setWhoHasBall(teamHome);
    this.addObserver(new Commentator());
    this.addObserver(new Stats(teamHome, teamAway));
    this.setStats();
    this.setCommentator();
    this._startMatch();
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, team, player) {
    this.observers.forEach(observer => observer.update(event, team, player));
  }

  setStats() {
    this.stats = this.observers.find(observer => observer instanceof Stats);
  }

  setCommentator() {
    this.commentator = this.observers.find(observer => observer instanceof Commentator);
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

    if (isGkSaveCorner(goalKeeper)) {
      console.log('gk_save_corner');
      this.notifyObservers('gk_save_corner', teamDefense, goalKeeper);
    } else {
      const allPlayers = [...attackPlayers, ...defensePlayers];
      const whoHeadedBall = getRandomItem(allPlayers);
      const isDfSuccess = whoHeadedBall.team.fullName === teamDefense.fullName;
      const oddsGkSuccess = randomUpTo(100) < 80;

      if (isDfSuccess) {
        this.notifyObservers('df_save_corner', teamDefense, whoHeadedBall);
      } else {
        if (oddsGkSuccess) {
          this.notifyObservers('fv_shot_corner', teamAttack, whoHeadedBall);
          this.notifyObservers('gk_save_shot', teamDefense, goalKeeper);
        } else {
          this._goal(teamAttack, true, whoHeadedBall);
        }
      }
    }
  }

  async _startMatch() {
    this._goal(this.teamHome, true, getRandomItem(this.teamHome.players));

    this._goal(this.teamAway, false, undefined);

    await this._corner(this.teamAway, this.teamHome);

    // await this._goal(this.teamHome, undefined, undefined);

    // await waitSeconds(3);
  }
  _finishMatch() {}
}

// for (let index = 0; index < 20; index++) {
//   const match = new Match(fenerbahce, galatasaray);
// }

// const match = new Match(fenerbahce, galatasaray);

// console.log(match);
