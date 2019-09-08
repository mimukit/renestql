
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum RoleEnum {
    ADMIN = "ADMIN",
    USER = "USER"
}

export class CreateTodoInput {
    title: string;
    description?: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class RegisterInput {
    email: string;
    password: string;
    role: RoleEnum;
}

export class AuthPayload {
    token: string;
    user: User;
}

export abstract class IMutation {
    abstract register(data: RegisterInput): AuthPayload | Promise<AuthPayload>;

    abstract login(data: LoginInput): AuthPayload | Promise<AuthPayload>;

    abstract createTodo(data?: CreateTodoInput): Todo | Promise<Todo>;
}

export abstract class IQuery {
    abstract todos(): Todo[] | Promise<Todo[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract whoami(): User | Promise<User>;
}

export class Todo {
    id: string;
    todoId: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string;
}

export class User {
    id: string;
    userId: string;
    email: string;
    role: RoleEnum;
}
