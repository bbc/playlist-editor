import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Clip } from './clip';

@Injectable()
export class SpecialsService {
  clips: Clip[];

  constructor() {
    this.clips = new Array<Clip>();
    const c = new Clip();
    c.pid = 'p3100';
    c.title = 'Countdown Clock';
    c.vpid = 'p4100';
    c.updated_time = '2018-04-18T00:00:00Z';
    c.duration = 'PT1M';
    this.clips.push(c);
  }

  getClip(pid: string): Observable<Clip> {
    return Observable.of(this.clips[0]);
  }

  getClips(): Observable<Clip[]> {
    return Observable.of(this.clips);
  }
}
