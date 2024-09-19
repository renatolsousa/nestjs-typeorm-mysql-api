import { Users } from 'src/entities/users.entity';
import { FindOptionsSelect } from 'typeorm';

export const selectorQueryUsers: FindOptionsSelect<Users> = {
    uid: true,
    firstName: true,
    lastName: true,
    email: true,
    createdAt: true,
    updatedAt: true,
    role: true
};