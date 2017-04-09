
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
//SQLite.enablePromise(true);


const database_name = "esoko.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;

let instance=null;

 class DBwrapper {

    constructor(){
     instance=this;
    // this.openDatabase()
    }


     errorCB(err) {
         console.log("error: ",err);
         console.log("Error: "+ (err.message || err));

         return false;
     }
     successCB() {
         console.log("SQL executed ...");
     }
     openCB() {
         console.log("Database OPEN");

     }
     closeCB() {
         console.log("Database CLOSED");

     }
     deleteCB() {
         console.log("Database DELETED");
         console.log("Database DELETED");

     }
     populateDatabase(db){
         let that = this;
         console.log("Database integrity check");

         db.executeSql('SELECT 1 FROM Version LIMIT 1', [],
             function () {
                 console.log("Database is ready ... executing query ...");

                 // db.transaction((tx)=>{
                 that.searchProducts("debugging","electronics").then(that.getAllProductsSuccess).catch((e)=>{
                     console.error(e.message)
                 })
                 //}
             },
             function (error) {
                 console.log("received version error:", error);
                 console.log("Database not yet ready ... populating data");

                 db.transaction(that.populateDB, that.errorCB, function () {
                     console.log("Database populated ... executing query ...");

                     db.transaction(()=>{

                         that.getAllProducts().then(that.getAllProductsSuccess).catch((e)=>{
                             console.error(e.message)
                         })


                     },that.errorCB, function () {
                         console.log("Transaction is now finished");
                         console.log("Processing completed");

                         //that.closeDatabase();
                     });
                 });
             });
     }
     populateDB(tx) {
         console.log("Executing DROP stmts");

         tx.executeSql('DROP TABLE IF EXISTS Products;');
         tx.executeSql('DROP TABLE IF EXISTS Orders;');
         tx.executeSql('DROP TABLE IF EXISTS Messages;');


         console.log("Executing CREATE stmts");


         tx.executeSql('CREATE TABLE IF NOT EXISTS Version( '
             + 'version_id INTEGER PRIMARY KEY NOT NULL); ', [], this.successCB, this.errorCB)

         tx.executeSql('CREATE VIRTUAL TABLE IF NOT EXISTS Products USING fts4( '
             + 'productID VARCHAR(30) PRIMARY KEY NOT NULL, '
             + 'title VARCHAR(80) NOT NULL,' +
             'currency VARCHAR(5) NOT NULL,' +
             'sellerID VARCHAR(30) NOT NULL,' +
             'price INTEGER NOT NULL,' +
             'postedOn TIMESTAMP NOT NULL,' +
             'description VARCHAR(250),' +
             'category VARCHAR(30),' +
             'photos BLOB); ', [], this.successCB, this.errorCB)

         tx.executeSql(
             'CREATE TABLE IF NOT EXISTS Orders( '
             + 'orderID VARCHAR(30) PRIMARY KEY NOT NULL, '
             + 'productID VARCHAR(30) NOT NULL, '
             + 'price INTEGER NOT NULL, '
             + 'bidPrice INTEGER NOT NULL, '
             + 'sellerId VARCHAR(30) NOT NULL, '
             + 'buyerID VARCHAR(30) NOT NULL) ; ', [], this.successCB, this.errorCB)

         tx.executeSql(
             'CREATE TABLE IF NOT EXISTS Messages( '
             + 'messageID VARCHAR(30) PRIMARY KEY NOT NULL, '
             + 'chatID VARCHAR(30) NOT NULL, '
             + 'userID VARCHAR(30) NOT NULL, '
             + 'productID VARCHAR(30),'
             + 'message VARCHAR(250) NOT NULL, '
             + 'FOREIGN KEY ( productID ) REFERENCES Products ( productID ));'
             , [], this.successCB, this.errorCB)



         let products=[];
         let that=this;
         for(let i=0,n=5;i<n;i++){
             let UID=Math.ceil(Math.random()*100000);
             products.push({
                 productID:UID,
                 title:"title",
                 description:"React testJS code runs inside this Chrome tab.Press CtrlJ to open Developer Tools. Enable Pause On Caught Exceptions for a better debugging experience.Status: Debugger session",
                 price:900000,
                 sellerID:"xxxxx",
                 category:"electronics",
                 postedOn:new Date().getTime(),
                 currency:"TZS",
                 photos:[
                     {name:"one",
                         url:IMAGES[Math.ceil(Math.random()*10)],
                         type:"jpg"},
                     {name:"two",
                         url:IMAGES[Math.ceil(Math.random()*10)],
                         type:"jpg"},
                     {name:"three",
                         url:IMAGES[Math.ceil(Math.random()*10)],
                         type:"jpg"},
                     {name:"four",
                         url:IMAGES[Math.ceil(Math.random()*10)],
                         type:"jpg"},
                     {name:"five",
                         url:IMAGES[Math.ceil(Math.random()*10)],
                         type:"jpg"}
                 ]

             })
         }

         products.forEach((item,i)=>{

             that.addProduct(item).then((res,r)=>{
                 console.log("item added"+i+" ")
             })
         })



         console.log("all config SQL done");
     }
     loadAndQueryDB(){
         console.log("Opening database ...");

         db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
         this.populateDatabase(db);
     }
     deleteDatabase(){
         console.log("Deleting database");

         SQLite.deleteDatabase(database_name, this.deleteCB, this.errorCB);
     }
     closeDatabase(){
         let that = this;
         if (db) {
             console.log("Closing database ...");
             console.log("Closing database");

             db.close(that.closeCB,that.errorCB);
         } else {
             console.log("Database was not OPENED");

         }
     }
     getAllProducts() {

         console.log("getAllProducts sql...");
         let that=this;
         return new Promise((resolve, reject) => {
             db.transaction((tx) => {

                 tx.executeSql('SELECT * FROM Products ORDER BY postedOn DESC', [],(tx,results)=>{
                     //that.getAllProductsSuccess(tx,results)

                     let len = results.rows.length;
                     let products=[];
                     for (let i = 0; i < len; i++) {
                         products.push(results.rows.item(i));

                     }
                     resolve(products)
                 },reject);

             }, (error)=>{
                 reject(error)
             }, (res)=>{

                 console.log("Processing completed");

             });
         })
     }
     getAllProductsSuccess(results) {
         console.log("results\n"+JSON.stringify(results))
         console.log("Query completed");

         let len = results.length;
         for (let i = 0; i < len; i++) {
             let row = results[i];
             console.log(row);
         }

     }
     query(sql){
         let that =this;
         return new Promise((resolve, reject) => {
             console.log("Database query ... executing  ...");

             db.transaction((tx) => {
                 tx.executeSql(sql, [], resolve, reject)
             }, reject, that.successCB);
         })
     }

     //PRODUCT METHODS
     addProduct(product){
         let that =this;
         return new Promise((resolve,reject)=>{
             db.transaction((tx)=>{

                 tx.executeSql('INSERT INTO Products (productID,title,currency,sellerID,price,postedOn,description,category,photos ) VALUES (?,?,?,?,?,?,?,?,?)',
                     [
                         product.productID,
                         product.title,
                         product.currency,
                         product.sellerID ,
                         product.price ,
                         product.postedOn ,
                         product.description ,
                         product.category,
                         JSON.stringify(product.photos)],resolve, reject)





             }, reject,that.successCB)
         })
     }
     deleteProduct(id){
         let that =this;
         return new Promise((resolve,reject)=>{
             db.transaction((tx)=>{

                 tx.executeSql('DELETE FROM Products WHERE productID=(?)',
                     [id],resolve, reject)





             }, reject,that.successCB)
         })
     }
     searchProducts(keyword="*" ,category="*"){
         let that = this;
         return new Promise((resolve, reject) => {

             db.transaction((tx) => {

                 tx.executeSql(' SELECT * FROM Products WHERE Products MATCH (?) AND category=(?) ORDER BY postedOn DESC', [keyword,category], (tx,results)=>{
                     let len = results.rows.length;
                     let res=[];
                     for (let i = 0; i < len; i++) {
                         res.push(results.rows.item(i));

                     }
                     resolve(res)
                 }, reject)

             }, reject, that.successCB)
         })
     }
     updateProduct(product){

         let that =this;
         return new Promise((resolve,reject)=>{
             db.transaction((tx)=>{

                 tx.executeSql('UPDATE Products SET title=(?),currency=(?),price=(?),postedOn=(?),description=(?),category=(?),photos=(?)'+
                     ' WHERE productID=(?) AND sellerID=(?)',
                     [   product.title,
                         product.currency,
                         product.price ,
                         product.postedOn ,
                         product.description ,
                         product.category,
                         JSON.stringify(product.photos),
                         product.productID,
                         product.sellerID
                     ],resolve, reject)





             }, reject,that.successCB)
         })
     }


}

export const DB =new DBwrapper