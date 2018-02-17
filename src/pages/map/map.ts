import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, PopoverController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BLE } from '@ionic-native/ble';
import { DataStruct } from '../../util/dataStruct';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  popover:any;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public popoverCtrl: PopoverController,
    public ble:BLE,
    public alerCtrl: AlertController
    ) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  loadMap() {

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





  testRadioOpen: boolean;
  testRadioResult;

  doRadio() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Choose whom to locate');

    for (let entry of DataStruct.fakeUsersList) {
        alert.addInput(DataStruct.userToRadioAlertInput(entry));
    }

    alert.addButton('Cancel');

    alert.addButton({
      text: 'Locate',
      handler: data => {
        console.log('Goto:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

}