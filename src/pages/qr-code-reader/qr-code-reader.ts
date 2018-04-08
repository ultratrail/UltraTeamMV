import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';

import { AES } from "../../util/aes";
import { Char } from "../../util/char";

import { SharedAppStateProvider } from '../../providers/shared-app-state/shared-app-state'

import { Course } from '../../model/Course'

import { API } from '../../api/API'

@Component({
  selector: 'page-qr-code-reader',
  templateUrl: 'qr-code-reader.html',
})
/**
 * QRCode reader page class.
 *
 * @class      QrCodeReaderPage
 */
export class QrCodeReaderPage {

  /**
   * String resulting of scan
   */
  private scannedCode: string = null;
  /**
   * AES to be generated from scan
   */
  private aes: AES;
  /**
   * AES IV as a "pseudo human readable" string
   */
  private readableKey: string = null;
  /**
   * AES IV as a "pseudo human readable" string
   */
  private readableIV: string = null;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private appState: SharedAppStateProvider,
    ) {

  }

  ionViewDidLoad() {
    this.scanCode();
  }

  /**
   * Scans a code. Stores its text in `scannedCode` and runs `decode` on it.
   */
  scanCode(): void {
    this.barcodeScanner.scan().then(barcodeData => {
      if(barcodeData.text){ // To avoid exception on no code scanned
        this.decode(barcodeData.text);
        this.scannedCode = barcodeData.text;
      }
      else{ // If nothing was scanned, display a toast menu to inform user
        let toast = this.toastCtrl.create({
          position: 'top',
          message: 'Could not scan, no course joined',
          duration: 5000
        });
        toast.present();
      }
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  /**
   * Decodes an encoded courseID and AES (key & IV).
   * Creates the corresponding AES into `aes`.
   * Sets the course in appState
   *
   * @param      {<type>}  str     The scanned string to be decoded
   * @return     {<type>}
   */
  private decode(str: string):void {

    let arr:string[] = str.split("¤");

    let courseID:number = parseInt(arr[0]);

    let key = Char.charCodeToNumberArray(arr[1]);
    let IV = Char.charCodeToNumberArray(arr[2]);

    this.aes = new AES(key, IV);
    this.readableKey = Char.numberArrayToCharCode(this.aes.getKey(), "")
    this.readableIV = Char.numberArrayToCharCode(this.aes.getIV(), "");

    API.joinCourse(courseID, this.appState.getUser().getUID());
  }

}
