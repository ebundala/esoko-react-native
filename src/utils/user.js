/**
 * Created by ebundala on 2/6/2017.
 */

import Database from './database';


export default class User extends Database {

    constructor(props) {
        super(props);
        this.name="users";
		/* if(props instanceof Object)
		{
			this.id=props.id?props.id:null;
			this.email=props.email?props.email:null;
			this.phone=props.phone?props.phone:null;
			this.shippingAddress=props.shippingAddress?props.shippingAddress:null;
		} */	
		

this.auth.listenForAuth((evt)=> {
  // evt is the authentication event
  // it contains an `error` key for carrying the
  // error message in case of an error
  // and a `user` key upon successful authentication
  if (!evt.authenticated) {
    // There was an error or there is no user
    console.log("error"+JSON.stringify(evt))
  } else {
    // evt.user contains the user details
    alert('User details\n', JSON.stringify(evt.user));
  }
})
.then(() => {
	alert('Listening for authentication changes')})

    }
	 create(email,password){
		
		
  	return this.auth.createUserWithEmail(email, password)
		

	} 
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
