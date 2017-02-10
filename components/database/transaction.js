/**
 * Created by ebundala on 2/6/2017.
 */
import React from 'react';
import Database from './database';

export default class Transaction extends Database {
    constructor(props) {
        super(props);
        setTimeout(function(){
            this.create("Transaction");
        }.bind(this),5000)

    }
}