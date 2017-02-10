//import React, { Component } from 'react';



export default class database {
    constructor(props) {
       //initialise firebase here
        this.name="database";
		this.id="";
		this.type=null;
		this.data={};
		
		if(props instanceof Object){
			this.id=props.id?props.id:null;
			this.data=props;
		}
    }
   getID(){
	   return this.id;
   }
   getType(){
	   return this.type;
   }
   getInfo(){
	   return {id:this.id,type:this.type}
   }
    create(){
		alert(this.getInfo())
		//return new this;
    }
	
    destroy(){
    delete this;
    }
}