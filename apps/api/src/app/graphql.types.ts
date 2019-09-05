
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class LoginInput {
    email: string;
    password: string;
}

export class RegisterInput {
    email: string;
    password: string;
}

export class AuthPayload {
    token: string;
    user: User;
}

export abstract class IMutation {
    abstract register(data: RegisterInput): AuthPayload | Promise<AuthPayload>;

    abstract login(data: LoginInput): AuthPayload | Promise<AuthPayload>;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract me(): User | Promise<User>;
}

export class User {
    id: string;
    userId: string;
    email: string;
}
