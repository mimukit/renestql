import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { RoleType } from '@renestql/roles';
import { IQueryInfo } from 'accesscontrol';
import { Request } from 'express';
import { InjectRolesBuilder, Role, RolesBuilder } from 'nest-access-control';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder
  ) {}

  protected getUserRole(req: any): RoleType {
    return req.user.role;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const gqlCtx: GraphQLExecutionContext = GqlExecutionContext.create(context);

    const req: Request = gqlCtx.getContext().req;

    const userRole = this.getUserRole(req);

    const hasRoles = roles.every(role => {
      const queryInfo: IQueryInfo = role;
      queryInfo.role = userRole;

      const permission = this.roleBuilder.permission(queryInfo);

      return permission.granted;
    });

    return hasRoles;
  }
}
