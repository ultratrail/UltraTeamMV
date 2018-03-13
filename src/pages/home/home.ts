import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QrCodeGeneratorPage } from "../qr-code-generator/qr-code-generator";
import { QrCodeReaderPage } from "../qr-code-reader/qr-code-reader";
import { ToastController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  devices: any[] = [];
  statusMessage: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone) { 
  }

 

  /**
   * Opens the QRCodeGenerator page.
   */
   openCreatePage(): void{
     this.navCtrl.setRoot(QrCodeGeneratorPage);
   }

  /**
   * Opens the QRCode scanner page.
   */
   openJoinPage(): void {
     this.navCtrl.setRoot(QrCodeReaderPage);
   }


   ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }

  /**
   * Scans for BLE devices
   */
  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }


  /**
   * Adds a device to the devices array when it is discovered
   * @param device  The device
   */
  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  /**
   * select the device
   * @param device  The device
   */
  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
    this.navCtrl.push(DetailPage, {
      device: device
    });
  }

 }

