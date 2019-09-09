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

  todoLoaderByUserId = createDataLoader({
    repository: this,
    dataLoaderName: 'todoLoaderByUserId',
    dataLoaderFunction: this.loadTodoByUserIds,
    filterKey: 'userId',
  });
}
