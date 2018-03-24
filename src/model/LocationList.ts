import { Location } from './Location'

export class LocationList {
    
    private latestLocation: Location;
    private locations: Location[];


    constructor(
        location: Location
        ){
        this.latestLocation = location ;
        this.locations = [location];
    }

    /**
     * Adds a location to the list.
     *
     * @param      {<type>}  loc     The location to add to the list
     */
    public add(loc: Location):void{
        if(loc.getDate() > this.latestLocation.getDate()){
            this.latestLocation = loc ;
        }
        this.locations.push(loc);
    }

    /**
     * Returns the most recent location in the list.
     *
     * @return     {<type>}  The latest location.
     */
    public getLatestLocation():Location{
        return this.latestLocation;
    }

    /**
     * Returns an array composed of all locations in the list. 
     *
     * @return     {<type>}  The location list.
     */
    public getLocationList():Location[]{
        return this.locations;
    }
}