import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { comparePassword } from 'src/utils/password.bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private jwtService: JwtService
    ) {}

    async signIn(loginPayload: LoginDto): Promise<{ access_token:string, user: {} }> {
        const user = await this.usersService.findOneByEmail(loginPayload.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        
        const crypto = this.configService.get('crypto');
        
        const isPasswordValid = comparePassword(loginPayload.password, crypto.secret, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        const payload = { email: user.email, uid: user.uid, role: user.role, firstName: user.firstName };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: payload
        };
    }
}
