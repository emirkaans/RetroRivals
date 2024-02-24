'use strict';

export class CommentRenderer extends Renderer {
  async render(commentsArray) {
    if (!this.element) return;

    for (let comment of commentsArray) {
      document.querySelector('#comments').textContent = comment;

      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}
