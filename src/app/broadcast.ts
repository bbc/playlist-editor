import * as moment from 'moment';

export class Broadcast {
    constructor(
        public pid: string = '',
        public start: string = '',
        public duration: string = '',
        public sliding: boolean = false,
        public live: boolean = false
    ) {
    }

    getEnd(): string {
        const end = moment(this.start).add(moment.duration(this.duration));
        return end.toISOString();
    }
}
