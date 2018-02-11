import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QrCodeGeneratorPage } from "../qr-code-generator/qr-code-generator";
import { QrCodeReaderPage } from "../qr-code-reader/qr-code-reader";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openCreatePage(){
    this.navCtrl.setRoot(QrCodeGeneratorPage);
  }

  openJoinPage() {
    this.navCtrl.setRoot(QrCodeReaderPage);
  }

}
