import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, PopoverController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Device } from '@ionic-native/device';

import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { PopoverPage } from '../pages/popover/popover'
import { BLE } from '@ionic-native/ble';
import { SettingsPage } from '../pages/settings/settings';
import { QrCodeGeneratorPage } from "../pages/qr-code-generator/qr-code-generator";
import { QrCodeReaderPage } from '../pages/qr-code-reader/qr-code-reader'
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    SettingsPage,
    PopoverPage,
    QrCodeGeneratorPage,
    QrCodeReaderPage,
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    PopoverPage,
    SettingsPage,
    QrCodeGeneratorPage,
    QrCodeReaderPage,
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    PopoverController,
    BLE,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BarcodeScanner,
    Device,
  ]
})
export class AppModule {}
