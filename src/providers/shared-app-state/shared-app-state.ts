import { Injectable } from '@angular/core';

import { User } from '../../model/User'
import { Course } from '../../model/Course'

@Injectable()
/**
 * Shared application state provider. And object which is injected all over the application.
 *
 * @class      SharedAppStateProvider
 */
export class SharedAppStateProvider {

  constructor() {
  }

  /**
   * SOS boolean state
   */
  private SOS: boolean ;
  
  /**
   * The user of the application
   */
  private appUser: User ;

  /**
   * The course currently taking place in the application
   */
  private course: Course ;

  /**
   * SOS was triggered, deal with it.
   */
  public sosToogled(SOS: boolean):void{
    // Handle SOS
    this.sendSOSServer(SOS);
    this.sendSOSBLE(SOS);
  }

  /**
   * SOS was triggered, upload every information to server
   */
  private sendSOSServer(SOS: boolean):void{
    if(SOS){
      console.log("Sending SOS to server");
    }
    else{
      console.log("Canceling SOS in server")
    }  }

  /**
   * SOS was triggered, send information to ESP via BLE
   */
  private sendSOSBLE(SOS: boolean):void{
    if(SOS){
      console.log("Sending SOS via BLE");
      if(this.appUser){
        console.log(this.appUser.toString() + "is app user");
      }
    }
    else{
      console.log("Canceling SOS via BLE");
      if(this.appUser){
        console.log(this.appUser.toString() + "is app user");
      }
    }
  }

  /**
   * Sets the user of the app.
   *
   * @param      {<type>}  user    The user
   */
  public setUser(user: User):void{
    this.appUser = user;
  }

  /**
   * Retrives the application user.
   *
   * @return     {<type>}  The user.
   */
  public getUser():User{
    return this.appUser;
  }

  /**
   * Sets the current course.
   *
   * @param      {<type>}  course  The course to be set as current course
   */
  public setCourse(course:Course):void{
    this.course = course;
  }

  /**
   * Gets the current course.
   *
   * @return     {<type>}  The current course.
   */
  public getCourse():Course{
    return this.course;
  }

}
