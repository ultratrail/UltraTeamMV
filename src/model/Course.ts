import { User } from "./User";

/**
 * Course describing class
 *
 * @class      Course
 */
export class Course {

  /**
   * List of course's users
   */
  users: User[];

  /**
   * Creation date of list
   */
  creationDate: Date;

  constructor(
    private UID: number,
  ) {
    this.creationDate = new Date();
    this.users = new Array<User>();
  }

  /**
   * Returns course's UID
   *
   * @return     {<type>}  Course's UID
   */
  public getUID():number{
    return this.UID;
  }

  /**
   * Returns course's user list
   *
   * @return     {<type>}  The users list.
   */
  public getUsersList(): Array<User> {
    return this.users;
  }

  /**
   * Adds an user to the course.
   *
   * @param      {<type>}  user    The User to be added to the course
   */
  public addUser(user: User):void{
    this.users.push(user);
  }


}
