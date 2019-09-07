import { RolesBuilder } from 'nest-access-control';

export type RoleType = 'ADMIN' | 'USER';

export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const Roles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const Resources = {
  TODO: 'TODO',
};

const grantsObject = {
  [Roles.ADMIN]: {
    [Resources.TODO]: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  [Roles.USER]: {
    [Resources.TODO]: {
      'create:own': ['*'],
      'read:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
  },
};

export const roles: RolesBuilder = new RolesBuilder(grantsObject);
