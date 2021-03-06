import { Component, DoCheck, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { MathInputComponent } from './math-input/math-input.component';
import { ComponentBuilderService } from './component-builder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-dnd-demo';

  dragPosition = { x: 20, y: 20 };

  public xPosition = 20;
  public yPosition = 20;

  changePosition() {
    this.dragPosition = {
      x: this.dragPosition.x + 50,
      y: this.dragPosition.y + 50,
    };
  }

  onDragEnded(event) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);

    this.xPosition = boundingClientRect.x - parentPosition.left;
    this.yPosition = boundingClientRect.y - parentPosition.top;

    console.log(
      'x: ' + (boundingClientRect.x - parentPosition.left),
      'y: ' + (boundingClientRect.y - parentPosition.top)
    );
  }

  getPosition(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  //-------------------------------------------------------------------------------------
  constructor(injector: Injector, public popup: ComponentBuilderService) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(MathInputComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }
}
