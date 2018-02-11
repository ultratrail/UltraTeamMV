import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AES } from "../../util/aes";
import { Char } from "../../util/char";
import { QrCodeGeneratorPage } from '../qr-code-generator/qr-code-generator';

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
    private barcodeScanner: BarcodeScanner
  ) {

  }

  ionViewDidLoad() {
    this.scanCode();
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.decode(barcodeData.text)
      this.scannedCode = barcodeData.text;
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
