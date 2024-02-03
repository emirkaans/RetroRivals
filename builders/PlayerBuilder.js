'use strict';

import { GoalKeeper } from '../models/GoalKeeper.js';
import { Footballer } from '../models/Footballer.js';

export const buildPlayers = player => {
  if (player.type === 'GoalKeeper') {
    return new GoalKeeper(player.fullName, player.playerNumber, player.age, player.height, player.health, player.position, player.reflexes, player.bounce, player.oneOnOne);
  } else if (player.type === 'Footballer') {
    return new Footballer(
      player.fullName,
      player.playerNumber,
      player.age,
      player.height,
      player.health,
      player.position,
      player.technique,
      player.speed,
      player.finishing,
      player.shooting,
      player.dribbling,
      player.defense,
      player.tackling,
      player.aggression,
      player.stamina
    );
  }
};
