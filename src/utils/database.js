
import Firestack from 'react-native-firestack'

// Initialize Firebase
 /*  const config = {
    apiKey: "AIzaSyDNve8wgqo9-hnmLoZc_Y_C8ppsaVkyNuI",
    authDomain: "esoko-fc718.firebaseapp.com",
    databaseURL: "https://esoko-fc718.firebaseio.com",
    storageBucket: "esoko-fc718.appspot.com",
    messagingSenderId: "1071434923103"
  }; */

export default class database extends Firestack {
	
    constructor(props) {
		super();
       //initialise firebase here
        const NAME="databases";
		//this.app=firestack;
		//this.database=firestack.database;
		//this.storage=firestack.storage;
		//this.Auth=firestack.auth;
		this.id="";
		this.type=null;
		this.data={};
        this.debug=true;
		if(props instanceof Object){
			this.id=props.id?props.id:null;
			this.data=props;
		}
    }
   getID(){
	   return this.id;
   }
    log(message){
        if(this.debug&&message){
            console.log(JSON.stringify(message))
        }
    }
   getData(){
	   return this.data;
   }
   setData(data){
	   this.data=data;
   }
   getInfo(){
	   return {id:this.id,type:this.type}
   }
    create(){

        this.database.ref(this.name).push().then((res) => {
 let newPostKey = res.key;
 
  this.ServerValue.then(map => {
	  this.log(map);
   const postData = {
     type: this.name,
     timestamp: map.TIMESTAMP,
     id: newPostKey,
	 data:this.data
    }
    let updates = {}
    updates['/'+this.name+'/' + newPostKey] = postData
    this.database.ref().update(updates).then(() => {
        this.log("posted "+this.name);
	
	}).catch(() => {
		alert("error "+ctx.name)
      
    })
	
  }) 
  
  
  
}) 
   

   }
	
	
    destroy(){
    delete this;
    }
}











import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);


const database_name = "esoko.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;
let db;


export class DB {

    constructor(){

     this.loadAndQueryDB()
    }


    errorCB(err) {
        console.log("error: ",err);

    }

    populateDatabase(db){
        let that = this;


        db.executeSql('SELECT 1 FROM Version LIMIT 1').then(() =>{

alert("db good")
        }).catch((error) =>{
            console.log("Received error: ", error)


        });
    }

    populateDB(tx) {
        var that = this;

        tx.executeSql('DROP TABLE IF EXISTS Products;');
        tx.executeSql('DROP TABLE IF EXISTS Orders;');
        tx.executeSql('DROP TABLE IF EXISTS Messages;');



        tx.executeSql('CREATE TABLE IF NOT EXISTS Version( '
            + 'version_id INTEGER PRIMARY KEY NOT NULL); ').catch((error) => {
            that.errorCB(error)
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS Products( '
            + 'productID VARCHAR(30) PRIMARY KEY NOT NULL, '
            + 'title VARCHAR(80) NOT NULL,' +
            'currency VARCHAR(5) NOT NULL,' +
            'sellerID VARCHAR(30) NOT NULL,' +
            'price INTEGER NOT NULL,' +
            'postedOn TIMESTAMP NOT NULL,' +
            'description VARCHAR(250),' +
            'catergory VARCHAR(30)); ').catch((error) => {
            that.errorCB(error)
        });

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Orders( '
            + 'orderID VARCHAR(30) PRIMARY KEY NOT NULL, '
            + 'productID VARCHAR(30) NOT NULL, '
            + 'price INTEGER NOT NULL, '
            + 'bidPrice INTEGER NOT NULL, '
            + 'sellerId VARCHAR(30) NOT NULL, '
            + 'buyerID VARCHAR(30) NOT NULL) ; ').catch((error) => {
            that.errorCB(error)
        });

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Messages( '
            + 'messageID VARCHAR(30) PRIMARY KEY NOT NULL, '
            + 'chatID VARCHAR(30) NOT NULL, '
            + 'userID VARCHAR(30) NOT NULL, '
            + 'message VARCHAR(250) NOT NULL, '
            + 'FOREIGN KEY ( productID ) REFERENCES Products ( productID ));'
        ).catch((error) => {
            that.errorCB(error)
        });




        /*tx.executeSql('INSERT INTO Departments (name) VALUES ("Client Services");');
        tx.executeSql('INSERT INTO Departments (name) VALUES ("Investor Services");');
        tx.executeSql('INSERT INTO Departments (name) VALUES ("Shipping");');
        tx.executeSql('INSERT INTO Departments (name) VALUES ("Direct Sales");');

        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Denver", 59.8,  34.1);');
        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Warsaw", 15.7, 54.1);');
        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Berlin", 35.3, 12.1);');
        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Paris", 10.7, 14.1);');

        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Sylvester Stallone", 2,  4);');
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Elvis Presley", 2, 4);');
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Leslie Nelson", 3,  4);');
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Fidel Castro", 3, 3);');
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Bill Clinton", 1, 3);');
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Margaret Thatcher", 1, 3);');
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Donald Trump", 1, 3);');
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Dr DRE", 2, 2);');
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Samantha Fox", 2, 1);');*/
        console.log("all config SQL done");
    }



    loadAndQueryDB(){
        let that = this;

        SQLite.echoTest().then(() => {

            SQLite.openDatabase({name : database_name, createFromLocation : "default"}).then((DB) => {
               db = DB;

                that.populateDatabase(DB);
            }).catch((error) => {
                console.log(error);
            });
        }).catch(error => {
            console.log("echoTest failed - plugin not functional");

        });
    }

    closeDatabase(){
        let that = this;
        if (db) {
            console.log("Closing database ...");

            db.close().then((status) => {

            }).catch((error) => {
                that.errorCB(error);
            });
        } else {

        }
    }

    deleteDatabase(){
        let that = this;

        SQLite.deleteDatabase(database_name).then(() => {
            console.log("Database DELETED");

        }).catch((error) => {
            that.errorCB(error);
        });
    }
    transaction(transactions){
       return db.transaction(transactions)

    }
    query(sql){
     return   db.transaction((tx)=>{
           return tx.executeSql(sql)
        })
    }




}

