import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from 'src/utils/swagger.uitl';

export class LoginDto {

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}