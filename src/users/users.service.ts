import { BadRequestException, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { usersSeeds } from 'src/config/db/users.seeds';
import { Users } from 'src/entities/users.entity';
import { encryptPassword } from 'src/utils/password.bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import { Not } from 'typeorm';
import { selectorQueryUsers } from 'src/config/selector.query';

@Injectable()
export class UsersService implements OnModuleInit{

    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        private readonly configService: ConfigService
    ) {}

    async onModuleInit() {
        await this.initDatabaseforUsage();
    }

    /**
     * Find all users removing the logged user
     * @returns users array
     */
    async findAll(uidLogged: string): Promise<Users[]> {
        return this.usersRepository.find({ 
            where: { uid: Not(uidLogged) },
            select: selectorQueryUsers
        });
    }

    /**
     * Find user by id
     * @param uidPayload 
     * @returns user object
     */
    async findOneById(uidPayload: string): Promise<Users> {
        const user = this.usersRepository.findOne({ 
            where: { uid: uidPayload },
            select: selectorQueryUsers
        });
        if (!user) throw new BadRequestException('User not found');
        return user;
    }

    /**
     * Find user by email
     * @param emailPayload 
     * @returns user object
     */
    async findOneByEmail(emailPayload: string): Promise<Users> {
        const user = this.usersRepository.findOne({ where: { email: emailPayload } });
        if (!user) throw new BadRequestException('User not found');
        return user;
    }

    /**
     * Create user 
     * @param user 
     * @returns user object
     */
    async create(user: CreateUserDto): Promise<any> {
        const check = await this.findOneByEmail(user.email);
        if(check) throw new BadRequestException('User already exists');
        const password = encryptPassword(user.password, this.configService.get('crypto.secret'));
        user.password = password;
        const resp = await this.usersRepository.save(user);
        const { firstName, lastName, email, uid, createdAt  } = resp;
        return { firstName, lastName, email, uid, createdAt };
    }

    /**
     * Function created to run the seeds in the database
     * This function will be called when the module is initialized
     * This function will check if the user exists in the database and if not it will create the user
     * 2 defaults users will be created for the application
     * usersSeeds is a constant that is imported from the config/db/users.seeds.ts file
     **/
    async initDatabaseforUsage(){
        const users = usersSeeds || [];
        for( const user of users){
            await this.createDuringStart(user);   
        }
    }

    /**
     * Create user during the start of the application
     * @param user 
     * @returns user object
     */
    private async createDuringStart(user: CreateUserDto): Promise<Users | any> {
        const check = await this.findOneByEmail(user.email);
        if(check) return { message: 'User already exists' };
        const password = encryptPassword(user.password, this.configService.get('crypto.secret'));
        user.password = password;
        return this.usersRepository.save(user);
    }
}
