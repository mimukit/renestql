import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from '../todo/todo.entity';

enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  @OneToMany(type => Todo, todo => todo.user)
  todos: Todo[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
