import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import { Broadcast } from '../broadcast';
import { Episode } from '../episode';
import { BroadcastsService } from '../broadcasts.service';

@Component({
  selector: 'app-broadcasts',
  templateUrl: './broadcasts.component.html',
  styleUrls: ['./broadcasts.component.css']
})
export class BroadcastsComponent implements OnInit {
  @Output() scheduleChange = new EventEmitter();
  dataSource: MatTableDataSource<Episode>;
  displayedColumns = ['first_placement', 'title', 'duration', 'actions'];

/*
  http://programmes.api.bbc.com/nitro/api/schedules/
  ?sid=world_service_stream_06&start_from=2018-04-17T00:00:00Z&end_to=2018-04-18T00:00:00Z&mixin=ancestor_titles
*/
  constructor(private service: BroadcastsService) { }

  ngOnInit() {
    this.showEpisodes();
  }

  showEpisodes() {
    this.service.getEpisodes()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  getEpisode(pid: string): Episode {
    return this.dataSource.data.find(function(element) {
      return element.pid === pid;
    });
  }

  onAdd(event: any) {
    const pid = event.path[0].value;
    const episode: Episode = this.getEpisode(pid);
    const b: Broadcast = new Broadcast(pid, episode.first_placement, episode.duration, false, true);
    this.scheduleChange.emit(b);
  }

  onAddRepeat(event: any) {
    const pid = event.path[0].value;
    const episode: Episode = this.getEpisode(pid);
    const b: Broadcast = new Broadcast(pid, '', episode.duration, true);
    this.scheduleChange.emit(b);
  }
}
