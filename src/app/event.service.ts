import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

  constructor() { }

  getEvents(): Object[] {
    return [
      { id: 1, start: '2018-02-03T02:00:00', end: '2018-02-03T08:29:00', resource: 'C1', text: 'News' },
      { id: 2, start: '2018-02-03T08:29:00', end: '2018-02-03T09:05:00', resource: 'C1', text: 'ELT' },
      { id: 3, start: '2018-02-03T09:05:00', end: '2018-02-03T10:00:00', resource: 'C1', text: 'News' }
    ];
  }

}
