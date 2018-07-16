import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Clip } from './clip';

@Injectable()
export class ClipsService {

  url = 'https://w32sum6i0d.execute-api.eu-west-1.amazonaws.com/test/nitro-query-for-marathi';

  constructor(private http: HttpClient) { }

  getClip(pid: string): Observable<Clip> {
    return this.fetch(
      {'page_size': '1', 'pid': pid}
    ).map(r => r[0]);
  }

  getClips(): Observable<Clip[]> {
    return this.fetch({'page_size': '20'});
  }

  fetch(p: any): Observable<Clip[]> {
    return this.http.get(
        this.url, {
          params: p
        }
      ).map(response => {
        return response['nitro']['results']['items'].map(
          item => {
            const c = new Clip();
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
