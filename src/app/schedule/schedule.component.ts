import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import { Broadcast } from '../broadcast';
import { BroadcastsService } from '../broadcasts.service';
import { Episode } from '../episode';
import { EpisodesService } from '../episodes.service';
import { Clip } from '../clip';
import { ClipsService } from '../clips.service';
import { ScheduleService } from '../schedule.service';
import * as moment from 'moment';
import { endTimeRange } from '@angular/core/src/profile/wtf_impl';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  displayedColumns = ['select', 'start', 'title', 'duration', 'actions'];
  assets: Object;
  selection = new SelectionModel<Broadcast>(true, []);
  dataSource: MatTableDataSource<Broadcast>;
  cursor = '';

  constructor(
    private clipsService: ClipsService,
    private episodesService: EpisodesService,
    private broadcastsService: BroadcastsService,
    private scheduleService: ScheduleService
  ) {
    this.assets = new Object();
}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
       this.selection.clear() :
       this.dataSource.data.forEach(row => this.selection.select(row));
}
   /*
   Done:
    The broadcast list needs a cursor which is moveable on the screen.
    Additions should go at the cursor.
    added clips should be deleted from the clip list.
    Slots should be fixed or sliding.
   There should be a commit function to save the schedule
   There should be a programme list to add episodes like Click
   There should be a copy function
   Not Done:
   There should be a replace-all function
   there should be a delete all function
   */

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Broadcast>();
    this.scheduleService.load();
    this.refresh();
  }

  addBroadcastHandler(broadcast: Broadcast) {
    if (broadcast.start === '') {
      broadcast.start = this.cursor;
      this.cursor = broadcast.getEnd();
    }
    this.scheduleService.addBroadcast(broadcast);
    this.refresh();
  }

  refresh() {
    this.getClips();
    this.getBroadcasts();
    this.getEpisodes();
    this.getSchedule();
  }

  getTitle(pid: string): string {
    if (this.assets.hasOwnProperty(pid)) {
      return this.assets[pid].title;
    }
    if (pid === 'gap') { return 'Empty schedule segment'; }
    return '';
  }

  getClips() {
    this.clipsService.getClips()
      .subscribe(data => {
        data.forEach(datum => {
            this.assets[datum.pid] = datum;
        });
      });
  }

  getEpisodes() {
    this.episodesService.getEpisodes()
      .subscribe(data => {
        data.forEach(datum => {
            this.assets[datum.pid] = datum;
        });
      });
  }

  getBroadcasts() {
    this.broadcastsService.getEpisodes()
      .subscribe(data => {
        data.forEach(datum => {
            this.assets[datum.pid] = datum;
        });
      });
  }

  getSchedule() {
    this.scheduleService.getBroadcasts()
    .subscribe(data => {
      const bc: Broadcast[] = this.addGaps(data);
      if (this.cursor === '') {
        this.cursor = bc[0].start;
      } else {
        // TODO if cursor no-longer matches any gap start move it to the nearest one
        // For deletes this is likely to be just earlier
      }
      this.dataSource.data = bc;
    });
  }

  /* add the selected clips to the start of this gap
   * you can do this repeatedly to fill the gap
   */
  onAdd(event: any) {
    let start = event.path[0].value; // TODO should be same as cursor?
    console.log(start);
    this.selection.selected.forEach(b1 => {
      console.log(b1);
      const b2 = new Broadcast(b1.pid, start, b1.duration, b1.sliding);
      start = b2.getEnd();
      this.cursor = start;
      this.scheduleService.addBroadcast(b2);
    });
    this.refresh();
  }

  /* delete the slot with this start and close the gap */
  onDelete(event: any) {
    const start = event.path[0].value;
    this.scheduleService.deleteAt(start);
    this.refresh();
  }

  /* delete all occurences of this pid and close the gaps */
  onDeleteAll(event: any) {
    this.scheduleService.deleteAllWithPid(event.path[0].value);
    this.refresh();
  }

  /*
   * move the cursor to the start time - clips from the palette will be inserted here
   */
  onMoveCursor(event: any) {
    const start = event.path[0].value;
    this.cursor = start;
    this.refresh();
  }

  onSave() {
    this.scheduleService.save();
  }

  addGaps(bc: Broadcast[]): Broadcast[] {
    let s = this.scheduleService.getStartOfDay();
    const endOfDay = moment(s).add(24, 'hours').toISOString();
    const r: Broadcast[] = new Array<Broadcast>();
    bc.forEach(element => {
      if (s !== element.start) {
        console.log('insert gap ' + s + ' ' + element.start);
        const d = moment.duration(moment(element.start).diff(moment(s))).toISOString();
        r.push(new Broadcast('gap', s, d));
      }
      r.push(element);
      s = element.getEnd();
    });
    if (s !== endOfDay) {
      const d = moment.duration(moment(endOfDay).diff(moment(s))).toISOString();
      r.push(new Broadcast('gap', s, d));
    }
    return r;
  }

  broadcastCompare(x, y): number {
    const r = x.start.localeCompare(y.start);
    if (r === 0) {
      return x.duration.localeCompare(y.duration);
    }
    return r;
  }
}
