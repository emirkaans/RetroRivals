'use strict';

import { getRandomItem, getDataFrom, waitSeconds } from '../helpers.js';
import { CommentController } from '../controllers/CommentController.js';
const data = await getDataFrom('./data/comments/comments.json');
const comments = data.data.events;

export class Commentator {
  constructor() {
    this.commentsArray = [];
    this.comments = comments;
    this.controller = new CommentController(this);
  }

  update(event, team, player, otherTeam, time) {
    if (event === 'before_match') {
      this.beforeMatch(team, otherTeam);
    } else if (event === 'match_start') {
      this.matchStart(team, otherTeam);
    } else if (event === 'first_half_end') {
      this.finishFirstHalf(team, otherTeam);
    } else if (event === 'second_half_start') {
      this.startSecondHalf(team, otherTeam);
    } else if (event === 'match_end') {
      this.finishMatch(team, otherTeam);
      this.triggerRender();
    } else if (event === 'goal') {
      this.goal(team, player, time);
    } else if (event === 'shot') {
      this.shot(team, player);
    } else if (event === 'corner') {
      this.corner(team, otherTeam);
    } else if (event === 'gk_save_corner') {
      this.gkSaveCorner(team, player);
    } else if (event === 'gk_save_shot') {
      this.gkSaveShot(team, player);
    } else if (event === 'df_save_corner') {
      this.dfSaveCorner(team, player);
    } else if (event === 'fv_shot_corner') {
      this.fvShotCorner(team, player);
    } else if (event === 'freekick') {
      this.freekick(team, player);
    } else if (event === 'gk_save_freekick') {
      this.gkSaveFreekick(team, player);
    } else if (event === 'penalty') {
      this.penalty(team, player, otherTeam);
    } else if (event === 'gk_save_penalty') {
      this.gkSavePenalty(team, player);
    }
  }

  getRandomComment(event) {
    const commentArray = this.comments.find(comment => comment.event === event).comments;

    return getRandomItem(commentArray);
  }

  triggerRender() {
    this.controller.renderMatchComments();
  }

  beforeMatch(teamHome, teamAway) {
    this.commentsArray.push(this.getRandomComment('before_match').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName));
  }

  matchStart(teamHome, teamAway) {
    this.commentsArray.push(this.getRandomComment('match_start').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName));
  }

  finishFirstHalf(teamHome, teamAway) {
    this.commentsArray.push(this.getRandomComment('first_half_end').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName));
  }

  startSecondHalf(teamHome, teamAway) {
    this.commentsArray.push(this.getRandomComment('second_half_start').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName));
  }

  finishMatch(teamHome, teamAway) {
    this.commentsArray.push(this.getRandomComment('match_end').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName));
  }

  shot(teamAttack, footballer) {
    this.commentsArray.push(this.getRandomComment('shot').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName));
  }

  goal(teamAttack, footballer) {
    this.commentsArray.push(this.getRandomComment('goal').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName));
  }

  corner(teamAttack, teamDefence) {
    this.commentsArray.push(this.getRandomComment('corner').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${teamDefence.fullName}', teamDefence.fullName));
  }

  gkSaveCorner(teamDefence, goalKeeper) {
    this.commentsArray.push(this.getRandomComment('gk_save_corner').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName));
  }

  gkSaveShot(teamDefence, goalKeeper) {
    this.commentsArray.push(this.getRandomComment('gk_save_shot').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName));
  }

  dfSaveCorner(teamDefence, footballer) {
    this.commentsArray.push(this.getRandomComment('df_save_corner').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${footballer.fullName}', footballer.fullName));
  }

  fvShotCorner(teamAttack, footballer) {
    this.commentsArray.push(this.getRandomComment('fv_shot_corner').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName));
  }

  freekick(teamAttack, footballer) {
    this.commentsArray.push(this.getRandomComment('freekick').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName));
  }

  gkSaveFreekick(teamDefence, goalKeeper) {
    this.commentsArray.push(this.getRandomComment('gk_save_freekick').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName));
  }

  penalty(teamAttack, footballer, otherTeam) {
    this.commentsArray.push(
      this.getRandomComment('penalty')
        .replaceAll('${teamAttack.fullName}', teamAttack.fullName)
        .replaceAll('${footballer.fullName}', footballer.fullName)
        .replaceAll('${goalKeeper.fullName}', otherTeam.getGoalKeeper().fullName)
    );
  }

  gkSavePenalty(teamDefence, goalKeeper) {
    this.commentsArray.push(this.getRandomComment('gk_save_penalty').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName));
  }
}
