import { Alert } from 'ionic-angular';

export module DataStruct {

    export class User {

        constructor(
        private UID: number,
        private name: string,
        private location : [number, number],
        private smartphoneON: boolean,
        private ESPON : boolean,
        private SOS: boolean,
            ) { }

        getName(){
            return this.name ;
        }
        getLocation(){
            return this.location ;
        }
    }

    export function userToRadioAlertInput(user: User): object{
        return {
            type: 'radio',
            label: user.getName(),
            value: user.getLocation(),
        }
    }

    export const fakeUsersList: User[] = [
    new User(0,'Alice', [0, 0],true, true, true),
    new User(0,'Bob', [1, 1], undefined, undefined, undefined),
    new User(0,'Charlie', [-1, -1], undefined, undefined, undefined)
    ]
}



