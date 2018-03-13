import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

export class User {

  private UID: string;
  private device: Device;

  constructor(
    private name: string, 
    private location : [number, number], 
    private smartphoneON: boolean, 
    private espON : boolean, 
    private sos: boolean) {
    this.device = new Device();
    this.UID = this.device.uuid;
  }
  
  /**
  * Gets the user's name.
  *
  * @return     {<type>}  The user's name.
  */
  getName(){
    return this.name ;
  }

  /**
  * Gets the user's location.
  *
  * @return     {<type>}  The user's location.
  */
  getLocation(){
    return this.location ;
  }

  /**
  * Creates a `RadioAlertInput` from a current `User`.
  *
  * @return     {<type>}  { The created RadioAlertInput }
  */
  userToRadioAlertInput(): object{
    return {
      type: 'radio',
      label: this.getName(),
      value: this,
    }
  }

}