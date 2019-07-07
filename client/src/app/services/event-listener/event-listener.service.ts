import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventListenerService {

  @Output() loginChange: EventEmitter<boolean> = new EventEmitter(true);

  constructor() { }

  loginChanged() {
    this.loginChange.emit(true);
  }
}
