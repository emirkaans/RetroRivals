'use strict';

import { waitSeconds } from '../helpers.js';
import { Renderer } from './Renderer.js';

export class CommentRenderer extends Renderer {
  constructor(element) {
    super(element);
    this.secondElement = document.querySelector('#time');
  }

  async render(commentsObject) {
    for (const item of Object.entries(commentsObject)) {
      const currentTime = item[0];
      const comments = item[1];

      this.secondElement.innerText = currentTime;

      for (const comment of comments) {
        this.element.innerText = comment;

        await waitSeconds(5);
      }
    }
  }
}
