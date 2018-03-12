import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
//import {CharacteristicPage} from '../characteristic/characteristic';
import {BLE} from 'ionic-native';

@Component({
	templateUrl: 'build/pages/device/device.html'
})



export class DevicePage {

device ;
connecting : boolean;

	constructor(public navParams: NavParams,public nav: NavController) {
		this.device = this.navParams.get('device');
		this.connecting = true;
		this.connect(this.device.id);
	}

	connect(deviceID) {
		//this.characteristics = [];

		BLE.connect(deviceID).subscribe(peripheralData => {
			console.log(peripheralData.characteristics);
		//	this.characteristics = peripheralData.characteristics;
			this.connecting = false;
		},
		peripheralData => {
			console.log('disconnected');
		});
	}

	// connectToCharacteristic(deviceID,characteristic) {
	// 	console.log('Connect To Characteristic');
	// 	console.log(deviceID);
	// 	console.log(characteristic);
	// }

}