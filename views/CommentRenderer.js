'use strict';

import { waitSeconds } from '../helpers.js';
import { Renderer } from './Renderer.js';

export class CommentRenderer extends Renderer {
  constructor(element) {
    super(element);
  }

  async render(commentsArray) {
    for (const item of commentsArray) {
      this.element.innerText = item;

      await waitSeconds(5);
    }
  }
}
