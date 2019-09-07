import { RolesBuilder } from 'nest-access-control';

export type RoleType = 'ADMIN' | 'USER';

export const Roles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

const grantsObject = {
  [Roles.ADMIN]: {
    todo: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  [Roles.USER]: {
    todo: {
      'create:own': ['*'],
      'read:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
  },
};

export const roles: RolesBuilder = new RolesBuilder(grantsObject);
