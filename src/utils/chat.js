/**
 * Created by ebundala on 2/6/2017.
 */

import Database from './database';

export default class Chat extends Database {
    constructor(props) {
        super(props);
        this.name="Chats";
         if(props instanceof Object)
		{
			//this.sellerID=props.email?props.email:null;
			//this.userID=props.userID?props.userID:null;
			//this.productID=props.productID?props.productID:null;
		}

    }
}