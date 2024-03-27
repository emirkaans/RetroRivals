'use strict';

import { getRandomItem, getDataFrom, waitSeconds } from '../helpers.js';
import { CommentController } from '../controllers/CommentController.js';
const data = await getDataFrom('./data/comments/comments.json');
const comments = data.data.events;

export class Commentator {
  constructor() {
    this.commentsObject = {};
    this.commentsArray = [];
    this.comments = comments;
    this.controller = new CommentController(this);
  }

  update(event, team, player, otherTeam, time) {
    if (event === 'before_match') {
      this.beforeMatch(time, team, otherTeam);
    } else if (event === 'match_start') {
      this.matchStart(time, team, otherTeam);
    } else if (event === 'first_half_end') {
      this.finishFirstHalf(time, team, otherTeam);
    } else if (event === 'second_half_start') {
      this.startSecondHalf(time, team, otherTeam);
    } else if (event === 'match_end') {
      this.finishMatch(time, team, otherTeam);
      this.triggerRender();
      console.log(this.commentsObject);
    } else if (event === 'goal') {
      this.goal(time, team, player, time);
    } else if (event === 'shot') {
      this.shot(time, team, player);
    } else if (event === 'corner') {
      this.corner(time, team, otherTeam);
    } else if (event === 'gk_save_corner') {
      this.gkSaveCorner(time, team, player);
    } else if (event === 'gk_save_shot') {
      this.gkSaveShot(time, team, player);
    } else if (event === 'df_save_corner') {
      this.dfSaveCorner(time, team, player);
    } else if (event === 'fv_shot_corner') {
      this.fvShotCorner(time, team, player);
    } else if (event === 'freekick') {
      this.freekick(time, team, player);
    } else if (event === 'gk_save_freekick') {
      this.gkSaveFreekick(time, team, player);
    } else if (event === 'penalty') {
      this.penalty(time, team, player, otherTeam);
    } else if (event === 'gk_save_penalty') {
      this.gkSavePenalty(time, team, player);
    }
  }

  getRandomComment(event) {
    const commentArray = this.comments.find(comment => comment.event === event).comments;

    return getRandomItem(commentArray);
  }

  triggerRender() {
    this.controller.renderMatchComments();
  }

  formatComments(time, comment) {
    if (typeof this.commentsObject[time] === 'undefined') {
      this.commentsObject[time] = [];
    }
    this.commentsObject[time].push(comment);
  }

  beforeMatch(time, teamHome, teamAway) {
    const comment = this.getRandomComment('before_match').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName);

    this.formatComments(time, comment);
  }

  matchStart(time, teamHome, teamAway) {
    const comment = this.getRandomComment('match_start').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName);

    this.formatComments(time, comment);
  }

  finishFirstHalf(time, teamHome, teamAway) {
    const comment = this.getRandomComment('first_half_end').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName);

    this.formatComments(time, comment);
  }

  startSecondHalf(time, teamHome, teamAway) {
    const comment = this.getRandomComment('second_half_start').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName);

    this.formatComments(time, comment);
  }

  finishMatch(time, teamHome, teamAway) {
    const comment = this.getRandomComment('match_end').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName);

    this.formatComments(time, comment);
  }

  shot(time, teamAttack, footballer) {
    const comment = this.getRandomComment('shot').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName);

    this.formatComments(time, comment);
  }

  goal(time, teamAttack, footballer) {
    const comment = this.getRandomComment('goal').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName);

    this.formatComments(time, comment);
  }

  corner(time, teamAttack, teamDefence) {
    const comment = this.getRandomComment('corner').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${teamDefence.fullName}', teamDefence.fullName);

    this.formatComments(time, comment);
  }

  gkSaveCorner(time, teamDefence, goalKeeper) {
    const comment = this.getRandomComment('gk_save_corner').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName);

    this.formatComments(time, comment);
  }

  gkSaveShot(time, teamDefence, goalKeeper) {
    const comment = this.getRandomComment('gk_save_shot').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName);

    this.formatComments(time, comment);
  }

  dfSaveCorner(time, teamDefence, footballer) {
    const comment = this.getRandomComment('df_save_corner').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${footballer.fullName}', footballer.fullName);

    this.formatComments(time, comment);
  }

  fvShotCorner(time, teamAttack, footballer) {
    const comment = this.getRandomComment('fv_shot_corner').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName);

    this.formatComments(time, comment);
  }

  freekick(time, teamAttack, footballer) {
    const comment = this.getRandomComment('freekick').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName);

    this.formatComments(time, comment);
  }

  gkSaveFreekick(time, teamDefence, goalKeeper) {
    const comment = this.getRandomComment('gk_save_freekick').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName);

    this.formatComments(time, comment);
  }

  penalty(time, teamAttack, footballer, otherTeam) {
    const comment = this.getRandomComment('penalty')
      .replaceAll('${teamAttack.fullName}', teamAttack.fullName)
      .replaceAll('${footballer.fullName}', footballer.fullName)
      .replaceAll('${goalKeeper.fullName}', otherTeam.getGoalKeeper().fullName);

    this.formatComments(time, comment);
  }

  gkSavePenalty(time, teamDefence, goalKeeper) {
    const comment = this.getRandomComment('gk_save_penalty').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName);

    this.formatComments(time, comment);
  }
}
