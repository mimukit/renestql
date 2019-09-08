import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
