/**
 * Created by ebundala on 2/6/2017.
 */
import React from 'react';
import Database from './database';

export default class Chat extends Database {
    constructor(props) {
        super(props);
        setTimeout(function(){
            this.create("Chat");
        }.bind(this),5000)

    }
}