'use strict';

import { TimeController } from '../controllers/TimeController.js';

export class TimeTracker {
  constructor() {
    this.timesArray = [];
    this.controller = new TimeController(this);
  }

  update(event, team, player, otherTeam, time) {
    this.timesArray.push(time);
    // console.log(this.timesArray);
  }

  triggerRender() {
    this.controller.renderTime();
  }
}
