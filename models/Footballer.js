'use strict';

import { Player } from './Player.js';

export class Footballer extends Player {
  constructor(fullName, playerNumber, age, height, health, position, technique, speed, finishing, shooting, dribbling, defense, tackling, aggression, stamina) {
    super(fullName, playerNumber, age, height, health, position);
    this.technique = technique;
    this.speed = speed;
    this.finishing = finishing;
    this.shooting = shooting;
    this.dribbling = dribbling;
    this.defense = defense;
    this.tackling = tackling;
    this.aggression = aggression;
    this.stamina = stamina;
  }
}
