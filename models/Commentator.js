'use strict';

import { getRandomItem, getDataFrom } from '../helpers.js';
const data = await getDataFrom('./data/comments/comments.json');
const comments = data.data.events;

export class Commentator {
  constructor() {
    this.comments = comments;
  }

  update(event, team, player, otherTeam) {
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
    } else if (event === 'goal') {
      this.goal(team, player);
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

  beforeMatch(teamHome, teamAway) {
    console.log(this.getRandomComment('before_match').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName));
  }

  matchStart(teamHome, teamAway) {
    console.log(this.getRandomComment('match_start').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName));
  }

  finishFirstHalf(teamHome, teamAway) {
    console.log(this.getRandomComment('first_half_end').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName));
  }

  startSecondHalf(teamHome, teamAway) {
    console.log(this.getRandomComment('second_half_start').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName));
  }

  finishMatch(teamHome, teamAway) {
    console.log(this.getRandomComment('match_end').replaceAll('${teamHome.fullName}', teamHome.fullName).replaceAll('${teamAway.fullName}', teamAway.fullName));
  }

  shot(teamAttack, footballer) {
    console.log(this.getRandomComment('shot').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName));
  }

  goal(teamAttack, footballer) {
    console.log(this.getRandomComment('goal').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName));
  }

  corner(teamAttack, teamDefence) {
    console.log(this.getRandomComment('corner').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${teamDefence.fullName}', teamDefence.fullName));
  }

  gkSaveCorner(teamDefence, goalKeeper) {
    console.log(this.getRandomComment('gk_save_corner').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName));
  }

  gkSaveShot(teamDefence, goalKeeper) {
    console.log(this.getRandomComment('gk_save_shot').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName));
  }

  dfSaveCorner(teamDefence, footballer) {
    console.log(this.getRandomComment('df_save_corner').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${footballer.fullName}', footballer.fullName));
  }

  fvShotCorner(teamAttack, footballer) {
    console.log(this.getRandomComment('fv_shot_corner').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName));
  }

  freekick(teamAttack, footballer) {
    console.log(this.getRandomComment('freekick').replaceAll('${teamAttack.fullName}', teamAttack.fullName).replaceAll('${footballer.fullName}', footballer.fullName));
  }

  gkSaveFreekick(teamDefence, goalKeeper) {
    console.log(this.getRandomComment('gk_save_freekick').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName));
  }

  penalty(teamAttack, footballer, otherTeam) {
    console.log(
      this.getRandomComment('penalty')
        .replaceAll('${teamAttack.fullName}', teamAttack.fullName)
        .replaceAll('${footballer.fullName}', footballer.fullName)
        .replaceAll('${goalKeeper.fullName}', otherTeam.getGoalKeeper().fullName)
    );
  }

  gkSavePenalty(teamDefence, goalKeeper) {
    console.log(this.getRandomComment('gk_save_penalty').replaceAll('${teamDefence.fullName}', teamDefence.fullName).replaceAll('${goalKeeper.fullName}', goalKeeper.fullName));
  }
}

// Commentator corner metodu:

// async corner(footballer, goalKeeper, isAttack, isGoal) {
//   try {
//     const comments = await getDataFrom('./speaker/comments/corner.json');
//     const goalKeeperName = (goalKeeper || {}).fullName || '';
//     const footballerName = (footballer || {}).fullName || '';

//     if (!isAttack) {
//       if (footballerName === '') {
//         return getRandomItem(comments.goalKeeperSucceed).replaceAll('{goalKeeperName}', goalKeeperName);
//       } else {
//         return getRandomItem(comments.defenseSucceed).replaceAll('{footballerName}', footballerName);
//       }
//     } else {
//       if (isGoal) {
//         return getRandomItem(comments.goal).replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
//       } else {
//         return getRandomItem(comments.attackFailed).replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// ------------------

// Match corner metodu

// async _corner(teamAttack, teamDefense) {
//   const attackPlayers = teamAttack.players.filter(player => player.position !== 'KL' && player.height >= 180);
//   const defensePlayers = teamDefense.players.filter(player => player.position !== 'KL' && player.height >= 180);
//   const goalKeeper = teamDefense.players.find(player => player.position === 'KL');

//   if ((goalKeeper.reflexes + goalKeeper.bounce) / 2 > randomUpTo(100)) {
//     console.log(await commentCorner(undefined, goalKeeper, false, false));
//   } else {
//     const allPlayers = [...attackPlayers, ...defensePlayers];
//     const whoHeadedBall = getRandomItem(allPlayers);

//     if (whoHeadedBall.team.fullName === teamDefense.fullName) {
//       console.log(await commentCorner(whoHeadedBall, undefined, false, false));
//     } else {
//       if (randomUpTo(100) < 80) {
//         console.log(await commentCorner(whoHeadedBall, goalKeeper, true, false));
//       } else {
//         console.log(await commentCorner(whoHeadedBall, goalKeeper, true, true));
//         this._goal(teamAttack, true, whoHeadedBall);
//       }
//     }
//   }
// }
