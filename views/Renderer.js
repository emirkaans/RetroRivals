'use strict';

export class Renderer {
  constructor(elementId) {
    this.element = document.querySelector(`#${elementId}`);
  }

  render(data) {
    // Bu metod alt class'lar tarafından override edilecek
    console.log('Rendering data:', data);
  }
}
