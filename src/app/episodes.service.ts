import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Episode } from './episode';

@Injectable()
export class EpisodesService {
  episodes: Episode[];

  url = 'https://w32sum6i0d.execute-api.eu-west-1.amazonaws.com/test/nitro-query-for-marathi';

  constructor(private http: HttpClient) {
    this.episodes = new Array<Episode>();
    let b: Episode = new Episode();
    b.duration = 'PT30M'; b.pid = 'p127'; b.title = 'Marathi Click'; b.first_placement = '2018-04-17T11:00:00Z';
    this.episodes.push(b);
  }

  getEpisodes(): Observable<Episode[]> {
    return Observable.of(this.episodes);
  }

  getEpisode(pid: string): Observable<Episode> {
    return Observable.of(this.episodes[0]);
  }

  getEpisodes1(): Observable<Episode[]> {
    return this.fetch({'page_size': '20'});
  }

  getEpisode1(pid: string): Observable<Episode> {
    return this.fetch(
      {'page_size': '1', 'pid': pid}
    ).map(r => r[0]);
  }

  fetch(p: any): Observable<Episode[]> {
    return this.http.get(
        this.url, {
          params: p
        }
      ).map(response => {
        return response['nitro']['results']['items'].map(
          item => {
            const c = new Episode();
            c.pid = item['pid'];
            c.title = item['title'];
            c.updated_time = item['updated_time'];
            const version = item['available_versions']['version'][0];
            c.duration = version['duration'];
            c.vpid = version['pid'];
            return c;
          }
        );
      });
  }

}
