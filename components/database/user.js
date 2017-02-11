/**
 * Created by ebundala on 2/6/2017.
 */

import Database from './database';


export default class User extends Database {

    constructor(props) {
        super(props);
        this.name="user";
		if(props instanceof Object)
		{
			this.id=props.id?props.id:null;
			this.email=props.email?props.email:null;
			this.phone=props.phone?props.phone:null;
			this.shippingAddress=props.shippingAddress?props.shippingAddress:null;
		}

    }
	/* create(){
		alert(this.app)
		
	} */
	listProduct(){}
	placeBid(){}
	pay(){}
	reviewProduct(){}
	chat(){}
	buy(){}
	getAddress(){}
	getShipping(){
		return this.shippingAddress;
	}
	getPhone(){
		return this.phone;
	}
	login(){
		return "user login logic here"
	}
	logout(){
		
	}
	
}
