import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DayPilot} from 'daypilot-pro-angular';

import { Event } from '../event';
import { Time } from '../time';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent extends SimpleModalComponent<Event, Event> {
  @Input() text: string;
  @Output() textChange: string;
  @Input() start: Time;
  @Output() startChange: Time;
  @Input() end: Time;
  @Output() endChange: Time;
  date: DayPilot.Date;

  constructor() {
    super();
  }

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = { text: this.text, date: this.date, start: this.start, end: this.end };
    this.close();
  }
}
