import { GqlModuleOptions } from '@nestjs/graphql';
import * as depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import { join } from 'path';
import { formatGraphqlError } from '../../app/utils';
import { environment } from '../../environments/environment';

export const graphqlConfig: GqlModuleOptions = {
  typePaths: [join(process.cwd(), './apps/api/src/app/**/*.graphql')],
  formatError: formatGraphqlError,
  debug: environment.production ? false : true,
  playground: environment.production ? false : true,
  introspection: environment.production ? false : true,
  context: ({ req, res }) => ({ req, res }),
  definitions: {
    path: join(process.cwd(), './apps/api/src/app/graphql.types.ts'),
    outputAs: 'class',
  },
  validationRules: [
    depthLimit(parseInt(environment.env.GRAPHQL_DEPTH_LIMIT)),
    createComplexityLimitRule(
      parseInt(environment.env.GRAPHQL_QUERY_COST_LIMIT),
      {
        formatErrorMessage: (cost: any) => {
          return `Query with cost ${cost} exceeds complexity limit of ${environment.env.GRAPHQL_QUERY_COST_LIMIT}`;
        },
      }
    ),
  ],
};
