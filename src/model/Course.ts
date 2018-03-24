import { User } from "./User";

export class Course {

  nbUsers: number = 0;
  users: User[];
  creator: User;
  creationDate: Date;

  constructor(
    creator: User
  ) {
    this.creationDate = new Date();
    this.users = new Array<User>();
    this.creator = creator ;
  }

  public getUsersList(): Array<User> {
    return this.users;
  }

  public addUser(user: User) {
    this.users.push(user);
  }


}
