/**
 * Created by ebundala on 2/6/2017.
 */
import React from 'react';
import Database from './database';


export default class User extends Database {

    constructor(props) {
        super(props);
        setTimeout(function(){
            this.create("user");
        }.bind(this),5000)

    }
}
