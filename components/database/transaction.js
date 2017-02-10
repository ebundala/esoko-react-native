/**
 * Created by ebundala on 2/6/2017.
 */
//import React from 'react';
import Database from './database';

export default class Transaction extends Database {
    constructor(props) {
        super(props);
       this.name="Transaction";
        if(props instanceof Object)
		{
			this.sellerID=props.email?props.email:null;
			this.userID=props.userID?props.userID:null;
			this.productID=props.productID?props.productID:null;
			this.orderID=props.orderID?props.orderID:null;
		}
       

    }
	isSuccess(){}
	notifyBuyer(){}
	notifySeller(){}
	changeProductQuantity(){}
	setOrderState(){}
}