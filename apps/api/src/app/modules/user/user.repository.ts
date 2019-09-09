import * as DataLoader from 'dataloader';
import { EntityRepository, In, Repository } from 'typeorm';
import { createDataLoader } from '../../utils';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private loadUserByIds = async (ids: string[]) =>
    await this.find({
      where: {
        id: In(ids),
      },
    });

  userLoaderById: DataLoader<string, User[]> = createDataLoader({
    repository: this,
    dataLoaderName: 'userLoaderById',
    dataLoaderFunction: this.loadUserByIds,
    filterKey: 'id',
  });
}
