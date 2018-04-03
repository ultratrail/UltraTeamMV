import { Course } from "../model/Course";

export class API {
    
    /**
     * { Returns the UID of a user given its username and password }
     *
     * @param      {<type>}  username  User's username
     * @param      {<type>}  password  User's password
     * @return     {<type>}  { User's UID }
     */
    public static authenticate(username:string, password:string):number{
        // FIXME implement this method
        return 0 ;
    }

    /**
     * Creates a course on the server and return its id.
     *
     * @param      {<type>}  userID  User's UID
     * @return     {<type>}  { Course's UID }
     */
    public static createCourse(userID:number):number{
        // FIXME implement this method
        return 0 ;
    }


    /**
     * Request the server for userID to join courseID
     *
     * @param      {<type>}  courseID  Course's UID
     * @param      {<type>}  userID    User's UID
     */
    public static joinCourse(courseID:number, userID: number):void{
        //FIXME implement this method
        return ;
    }

    /**
     * Downloads a course.
     *
     * @param      {<type>}  courseID  Course's UID
     * @return     {<type>}  { The requested course if it exists, null otherwise }
     */
    public static downloadCourse(courseID:number):Course{
        // FIXME implement this method
        return ;
    }
}