import { Injectable } from '@angular/core';

import { User } from '../../model/User'


@Injectable()
export class SharedAppStateProvider {

  constructor() {
  }

  private SOS: boolean ;
  private appUser: User;

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

}