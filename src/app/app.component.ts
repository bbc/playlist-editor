import { Component, OnInit } from '@angular/core';
import {DayPilotSchedulerComponent} from 'daypilot-pro-angular';
import { SimpleModalService } from 'ngx-simple-modal';

import {EventService} from './event.service';
import {EventComponent} from './event/event.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  nextId = 0;
  today = new Date();

  events: Object[];

  config: any = {
    timeHeaders: [
      { groupBy: 'Month', format: 'MMMM yyyy' },
      { groupBy: 'Day', format: 'd' },
      { groupBy: 'Hour', format: 'HH' }
    ],
    scale: 'Hour',
    start: '2018-02-03',
    days: 1,
    resources: [
      { name: 'Marathi', id: 'C1'}
    ],

    onEventMoved: args => {
      console.log('Event moved ' + args);
    },

    onTimeRangeSelected: args => {
      this.moveOrAdd(args);
    }

  };

  constructor(private eventService: EventService, private simpleModalService: SimpleModalService) { }

  ngOnInit() {
    this.getEvents();
  }

  moveOrAdd(args) {
    const s = args.start.toDate();
    const e = args.end.toDate();
    console.log('onTimeRangeSelected ' + args.start + ' ' + args.end + ' ' + args.resource);
    const disposable = this.simpleModalService.addModal(EventComponent, {
      text: 'event name',
      date: args.start.getDatePart(),
      start: { hour: s.getHours(), minute: s.getMinutes() },
      end: { hour: e.getHours(), minute: e.getMinutes() }
    })
      .subscribe((result) => {
          // We get dialog result
          if (result) {
              this.events.push({
                id: this.getNextId(),
                text: result.text,
                start: result.date.addHours(result.start.hour).addMinutes(result.start.minute),
                end: result.date.addHours(result.end.hour).addMinutes(result.end.minute),
                resource: 'C1'
              });
          } else {
              alert('declined');
          }
      });
  // We can close dialog calling disposable.unsubscribe();
  // If dialog was not closed manually close it by timeout
  setTimeout(() => {
      disposable.unsubscribe();
  }, 10000);
  }

  getNextId() {
    console.log(this.nextId);
    return this.nextId++;
  }

  getEvents(): void {
    this.events = this.eventService.getEvents();
    for (const o of this.events) {
      if (o['id'] >= this.nextId) {
          this.nextId = o['id'] + 1;
      }
    }
  }

  onPrev() {
    this.today = new Date(this.today.getTime() - 86400000);
  }

  onNext() {
    this.today = new Date(this.today.getTime() + 86400000);
  }
}
