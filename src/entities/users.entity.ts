import { Optional } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import dayjs from 'dayjs'
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: createId()})
  uid: string

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @Column({ default: dayjs().format('YYYY-MM-DD HH:mm:ss') })
  createdAt: Date;

  @Column({ default: dayjs().format('YYYY-MM-DD HH:mm:ss') })
  updatedAt: Date;

  @Optional()
  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role: string;
  
}