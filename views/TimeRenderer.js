'use strict';

export class TimeRenderer extends Renderer {
  render(timeData) {
    if (!this.element) return;

    this.element.textContent = `Current Time: ${timeData}`;
  }
}
