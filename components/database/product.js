/**
 * Created by ebundala on 2/6/2017.
 */
import React from 'react';
import Database from './database';
export default class Product extends Database {
    constructor(props) {
        super(props);
        setTimeout(function(){
            this.create("Product");
        }.bind(this),5000)

    }

}