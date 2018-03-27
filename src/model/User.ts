import { Device } from '@ionic-native/device';
import { Location } from './Location'
import { LocationList } from './LocationList'

export class User {

  private locations: LocationList;

  constructor(
    private UID: number,
    private name: string, 
    lat: number,
    lon: number,
    date : Date, 
    private espON : boolean, 
    private sos: boolean) {
    // this.UID = new Device().uuid;
    this.locations = new LocationList(new Location(lat, lon, date));
  }
  
  public getUID():number{
    return this.UID;
  }

  /**
  * Gets the user's name.
  *
  * @return     {<type>}  The user's name.
  */
  public getName(){
    return this.name ;
  }

  /**
  * Gets the user's location.
  *
  * @return     {<type>}  The user's location.
  */
  public getLatestLocation():Location{
    return this.locations.getLatestLocation() ;
  }

  /**
   * Returns the latest known cooridnates of the User.
   *
   * @return     {<type>}  The latest coordinates.
   */
  public getLatestCoord():[number, number]{
    return this.locations.getLatestLocation().getCoord();
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