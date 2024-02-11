'use strict';

import { getRandomItem, getDataFrom } from '../helpers.js';

export class Commentator {
  constructor() {}

  update(event, team, player) {
    console.log(`${player.fullName} attığı ${event} ile takımını sırtlıyor!`);
  }

  async commentCorner(footballer, goalKeeper, isAttack, isGoal) {
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
