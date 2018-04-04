import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Device } from '@ionic-native/device';

import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { BLE } from '@ionic-native/ble';
import { SettingsPage } from '../pages/settings/settings';
import { QrCodeGeneratorPage } from "../pages/qr-code-generator/qr-code-generator";
import { QrCodeReaderPage } from '../pages/qr-code-reader/qr-code-reader'
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SharedAppStateProvider } from '../providers/shared-app-state/shared-app-state';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    SettingsPage,
    QrCodeGeneratorPage,
    QrCodeReaderPage,
    LoginPage,
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
    SettingsPage,
    QrCodeGeneratorPage,
    QrCodeReaderPage,
    LoginPage,
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    BLE,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BarcodeScanner,
    Device,
    SharedAppStateProvider,
  ]
})
export class AppModule {}
