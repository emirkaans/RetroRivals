'use strict';

import { TimeRenderer } from '../views/TimeRenderer.js';

export class TimeController {
  constructor(commentator) {
    this.commentator = commentator;
    this.renderer = new TimeRenderer('time');

    console.log(this);
  }

  renderTime() {
    const comments = this.commentator.commentsArray;

    this.renderer.render(comments);
  }
}
