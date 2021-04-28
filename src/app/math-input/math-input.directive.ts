import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMathInput]',
})
export class MathInputDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
