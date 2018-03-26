import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from "../../pages/home/home";
import { SharedAppStateProvider } from '../../providers/shared-app-state/shared-app-state'
import { User } from '../../model/User'

import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {  

  /**
   * Received username
   */
  private username:string;

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
    console.log("new User(" + this.username.toString() + ", " + this.lat + ", " + this.lon + ", date, false, true");
    this.appState.setUser(new User(this.username, this.lat, this.lon, new Date(), false, true));
    this.openHomePage();
  }

  /**
  * Opens home page.
  */
  private openHomePage(): void {
    this.navCtrl.setRoot(HomePage);
  }
}
