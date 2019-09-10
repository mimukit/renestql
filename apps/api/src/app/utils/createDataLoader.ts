import * as Dataloader from 'dataloader';
import { groupBy } from 'lodash';

interface CreateDataLoaderParams {
  repository: any;
  dataLoaderName: string;
  dataLoaderFunction: Function;
  filterKey: string;
}

export const createDataLoader = <Entity>({
  repository,
  dataLoaderName,
  dataLoaderFunction,
  filterKey,
}: CreateDataLoaderParams) =>
  new Dataloader<string, Entity[]>(async (ids: string[]) => {
    const data = await dataLoaderFunction(ids);

    const dataMap = groupBy(data, item => item[filterKey]);

    repository[dataLoaderName].clearAll();

    const result = ids.map(id => dataMap[id]);

    return result;
  });
