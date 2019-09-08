import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository])],
  providers: [TodoResolver, TodoService],
})
export class TodoModule {}
