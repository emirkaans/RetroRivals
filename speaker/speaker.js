'use strict';

import { randomUpTo } from '../helpers.js';

export const commentCorner = async (footballer, goalKeeper, isAttack, isGoal) => {
  try {
    const response = await fetch('./speaker/comments/corner.json');
    const comments = await response.json();
    const goalKeeperName = (goalKeeper || {}).fullName || '';
    const footballerName = (footballer || {}).fullName || '';

    if (!isAttack) {
      if (footballerName === '') {
        return comments.goalKeeperSucceed[randomUpTo(comments.goalKeeperSucceed.length)].replaceAll('{goalKeeperName}', goalKeeperName);
      } else {
        return comments.defenseSucceed[randomUpTo(comments.defenseSucceed.length)].replaceAll('{footballerName}', footballerName);
      }
    } else {
      if (isGoal) {
        return comments.goal[randomUpTo(comments.goal.length)].replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
      } else {
        return comments.attackFailed[randomUpTo(comments.attackFailed.length)].replaceAll('{goalKeeperName}', goalKeeperName).replaceAll('{footballerName}', footballerName);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
