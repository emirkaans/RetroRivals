'use strict';

export class TimeTacker {
  constructor() {
    this.timesArray = [];
  }

  update(event, team, player, otherTeam, time) {
    this.timesArray.push(time);
    console.log(this.timesArray);
  }
}
