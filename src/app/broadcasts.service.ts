import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as moment from 'moment';

import { Episode } from './episode';

@Injectable()
export class BroadcastsService {
  episodes: Episode[];

  constructor() {
    this.episodes = new Array<Episode>();
    let b: Episode = new Episode();
    b.duration = 'PT9M'; b.pid = 'p123'; b.title = 'live1'; b.first_placement = moment({hour: 14, minute: 30}).toISOString();
    this.episodes.push(b);
    b = new Episode();
    b.duration = 'PT9M'; b.pid = 'p124'; b.title = 'pre1'; b.first_placement = moment({hour: 14, minute: 39}).toISOString();
    this.episodes.push(b);
    b = new Episode();
    b.duration = 'PT9M'; b.pid = 'p125'; b.title = 'pre2'; b.first_placement = moment({hour: 14, minute: 48}).toISOString();
    this.episodes.push(b);
    b = new Episode();
    b.duration = 'PT9M'; b.pid = 'p126'; b.title = 'live2'; b.first_placement = moment({hour: 14, minute: 57}).toISOString();
    this.episodes.push(b);
  }

  getEpisode(pid: string): Observable<Episode> {
    let e: Episode;
    this.episodes.forEach(element => {
      if (element.pid === pid) {
        e = element;
      }
    });
    return Observable.of(e);
  }

  getEpisodes(): Observable<Episode[]> {
    return Observable.of(this.episodes);
  }

}
