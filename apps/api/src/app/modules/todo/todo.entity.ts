import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  todoId: string;

  @Column({ length: '255' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  userId: string;

  @ManyToOne(type => User, user => user.todos)
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
