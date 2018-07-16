import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayPilotModule } from 'daypilot-pro-angular';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { EventService } from './event.service';
import { EventComponent } from './event/event.component';
import { ClipsComponent } from './clips/clips.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { BroadcastsComponent } from './broadcasts/broadcasts.component';
import { ClipsService } from './clips.service';
import { EpisodesService } from './episodes.service';
import { BroadcastsService } from './broadcasts.service';
import { ScheduleService } from './schedule.service';
import { SpecialsService } from './specials.service';
import { SearchComponent } from './search/search.component';
import { SpecialsComponent } from './specials/specials.component';


@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    ClipsComponent,
    ScheduleComponent,
    ProgrammesComponent,
    BroadcastsComponent,
    SearchComponent,
    SpecialsComponent
  ],
  imports: [
    CommonModule, BrowserModule, DayPilotModule, SimpleModalModule,
    HttpClientModule, FormsModule,
    MatTableModule, MatGridListModule, MatCheckboxModule, MatExpansionModule,
    MatTooltipModule, MatToolbarModule,
    BrowserAnimationsModule,
    MomentModule,
    NgbModule.forRoot(),
  ],
  entryComponents: [
    EventComponent, ClipsComponent
  ],
  providers: [EventService,
      ClipsService, BroadcastsService, EpisodesService, ScheduleService, SpecialsService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class SchedulerModule { }
