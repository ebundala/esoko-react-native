/**
 * Created by ebundala on 2/6/2017.
 */
//import React from 'react';
import Database from './database';

export default class Review extends Database {
    constructor(props) {
        super(props);
          this.name="Reviews";
        if(props instanceof Object)
		{
			this.sellerID=props.email?props.email:null;
			this.userID=props.userID?props.userID:null;
			this.productID=props.productID?props.productID:null;
		}

    }
	getReview(){}
	editReview(){}
	deleteReview(){}
}