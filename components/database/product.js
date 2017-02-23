/**
 * Created by ebundala on 2/6/2017.
 */
//import React from 'react';
import Database from './database';
export default class Product extends Database {
    constructor(props) {
        super(props);
        this.name="Products";
           
		if(props instanceof Object)
		{
			this.sellerID=props.email?props.email:null;
			this.quantity=props.quantity?props.quantity:null;
			this.sku=props.sku?props.sku:null;
			this.price=props.price?props.price:null;
		}
		     

    }
	getSKU(){}
	getPrice(){}
	setQuantity(){}
	getProductInfo(){}
	deleteProduct(){}
	postProduct(){}
}