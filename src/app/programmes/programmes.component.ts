import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Episode } from '../episode';
import { EpisodesService } from '../episodes.service';
import { Broadcast } from '../broadcast';
import { ScheduleComponent } from '../schedule/schedule.component';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})
export class ProgrammesComponent implements OnInit {
  @Output() scheduleChange = new EventEmitter();
  dataSource: MatTableDataSource<Episode>;
  displayedColumns = ['title', 'duration', 'updated_time', 'actions'];

  constructor(private service: EpisodesService) { }

  ngOnInit() {
    this.showEpisodes();
  }

  showEpisodes() {
    this.service.getEpisodes()
      .subscribe(data => {
        data.forEach(datum => datum['use'] = 'unused');
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.filter = 'unused';
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
