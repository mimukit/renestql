import { Roles, RoleType } from '@renestql/roles';
import { CUSTOM_ID_PREFIX } from '../const';

export const getUserIdPrefix = (role?: RoleType): string =>
  role && role === Roles.ADMIN ? CUSTOM_ID_PREFIX.ADMIN : CUSTOM_ID_PREFIX.USER;
