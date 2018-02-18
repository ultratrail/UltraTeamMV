export module DataStruct {

    /**
     * Class for user. 
     * To be moved to model/User
     *
     * @class      User (name)
     */
    export class User {

        constructor(
        private UID: number,
        private name: string,
        private location : [number, number],
        private smartphoneON: boolean,
        private ESPON : boolean,
        private SOS: boolean,
            ) { }
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
    }

    /**
     * Creates a `RadioAlertInput` from a `User`.
     *
     * @param      {<type>}  user    The user
     * @return     {<type>}  { The created RadioAlertInput }
     */
    export function userToRadioAlertInput(user: User): object{
        return {
            type: 'radio',
            label: user.getName(),
            value: user.getLocation(),
        }
    }

    /**
     * Fake users list. Used to test before other project's get functions are availables.
     * To be removed on project merge.
     */
    export const fakeUsersList: User[] = [
    new User(0,'Alice', [0, 0],true, true, true),
    new User(0,'Bob', [1, 1], undefined, undefined, undefined),
    new User(0,'Charlie', [-1, -1], undefined, undefined, undefined)
    ]
}



