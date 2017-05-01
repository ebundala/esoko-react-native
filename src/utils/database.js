
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









import {IMAGES} from "../products/products.actions"

import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);


const database_name = "esoko.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;

let instance=null;

export class DBwrapper{

    constructor(){
      //super()
        instance=this;
        try {
            this.openDatabase();
        }catch (e){
            console.error(e.message)
        }

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
         this.populateDatabase();
     }
     closeCB() {
         console.log("Database CLOSED");

     }
     deleteCB() {
         console.log("Database DELETED");


     }
     populateDatabase(){
         let that = this;
         console.log("Database integrity check");

         that.db.executeSql('SELECT 1 FROM Version LIMIT 1', [],
             function () {
                 console.log("Database is ready ... executing query ...");


                 /*that.searchProducts("debugging","electronics").then(that.getAllProductsSuccess).catch((e)=>{
                     console.error(e.message)
                 })*/

             },
             function (error) {
                 console.log("received version error:", error);
                 console.log("Database not yet ready ... populating data");
                 that.populateDB();

             });
     }
     populateDB() {
         let that=this;
         this.db.transaction((tx)=>{
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



        // let products=[];
        //


          let category=   [
             "electronics",
                 "Furniture",
                 "Women's Apparel",
                 "Women's shoes",
                 "Men's shoes",
                 "Men's Apparel",
                 "Men's Watches",
                 "Women's Watches",
                 "Back Packs",
                 "Books",
                 "Automotive",
                 "Computers",
                 "Mobile Phones",
                 "Accessories",
                 "Jewelry",
                 "electronics",
                 "Furniture",
                 "Women's Apparel",
                 "Women's shoes",
                 "Men's shoes",
                 "Men's Apparel",
                 "Men's Watches",
                 "Women's Watches",
                 "Back Packs",
                 "Books",
                 "Automotive",
                 "Computers",
                 "Mobile Phones",
                 "Accessories",
                 "Jewelry",

                 "electronics",
                 "Furniture",
                 "Women's Apparel",
                 "Women's shoes",
                 "Men's shoes",
                 "Men's Apparel",
                 "Men's Watches",
                 "Women's Watches",
                 "Back Packs",
                 "Books",
                 "Automotive",
                 "Computers",
                 "Mobile Phones",
                 "Accessories",
                 "Jewelry",
                 "electronics",
                 "Furniture",
                 "Women's Apparel",
                 "Women's shoes",
                 "Men's shoes",
                 "Men's Apparel",
                 "Men's Watches",
                 "Women's Watches",
                 "Back Packs",
                 "Books",
                 "Automotive",
                 "Computers",
                 "Mobile Phones",
                 "Accessories",
                 "Jewelry",
             ];
         let catLen=category.length;


         for(let i=0,n=5;i<n;i++) {
             let UID = Math.ceil(Math.random() * 100000);
             let cat =category[Math.floor(Math.random()*catLen)]


             that.addProduct({
                 productID: UID,
                 title: cat+" "+i,
                 description: "React testJS code runs inside this Chrome tab.Press CtrlJ to open Developer Tools. Enable Pause On Caught Exceptions for a better debugging experience.Status: Debugger session",
                 price: UID,
                 sellerID: "xxxxx",
                 category: cat,
                 postedOn: new Date().getTime()/Math.ceil(Math.random() * 10),
                 currency: "TZS",
                 photos: [
                     {
                         name: "one",
                         url: IMAGES[Math.ceil(Math.random() * 10)],
                         type: "jpg"
                     },
                     {
                         name: "two",
                         url: IMAGES[Math.ceil(Math.random() * 10)],
                         type: "jpg"
                     },
                     {
                         name: "three",
                         url: IMAGES[Math.ceil(Math.random() * 10)],
                         type: "jpg"
                     },
                     {
                         name: "four",
                         url: IMAGES[Math.ceil(Math.random() * 10)],
                         type: "jpg"
                     },
                     {
                         name: "five",
                         url: IMAGES[Math.ceil(Math.random() * 10)],
                         type: "jpg"
                     }
                 ]

             }).then((res) => {
                 console.log("item added" + i + " ")
             })
         }

         }, that.errorCB, function () {
             console.log("Database populated ... executing query ...");

             /*that.db.transaction(()=>{

                 that.getAllProducts().then(that.getAllProductsSuccess).catch((e)=>{
                     console.error(e.message)
                 })


             },that.errorCB, function () {
                 console.log("Transaction is now finished");
                 console.log("Processing completed");

                // that.closeDatabase();
             });*/
         });



         console.log("all config SQL done");
     }
     openDatabase(){
         console.log("Opening database ...");

         this.db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB.bind(this), this.errorCB);

     }
     deleteDatabase(){
         console.log("Deleting database");

         SQLite.deleteDatabase(database_name, this.deleteCB, this.errorCB);
     }
     closeDatabase(){
         let that = this;
         if (this.db) {
             console.log("Closing database ...");

             this.db.close(that.closeCB,that.errorCB);
         } else {
             console.log("Database was not OPENED");

         }
     }
     getProducts(category=null) {

         console.log("getAllProducts sql...");
         let that=this;

         if(category){
             return new Promise((resolve, reject) => {

                 that.db.transaction((tx) => {

                     tx.executeSql(' SELECT * FROM Products WHERE category=(?) ORDER BY postedOn DESC', [category],(tx,res)=>{
                         return that.formatResults(tx,res,resolve)}, (res)=>{reject(res)})

                 }, (res)=>{reject(res)}, that.successCB)
             })
         }




         return new Promise((resolve, reject) => {
             that.db.transaction((tx) => {

                 tx.executeSql('SELECT * FROM Products ORDER BY postedOn DESC', [],(tx,res)=>{
                     return that.formatResults(tx,res,resolve)},(res)=>{reject(res)});

             }, (error)=>{
                 reject(error)
             }, (res)=>{
                 //that.closeDatabase();
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

             that.db.transaction((tx) => {
                 tx.executeSql(sql, [], (res)=>{resolve(res)}, (res)=>{reject(res)})
             }, (res)=>{reject(res)}, that.successCB);
         })
     }

     //PRODUCT METHODS
     addProduct(product){
         let that =this;
         return new Promise((resolve,reject)=>{
             that.db.transaction((tx)=>{

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
                         JSON.stringify(product.photos)],(res)=>{resolve(res)}, (res)=>{reject(res)})





             }, (res)=>{reject(res)},that.successCB)
         })
     }
     deleteProduct(id){
         let that =this;
         return new Promise((resolve,reject)=>{
             that.db.transaction((tx)=>{

                 tx.executeSql('DELETE FROM Products WHERE productID=(?)',
                     [id],(res)=>{resolve(res)}, (res)=>{reject(res)})





             }, (res)=>{reject(res)},that.successCB)
         })
     }
     searchProducts(keyword ,category){
         let that = this;

         return new Promise((resolve, reject) => {

             that.db.transaction((tx) => {
                 if (category === "all")
                 {

                     tx.executeSql('SELECT * FROM Products WHERE Products MATCH (?) ORDER BY postedOn DESC', [keyword], (tx, res) => {
                         return that.formatResults(tx, res, resolve)
                     }, (res) => {
                         reject(res)
                     })

                 }
                 else {
                     tx.executeSql('SELECT * FROM Products WHERE Products MATCH (?) AND category=(?) ORDER BY postedOn DESC', [keyword, category], (tx, res) => {
                         return that.formatResults(tx, res, resolve)
                     }, (res) => {
                         reject(res)
                     })
                 }
             }, (res)=>{reject(res)}, that.successCB)
         })
     }
     updateProduct(product){

         let that =this;
         return new Promise((resolve,reject)=>{
            that.db.transaction((tx)=>{

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
                     ],(res)=>{resolve(res)}, (res)=>{reject(res)})





             }, (res)=>{reject(res)},that.successCB)
         })
     }
     formatResults(tx,results,resolve){

             //that.getAllProductsSuccess(tx,results)

             let len = results.rows.length;
             let products=[];
             for (let i = 0; i < len; i++) {
                 let row=results.rows.item(i);
                 row.photos=JSON.parse(row.photos)
                 products.push(row);
                 //console.log(JSON.parse(products[i].photos)[0].url)

             }
             resolve(products)

     }


}

export const DB = new DBwrapper();