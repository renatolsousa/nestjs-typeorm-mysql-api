import { Body, Controller, Get, Inject, Param, Post, Request, Sse, UseGuards } from '@nestjs/common';
import { AnyObjectDto, CreateUserDto, UserProfileDto } from 'src/users/users.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Users } from 'src/entities/users.entity';
import { UsersService } from './users.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/utils/swagger.uitl';
import { EventsService } from 'src/events/events.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly eventsService: EventsService
    ){}

    @ApiSwaggerResponse(UserProfileDto, 'Get user profile')
    @ApiResponse({ status: 200, description: 'Successfully processed user profile' })
    @UseGuards(AuthGuard)
    @Get('profile')
    getUsers(@Request() req: any): UserProfileDto {
        return req.user;
    }

    @ApiSwaggerResponse(CreateUserDto, 'Create a user')
    @ApiResponse({ status: 200, description: 'Successfully processed create user' })
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('create')
    async createUser(@Body() payload: CreateUserDto): Promise<Users | any> {
        const create = await this.usersService.create(payload);
        await this.eventsService.emit('onCreate', create);
        return create;
    }

    @ApiResponse({ status: 200, description: 'Successfully processed list all user' })
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('list')
    async listUsers(@Request() req: any): Promise<Users | any> {
        const create = await this.usersService.findAll(req.user.uid);
        return create;
    }

    /**
     * Ref: https://docs.nestjs.com/techniques/server-sent-events
     * Extra/Bonus route to demonstrate Server Sent Events
     * Use this endpoint to subscribe to events on your client application
     * Exemple of implementation on client side:
     * 
     * WebApp:
        const eventSource = new EventSource('http://localhost:3000/user/notifications/[resource-name-you-want-to-listen-to]');
        events.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            console.log('RECEIVED', parsedData);
        };
     * @param resource 
     * @returns 
     */
    @Sse('notifications/:resource')
    sse(@Param('resource') resource: string) {
        const eventPayload = this.eventsService.subscribe(resource);
        return eventPayload;
    }

    /**
     * Use this route to emit events to the resources are listening to
     * Or you can implement the EventsService.emit() method on your services
     * to emit events from your services:
            await this.eventsService.emit('resource-name-you-want-to-send-to', objectYouWantToSend);
     * 
     * @param resource 
     */
    @ApiSwaggerResponse(AnyObjectDto, 'any object to dispatch')
    @ApiResponse({ status: 200, description: 'Successfully processed emit event' })
    @Post('emit/:resource')
    async emit(@Param('resource') resource: string, @Body() payload: any) {
        console.log('Emitting event to:', resource);    
        await this.eventsService.emit(resource, payload);
    }

}
