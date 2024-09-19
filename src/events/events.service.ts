import { Injectable } from '@nestjs/common';
import EventEmitter from 'events';
import { fromEvent } from 'rxjs';

@Injectable()
export class EventsService {

    private readonly emitter: EventEmitter

    constructor() {
        this.emitter = new EventEmitter();
    }

    /**
     *
     * @param resource
     * @returns
     */
    subscribe(resource: string) {
        const event = fromEvent(this.emitter, resource);
        event.subscribe((X) => console.log(X));
        return event;
    }

    /**
     *
     * @param resource
     * @param data
     */
    async emit(resource: string, data: any) {
        data.resource = resource;
        this.emitter.emit(resource, { data });
    }
}
