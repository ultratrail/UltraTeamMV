import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Course } from "../../model/Course";
import { MapPage } from '../map/map';
import { AES } from "../../util/aes";
import { Char } from "../../util/char";

@Component({
  selector: 'page-qr-code-generator',
  templateUrl: 'qr-code-generator.html'
})
export class QrCodeGeneratorPage {

  qrData = null;
  createdString: string = null;
  calculatedString = null;
  creator: Course;
  aes: AES;
  toSend: string;

  readableKey: string = null;
  readableIV: string = null;

  constructor(public navCtrl: NavController) {
    this.aes = new AES();
    this.readableKey = Char.numberArrayToCharCode(this.aes.getKey(), "")
    this.readableIV = Char.numberArrayToCharCode(this.aes.getIV(), "");
    this.generateCode();
  }

  private encode(key: number[], iv: number[]):string {
    let keyAsChar = Char.numberArrayToCharCode(key, "");
    let ivAsChar = Char.numberArrayToCharCode(iv, "");
    return new Array(keyAsChar, ivAsChar).join("¤");
  }

  generateCode() {
    this.toSend = this.encode(this.aes.getKey(), this.aes.getIV());
    this.createdString = this.toSend;
  }

  openMapPage() {
    this.navCtrl.setRoot(MapPage);
  }


}
