import { Body, Controller, Param, Post, Sse } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Server Sent Events')
@Controller('events')
export class EventsController {

    constructor(private readonly eventsService: EventsService) {}

    @Sse('service/listener-for/:resource')
    sse(@Param('resource') resource: string) {
        const eventPayload = this.eventsService.subscribe(resource);
        return eventPayload;
    }

    @Post('service/emit/:resource')
    async emit(@Param('resource') resource: string, @Body() payload: any) {    
        await this.eventsService.emit(resource, payload);
    }
}
