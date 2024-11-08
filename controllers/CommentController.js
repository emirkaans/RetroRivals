'use strict';

import { CommentRenderer } from '../views/CommentRenderer.js';

export class CommentController {
  constructor(commentator) {
    this.commentator = commentator;
    this.renderer = new CommentRenderer('comments');
  }

  renderMatchComments() {
    const comments = this.commentator.commentsObject;

    this.renderer.render(comments);
  }
}
