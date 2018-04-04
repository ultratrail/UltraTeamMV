import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SharedAppStateProvider } from '../../providers/shared-app-state/shared-app-state'

import { MapPage } from '../map/map';

import { AES } from "../../util/aes";
import { Char } from "../../util/char";

@Component({
  selector: 'page-qr-code-generator',
  templateUrl: 'qr-code-generator.html'
})
/**
 * QRCode generator page class
 *
 * @class      QrCodeGeneratorPage
 */
export class QrCodeGeneratorPage {

  /**
   * The generated AES.
   */
  private aes: AES;
  /**
   * The string generated from AES, to be sent.
   */
  private createdString: string = null;
  /**
   * AES IV as a "pseudo human readable" string
   */
  private readableKey: string = null;
  /**
   * AES IV as a "pseudo human readable" string
   */
  private readableIV: string = null;

  constructor(
    public navCtrl: NavController, 
    private appState: SharedAppStateProvider,
    ) {
    this.aes = new AES();
    this.readableKey = Char.numberArrayToCharCode(this.aes.getKey(), "")
    this.readableIV = Char.numberArrayToCharCode(this.aes.getIV(), "");
    this.generateCode();
  }

  /**
   * Return encoded courseID and AES (Key & IV) (from `number[]` to string) 
   *
   * @param      {<type>}  key     The AES key to encode
   * @param      {<type>}  iv      The AES IV to encode
   * @return     {<type>}  { The encoded string }
   */
  private encode(key: number[], iv: number[]):string {
    let keyAsChar:string = Char.numberArrayToCharCode(key, "");
    let ivAsChar:string = Char.numberArrayToCharCode(iv, "");
    let courseID:string = this.appState.getCourse().getUID().toString();
    return new Array(courseID, keyAsChar, ivAsChar).join("¤");
  }

  /**
   * Encodes the AES Key & IV into `createdString`
   */
  private generateCode(): void {
    this.createdString = this.encode(this.aes.getKey(), this.aes.getIV());
  }

  /**
   * Opens map page.
   */
  private openMapPage(): void {
    this.navCtrl.setRoot(MapPage);
  }


}
