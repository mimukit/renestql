import * as DataLoader from 'dataloader';
import { EntityRepository, In, Repository } from 'typeorm';
import { createDataLoader } from '../../utils';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  private loadTodoByUserIds = async (ids: string[]) => {
    return await this.find({
      where: {
        userId: In(ids),
      },
    });
  };

  todoLoaderByUserId: DataLoader<string, Todo[]> = createDataLoader({
    repository: this,
    dataLoaderName: 'todoLoaderByUserId',
    dataLoaderFunction: this.loadTodoByUserIds,
    filterKey: 'userId',
  });
}
