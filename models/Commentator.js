'use strict';

import { getRandomItem, getDataFrom } from '../helpers.js';

export class Commentator {
  constructor() {}

  update(event, team, player) {
    if (event === 'goal') {
      // this._goal(team, player);
    } else if (event === 'corner') {
      this.corner(team);
    }
  }

  async corner(footballer, goalKeeper, isAttack, isGoal) {
    try {
      const comments = await getDataFrom('./speaker/comments/corner.json');
      const goalKeeperName = (goalKeeper || {}).fullName || '';
      const footballerName = (footballer || {}).fullName || '';

      if (!isAttack) {
        if (footballerName === '') {
          return getRandomItem(comments.goalKeeperSucceed).replaceAll('{goalKeeperName}', goalKeeperName);
        } else {
          return getRandomItem(comments.defenseSucceed).replaceAll('{footballerName}', footballerName);
        }
      } else {
        if (isGoal) {
          return getRandomItem(comments.goal).replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
        } else {
          return getRandomItem(comments.attackFailed).replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
        }
      }
    } catch (err) {
      console.log(err);
    }
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
