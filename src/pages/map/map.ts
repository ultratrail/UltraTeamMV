import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { User } from '../../model/User';

import L from "leaflet";

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
/**
 * Map page class.
 *
 * @class      MapPage (name)
 */
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  /**
   * Leaflet map
   */
  private map: L.Map;

  /**
   * Leaflet map center 
   */
  center: L.PointTuple;

  constructor(
    private alerCtrl: AlertController
    ) {
    
  }

  ionViewDidLoad() {
    //set map center
    this.center = [45.184604, 5.752280]; //Polytech
    
    this.initMap();
  }

  /**
   * Initialise map : create it, configure it and center it on received location
   */
  initMap():void {
    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attributionControl: false
    }).addTo(this.map);

    this.map.removeControl(this.map.attributionControl);
    this.map.locate({setView: true, maxZoom: 17});

    this.map.on('locationerror', this.onLocationError);

  }

  onLocationError(e) {
      alert(e.message);
  }


  /**
  * Pops an alert radio list to select which user to focus on.
  * On click on user, it will center map on said user. 
  */
  displayUserListRadio(): void {
    let alert = this.alerCtrl.create();
    alert.setTitle('Choose whom to locate');

    for (let entry of this.fakeUsersList) {
      alert.addInput(entry.userToRadioAlertInput());
    }

    alert.addButton('Cancel');

    alert.addButton({
      text: 'Locate',
      handler: chosenUser => {
        this.centerOnUser(chosenUser);
      }
    });

    alert.present();

  }

  /**
   * Sets given user's location as center of the map 
   *
   * @param      {<type>}  user    The user to center on
   */
  centerOnUser(user:User):void {
    let currentPosition = new Array<Number>(2);
    let currentMarker ; 
    let name: String;
    
    currentPosition = user.getLatestCoord();
    currentMarker = L.marker(currentPosition).addTo(this.map);
    name = this.buildMarkerString(user);
    currentMarker.bindPopup(name).openPopup();
    // this.center = this.map.panTo(new L.LatLng(this.currentPosition[0], this.currentPosition[1]), {animate: true});
    this.map.panTo(new L.LatLng(currentPosition[0], currentPosition[1]), {animate: true});
  }

  /**
   * Builds a marker string based on given user.
   *
   * @param      {<type>}  user    The user to build marker string from
   * @return     {<type>}  The marker string created.
   */
  buildMarkerString(user:User):String{
    let date = user.getLatestLocation().getDate();
    return "<center><b>" + user.getName() + "</b><br>[" 
    + user.getLatestCoord()[0].toString() + ", " + user.getLatestCoord()[1].toString() + "]<br>" 
    + date.getHours().toString() + "h" + date.getMinutes().toString() + "<br>"
    + date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString() + "</center>";
  }


  fakeUsersList: User[] = [
  new User(0, 'Alice', 48.137154, 11.576124, new Date('May 9, 1996'), true, true),
  new User(1, 'Bob', 48.775556, 9.182778, new Date('April 14, 1996'), undefined, undefined),
  new User(2, 'Charlie', 45.4607541, 4.3901056, new Date(), undefined, undefined)
  ]

}