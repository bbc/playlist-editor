import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Episode } from '../episode';
import { EpisodesService } from '../episodes.service';
import { Broadcast } from '../broadcast';
import { ScheduleComponent } from '../schedule/schedule.component';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() scheduleChange = new EventEmitter();
  dataSource: MatTableDataSource<Episode>;
  displayedColumns = ['title', 'duration', 'updated_time', 'actions'];

  constructor() { }

  ngOnInit() {
    this.showAssets();
  }

  showAssets() {
    // TODO
  }

  getAsset(pid: string): Episode {
    return this.dataSource.data.find(function(element) {
      return element.pid === pid;
    });
  }

  onAdd(event: any) {
    const pid = event.path[0].value;
    const episode: Episode = this.getAsset(pid);
    const b: Broadcast = new Broadcast(pid, '', episode.duration, true);
    this.scheduleChange.emit(b);
    const data = this.dataSource.data;
    data.forEach(element => {
      if (element.pid === pid) {
        element['use'] = 'used';
      }
    });
    this.dataSource.data = data;
  }
}

