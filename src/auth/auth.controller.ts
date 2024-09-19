import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/utils/swagger.uitl';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
      private readonly authService: AuthService
    ) {}   
     
    @ApiSwaggerResponse(LoginDto, 'Authenticate user')
    @ApiResponse({ status: 200, description: 'Successfully processed user auth' })
    @Post('login')
     async login(@Body() loginDto: LoginDto): Promise<object> {
      return this.authService.signIn(loginDto);
    }
}
