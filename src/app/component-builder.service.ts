import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from '@angular/core';

import { MathInputComponent } from './math-input/math-input.component';

@Injectable({
  providedIn: 'root',
})
export class ComponentBuilderService {
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  showAsComponent(message: string) {
    // Create element
    const popup = document.createElement('popup-component');

    // Create the component and wire it up with the element
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      MathInputComponent
    );
    const popupComponentRef = factory.create(this.injector, [], popup);

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(popupComponentRef.hostView);

    // Listen to the close event
    popupComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(popupComponentRef.hostView);
    });

    // Set the message
    popupComponentRef.instance.message = message;

    // Add to the DOM
    document.body.appendChild(popup);
  }
}
