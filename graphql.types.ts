
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;
}

export class User {
    id: string;
    name: string;
    age?: number;
}
