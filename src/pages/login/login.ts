import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { API } from "../../api/API";

import { HomePage } from "../../pages/home/home";
import { SharedAppStateProvider } from '../../providers/shared-app-state/shared-app-state'
import { User } from '../../model/User'

import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
/**
 * Login page class.
 *
 * @class      LoginPage
 */
export class LoginPage {  

  /**
   * Received username
   */
  private username:string;

  /**
   * Received password
   */
  private password:string;

  //TODO remove this values 
  private lat: number;
  private lon: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appState: SharedAppStateProvider,
    public geolocation: Geolocation,
    ) {
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.lat = res.coords.latitude ;
      this.lon = res.coords.longitude ;
    });
  }

  /**
   * Logs the user (creates the user in appstate and goes to homepage)
   */
  private login():void{

    console.log("Username : " + this.username.toString() + ", Password : " + this.password.toString());

    let UID:number = API.authenticate(this.username, this.password);
    // TODO : create user properly
    console.log("new User(" + UID  + ", " + this.username.toString() + ", " + this.lat + ", " + this.lon + ", date, false, true);");
    let currentUser:User = new User(UID, this.username, this.lat, this.lon, new Date(), false, true); 

    this.appState.setUser(currentUser);
    this.openHomePage();
  }

  /**
  * Opens home page.
  */
  private openHomePage(): void {
    this.navCtrl.setRoot(HomePage);
  }
}
