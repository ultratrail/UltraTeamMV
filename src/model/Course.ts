import { User } from "./User";

export class Course {


  users: User[];
  creationDate: Date;

  constructor(
    private UID: number,
  ) {
    this.creationDate = new Date();
    this.users = new Array<User>();
  }

  public getUID():number{
    return this.UID;
  }

  public getUsersList(): Array<User> {
    return this.users;
  }

  public addUser(user: User) {
    this.users.push(user);
  }


}
