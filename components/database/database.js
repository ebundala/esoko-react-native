import * as firebase from 'firebase';


// Initialize Firebase
  const config = {
    apiKey: "AIzaSyDNve8wgqo9-hnmLoZc_Y_C8ppsaVkyNuI",
    authDomain: "esoko-fc718.firebaseapp.com",
    databaseURL: "https://esoko-fc718.firebaseio.com",
    storageBucket: "esoko-fc718.appspot.com",
    messagingSenderId: "1071434923103"
  };
 const appRef = firebase.initializeApp(config);

export default class database {
    constructor(props) {
       //initialise firebase here
        this.name="database";
		this.app=appRef;
		this.database=this.app.database().ref();
		this.storage=this.app.storage().ref();
		this.Auth=this.app.auth();
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
		let path=this.database.child("/"+this.name);
        let id=	path.push().key;
		alert(id)
		this.data.id=id;
		path.child("/"+id).set(this.data).then((snap)=>{
			
			alert(snap.val().id)
		}).catch((e)=>{
			alert("error "+e.message)
		})
		//return new this;
    }
	
    destroy(){
    delete this;
    }
}