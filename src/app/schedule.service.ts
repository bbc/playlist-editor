import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import { Broadcast } from './broadcast';

@Injectable()
export class ScheduleService {
  startOfDay = moment({hour: 0, minute: 0}).toISOString();
  bc: Broadcast[];

  constructor() {
    this.bc = new Array<Broadcast>();
  }

  getStartOfDay(): string {
    return this.startOfDay;
  }

  getBroadcasts(): Observable<Broadcast[]> {
    return Observable.of(this.bc);
  }

  addBroadcast(b: Broadcast): void {
    this.bc.push(b);
    this.bc.sort(function(x, y): number {
      return x.start.localeCompare(y.start);
    });
    const n = this.bc.findIndex(function(i) {return b.start === i.start; });
    if (n !== this.bc.length) {
    // TODO if the duration would make the new broadcast overlap the next
    // broadcast then push everything down until you get to a non-sliding
    // broadcast. If there would be an overlap, shorten the last sliding
    // broadcast
    }
  }

  /* delete the slot with this start and close the gap */
  deleteAt(start: string) {
    const n = this.bc.findIndex(function(b) {return b.start === start; });
    if ( n !== -1) {
      const b: Broadcast[] = this.bc.splice(n, 1);
      const duration = moment.duration(b[0].duration);
      for (let i = n; i < this.bc.length; i ++) {
        if (!this.bc[i].sliding) {
          break;
        }
        const s = this.bc[i].start;
        const ns = moment(s).subtract(duration).toISOString();
        this.bc[i].start = ns;
        console.log(start + ' ' + i + ' ' + s + ' ' + duration.toISOString() + ' ' + ns);
      }
    }
  }

  /* delete all occurences of this pid and close the gaps */
  deleteAllWithPid(pid: string) {
    alert('delete all occurences of ' + pid + ' and close the gaps is not done');
  }

  load() {
    // TODO
    // alert('load schedule is not done yet');
  }

  save() {
    // TODO
    console.log('save schedule');
    alert('save schedule is not done yet');
    console.log(JSON.stringify(this.bc));
  }

}
