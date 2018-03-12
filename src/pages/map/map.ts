import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { User } from '../../model/User';

import L from "leaflet";

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  /**
   * The map itself
   */
   // private map: any;

  /**
   * Whether or not the RadioList is currently displayed  
   */
   private testRadioOpen: boolean;
  /**
  * The result of the last RadioListSelection
  */
  private testRadioResult;

  private map: L.Map;
  center: L.PointTuple;

  private currentPosition:Array<Number> = new Array<Number>(2);
  private currentMarker;
  private currentUser:User;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private alerCtrl: AlertController
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    //set map center
    //this.center = [48.137154, 11.576124]; //Munich
    this.center = [48.775556, 9.182778]; //Stuttgart
    
    //setup leaflet map
    this.initMap();
  }

  initMap() {
    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    //Add OSM Layer
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attributionControl: false
    }).addTo(this.map);

    this.map.removeControl(this.map.attributionControl);
    this.map.locate({setView: true, maxZoom: 17});

    this.map.on('locationerror', this.onLocationError);
    this.map.on('locationfound', this.onLocationFound);

  }

  onLocationFound(e) {

    var radius = e.accuracy / 2;

    // L.marker(e.latlng).addTo(this.map)
    //     .bindPopup("You are within " + radius + " meters from this point").openPopup();

    // L.circle(e.latlng, radius).addTo(this.map);
  }

  onLocationError(e) {
      alert(e.message);
  }


  /**
   * Displays a marker on the center of the map.
   * To be removed (useless on real app).
   */
   addMarker() {

     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: this.map.getCenter()
     });

     let content = "<h4>Information!</h4>";

     this.addInfoWindow(marker, content);

   }

  /**
   * Displays `content` parameter in an info window over `marker` marker parameter.
   * To be adapted to leaflet.
   *
   * @param      {<type>}  marker   The marker to display info window on 
   * @param      {<type>}  content  The content to diplay in info window
   */
   addInfoWindow(marker, content): void {

     let infoWindow = new google.maps.InfoWindow({
       content: content
     });

     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });

   }

  /**
   * Loads the map.
   * To be adapted to leaflet.
   */
   loadMap():void {

     this.geolocation.getCurrentPosition().then((position) => {

       let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


       let mapOptions = {
         center: latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }

       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

     }, (err) => {
       console.log(err);
     });

   }

  /**
  * Pops an alert radio list to select which user to focus on.
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
      handler: data => {
        console.log('Goto:', data);
        this.currentUser = data;
        this.currentPosition = this.currentUser.getLocation();
        this.currentMarker = L.marker(this.currentPosition).addTo(this.map);
        var name = this.currentUser.getName();
        this.currentMarker.bindPopup(name).openPopup();
        this.center = this.map.panTo(new L.LatLng(this.currentPosition[0], this.currentPosition[1]), {animate: true});
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }



  fakeUsersList: User[] = [
  new User('Alice', [48.137154, 11.576124],true, true, true),
  new User('Bob', [48.775556, 9.182778], undefined, undefined, undefined),
  new User('Charlie', [-1, -1], undefined, undefined, undefined)
  ]

}