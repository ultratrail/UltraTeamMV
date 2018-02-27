import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { User } from '../../model/User';

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
   private map: any;

  /**
   * Whether or not the RadioList is currently displayed  
   */
   private testRadioOpen: boolean;
  /**
   * The result of the last RadioListSelection
   */
   private testRadioResult;

   constructor(
     private navCtrl: NavController,
     private geolocation: Geolocation,
     private alerCtrl: AlertController
     ) {

   }

   ionViewDidLoad() {
     this.loadMap();
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
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }



  fakeUsersList: User[] = [
  new User('Alice', [0, 0],true, true, true),
  new User('Bob', [1, 1], undefined, undefined, undefined),
  new User('Charlie', [-1, -1], undefined, undefined, undefined)
  ]

}