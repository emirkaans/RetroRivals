'use strict';

export class TeamStatsRenderer extends Renderer {
  render(stats) {
    if (!this.element) return;

    const statsElement = document.createElement('ul');
    Object.entries(stats).forEach(([key, value]) => {
      const statItem = document.createElement('li');
      statItem.textContent = `${key}: ${value}`;
      statsElement.appendChild(statItem);
    });
    this.element.appendChild(statsElement);
  }
}
