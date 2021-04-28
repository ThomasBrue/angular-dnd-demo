import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MathInputDirective } from './math-input.directive';

@Component({
  selector: 'app-math-input',
  templateUrl: './math-input.component.html',
  styleUrls: ['./math-input.component.css'],
})
export class MathInputComponent implements OnInit {
  @ViewChild(MathInputDirective, { static: true }) adHost: MathInputDirective;

  constructor() {}

  ngOnInit(): void {}

  @Input()
  get message(): string {
    return this._message;
  }
  set message(message: string) {
    this._message = message;
  }
  private _message: string;

  @Output()
  closed = new EventEmitter();
}
