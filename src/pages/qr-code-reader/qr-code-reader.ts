import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AES } from "../../util/aes";
import { Char } from "../../util/char";
import { QrCodeGeneratorPage } from '../qr-code-generator/qr-code-generator';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-qr-code-reader',
  templateUrl: 'qr-code-reader.html',
})
export class QrCodeReaderPage {

  qrData = null;
  createdCode = null;
  scannedCode = null;
  decryptedCode: string = null;
  aes: AES;
  qrGen: QrCodeGeneratorPage;

  readableKey: string = null;
  readableIV: string = null;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController
    ) {

  }

  ionViewDidLoad() {
    this.scanCode();
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      if(barcodeData.text){ // To avoid exception on no code scanned
        this.decode(barcodeData.text)
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

  private decode(str: string):void {
    let arr:string[] = str.split("¤");
    let key = Char.charCodeToNumberArray(arr[0]);
    let IV = Char.charCodeToNumberArray(arr[1]);
    this.aes = new AES(key, IV);
    this.readableKey = Char.numberArrayToCharCode(this.aes.getKey(), "")
    this.readableIV = Char.numberArrayToCharCode(this.aes.getIV(), "");

    this.aes = new AES(key, IV);
  }



}
