'use strict';

import { Player } from './Player.js';

export class GoalKeeper extends Player {
  constructor(fullName, playerNumber, age, height, health, position, reflexes, bounce, oneOnOne) {
    super(fullName, playerNumber, age, height, health, position);
    this.reflexes = reflexes;
    this.bounce = bounce;
    this.oneOnOne = oneOnOne;
  }
}
