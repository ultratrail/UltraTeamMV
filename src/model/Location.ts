export class Location {

    private coord : [number, number];
    private date : Date;
    
    /**
     * Builds the location. If no date argument is passed, current date will be used
     */
    constructor(lat: number, lon: number, date?: Date){
        this.coord = [lat, lon];
        if(!date){
            this.date = new Date();
        }
        else{
            this.date = date
        }
    }

    /**
     * Returns the coordinates of the location
     *
     * @return     {<type>}  The coordinate of the location.
     */
    public getCoord():[number, number]{
        return this.coord;
    }

    /**
     * Returns the date of the location 
     *
     * @return     {<type>}  The date.
     */
    public getDate():Date{
        return this.date;
    }

}