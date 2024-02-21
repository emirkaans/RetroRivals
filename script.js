'use strict';

import { getRandomItem, randomUpTo, waitSeconds, getDataFrom, getRandomBetween } from './helpers.js';
import { buildTeam } from './builders/TeamBuilder.js';
import { Stats } from './models/Stats.js';
import { Commentator } from './models/Commentator.js';

const fenerbahceData = await getDataFrom('./data/teams/fenerbahce.json');
const galatasarayData = await getDataFrom('./data/teams/galatasaray.json');
const besiktasData = await getDataFrom('./data/teams/besiktas.json');

const fenerbahce = buildTeam(fenerbahceData);
const galatasaray = buildTeam(galatasarayData);
const besiktas = buildTeam(besiktasData);

// DOM Elements
const commentContainer = document.querySelector('#comment');

// ////////////////////////////////

class Match {
  constructor(teamHome, teamAway) {
    this.teamHome = teamHome;
    this.teamAway = teamAway;
    this.isMatchOver = false;
    this.observers = [];
    this.time = 0;

    // Set Starting Conditions

    this._setWhoHasBall(teamHome);
    this.addObserver(new Commentator());
    this.addObserver(new Stats(teamHome, teamAway));
    this.setStats();
    this.setCommentator();
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, team, player, otherTeam) {
    this.observers.forEach(observer => observer.update(event, team, player, otherTeam));
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

  foul(teamAttack, teamDefence) {}

  shot(teamAttack, teamDefence) {
    const shooter = getRandomItem(teamAttack.getOffensivePlayers());
    const goalKeeper = teamDefence.getGoalKeeper();
    const playerEffect = (shooter.shot - goalKeeper.bounce) * 3;
    const goalProb = 20 + playerEffect;

    this.notifyObservers('shot', teamAttack, shooter);

    if (goalProb > randomUpTo(100)) {
      this.goal(teamAttack, true, shooter);
    } else {
      this.notifyObservers('gk_save_shot', teamDefence, goalKeeper);
    }
  }

  penalty(teamAttack, teamDefence) {
    const penaltyTaker = getRandomItem(teamAttack.getOffensivePlayers());
    const goalKeeper = teamDefence.getGoalKeeper();
    const takerScore = penaltyTaker.getPenaltyScore();
    const goalKeeperScore = goalKeeper.getPenaltyScore();
    const playerEffect = (takerScore - goalKeeperScore) * 3;
    const goalProb = 65 + playerEffect;

    this.notifyObservers('penalty', teamAttack, penaltyTaker, teamDefence);

    if (goalProb > randomUpTo(100)) {
      this.goal(teamAttack, true, penaltyTaker);
    } else {
      this.notifyObservers('gk_save_penalty', teamDefence, goalKeeper);
    }
  }

  freekick(teamAttack, teamDefence) {
    const freekickTaker = getRandomItem(teamAttack.getOffensivePlayers());
    const goalKeeper = teamDefence.getGoalKeeper();
    const takerScore = freekickTaker.getFreekickScore();
    const goalKeeperScore = goalKeeper.getFreekickScore();
    const playerEffect = (takerScore - goalKeeperScore) * 3;
    const goalProb = 18 + playerEffect;

    this.notifyObservers('freekick', teamAttack, freekickTaker);

    if (goalProb > randomUpTo(100)) {
      this.goal(teamAttack, true, freekickTaker);
    } else {
      this.notifyObservers('gk_save_freekick', teamDefence, goalKeeper);
    }
  }

  goal(team, isDirect, player) {
    if (isDirect) {
      this.notifyObservers('goal', team, player);
    } else {
      const scorer = player || getRandomItem(team.getOffensivePlayers());

      this.notifyObservers('goal', team, scorer);
    }
  }

  corner(teamAttack, teamDefence) {
    const attackPlayers = teamAttack.players.filter(player => player.position !== 'KL' && player.height >= 180);
    const defensePlayers = teamDefence.players.filter(player => player.position !== 'KL' && player.height >= 180);
    const goalKeeper = teamDefence.getGoalKeeper();

    this.notifyObservers('corner', teamAttack, undefined, teamDefence);

    if (goalKeeper.isSaveCorner()) {
      this.notifyObservers('gk_save_corner', teamDefence, goalKeeper);
    } else {
      const allPlayers = [...attackPlayers, ...defensePlayers];
      const whoHeadedBall = getRandomItem(allPlayers);
      const isDfSave = whoHeadedBall.team.fullName === teamDefence.fullName;
      const oddsGkSave = randomUpTo(100) < 80;

      if (isDfSave) {
        this.notifyObservers('df_save_corner', teamDefence, whoHeadedBall);
      } else {
        if (oddsGkSave) {
          this.notifyObservers('fv_shot_corner', teamAttack, whoHeadedBall);
          this.notifyObservers('gk_save_shot', teamDefence, goalKeeper);
        } else {
          this.goal(teamAttack, true, whoHeadedBall);
        }
      }
    }
  }

  goalCancel(teamAttack, teamDefence) {}

  assist(player) {}

  finishFirstHalf() {
    this.notifyObservers('first_half_end', this.teamHome, undefined, this.teamAway);
  }

  startSecondHalf() {
    this.notifyObservers('second_half_start', this.teamHome, undefined, this.teamAway);
  }

  triggerEvents() {
    const teamAttack = randomUpTo(100) > 50 ? this.teamHome : this.teamAway;
    const teamDefence = teamAttack.fullName === this.teamHome.fullName ? this.teamAway : this.teamHome;
    const events = ['freekick', 'shot', 'corner', 'penalty'];
    const event = getRandomItem(events);

    if (event === 'freekick') {
      this.freekick(teamAttack, teamDefence);
    } else if (event === 'shot') {
      this.shot(teamAttack, teamDefence);
    } else if (event === 'corner') {
      this.corner(teamAttack, teamDefence);
    } else if (event === 'penalty') {
      this.penalty(teamAttack, teamDefence);
    }

    this.time += getRandomBetween(5, 20);
  }

  startMatch() {
    this.notifyObservers('before_start', this.teamHome, undefined, this.teamAway);
    this.notifyObservers('match_start', this.teamHome, undefined, this.teamAway);

    while (this.time < 45) {
      this.triggerEvents();
    }

    this.finishFirstHalf();

    console.log('=========================');
    console.log(`İlkyarı Sonucu: ${this.teamHome.fullName}: ${this.stats[this.teamHome.fullName].team.score} || ${this.teamAway.fullName}: ${this.stats[this.teamAway.fullName].team.score}`);
    console.log('=========================');

    this.startSecondHalf();

    while (this.time < 90) {
      this.triggerEvents();
    }

    this.finishMatch();

    console.log('=========================');
    console.log(`Maç Sonucu: ${this.teamHome.fullName}: ${this.stats[this.teamHome.fullName].team.score} || ${this.teamAway.fullName}: ${this.stats[this.teamAway.fullName].team.score}`);
    console.log('=========================');
  }
  finishMatch() {
    this.isMatchOver = true;
    this.notifyObservers('match_end', this.teamHome, undefined, this.teamAway);
  }
}

// for (let index = 0; index < 20; index++) {
//   const match = new Match(fenerbahce, galatasaray);
//   match.startMatch();
// }

const match1 = new Match(fenerbahce, galatasaray);
const match2 = new Match(fenerbahce, besiktas);
const match3 = new Match(besiktas, galatasaray);

match1.startMatch();
match2.startMatch();
match3.startMatch();
