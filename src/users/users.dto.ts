import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from 'src/utils/swagger.uitl';

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;
 

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    role: string;
}

export class UserProfileDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    uid: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    role: string;
}

export class AnyObjectDto{
    @ApiProperty()
    @IsObject()
    payload: object;
}
