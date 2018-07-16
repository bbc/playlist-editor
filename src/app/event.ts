import {DayPilot} from 'daypilot-pro-angular';
import { Time } from './time';

export class Event {
    constructor(
    public text: string,
    public date: DayPilot.Date,
    public start: Time,
    public end: Time
    ) {}
}
