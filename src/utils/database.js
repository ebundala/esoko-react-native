
import Firestack from 'react-native-firestack'

// Initialize Firebase
 /*  const config = {
    apiKey: "AIzaSyDNve8wgqo9-hnmLoZc_Y_C8ppsaVkyNuI",
    authDomain: "esoko-fc718.firebaseapp.com",
    databaseURL: "https://esoko-fc718.firebaseio.com",
    storageBucket: "esoko-fc718.appspot.com",
    messagingSenderId: "1071434923103"
  }; */

/*export default class database extends Firestack {
	
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
}*/






let scheme={
    description: String,
    price: {
        value:Number,
        unit:String},
    size: {
        value:Number,
        unit:String
    },
    location: {
        region:  String,
        street:String,
        district: String,
        ward: String
    },
    legal: {
        surveyed: Boolean,
        planned:Boolean,
        titleDeed:Boolean},
    rating: {
        value: Number,
        count: Number
    },
    photos: Array,

    services: {
        water:Boolean,
        electricity:Boolean,
        roads:Boolean},
    seller: {
        name: String,
        phones: String,
        email: String,
        address: String
    },
    createdAt:Date,
    editedAt:Date,
    expireAt:Date,
    sold:Boolean}


import {IMAGES} from "../products/products.actions"
import {initialState } from "../navigationView/categories.actions"
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);


const database_name = "esoko.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;

let instance=null;
const firestack=new Firestack();
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


                 /*that.db.executeSql('SELECT productID FROM Products ORDER BY timestamp DESC LIMIT 1', [],(res)=>{


                     that.attachDbListerners(res);

                    /!*if(res.rows.length) {
                        let productID=res.rows.item(0).productID;
                        console.log("last product ",productID);
                        firestack.database.ref('products').orderByKey().startAt(productID).on('child_added', (snapshot) => {

                            const val = snapshot.val();
                            //console.log("products from firebase ",val);
                            if(productID!=val.productID)
                            that.addProduct(val)
                        })
                    }
                    else{
                        firestack.database.ref('products').orderByKey().on('child_added', (snapshot) => {

                            const val = snapshot.val();
                            //console.log("products from firebase ",val);
                            that.addProduct(val)
                        })
                    }*!/

                 },(e)=>{

                     console.log(e)
                 });*/


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
             + 'version_id INTEGER PRIMARY KEY NOT NULL); ', [], this.successCB, this.errorCB);

        /* tx.executeSql('CREATE VIRTUAL TABLE IF NOT EXISTS Products USING fts4( '+
             'acceptedPaymentMethod VARCHAR(32) NOT NULL,'+
             'areaServed VARCHAR(32),'+
             'availability VARCHAR(32) NOT NULL,'+
             'availableDeliveryMethod VARCHAR(32) NOT NULL,'+
             'brand VARCHAR(32) ,'+
             'category VARCHAR(32) NOT NULL,'+
             'currency VARCHAR(32) NOT NULL,'+
             ' description VARCHAR(160),'+
             'itemCondition VARCHAR(32) NOT NULL,'+
             'manufacturer VARCHAR(32) ,'+
             'model VARCHAR(32) ,'+
             'name VARCHAR(32) NOT NULL,'+
             ' photos BLOB ,'+
             'price INTEGER NOT NULL,'+
             'productID PRIMARY VARCHAR(32) NOT NULL,'+
             'quantity INTEGER NOT NULL,'+
             'timestamp INTEGER NOT NULL,'+
             'userID VARCHAR(32) NOT NULL,'+
             'userName VARCHAR(32) NOT NULL,'+
             'warranty VARCHAR(80) ,); ', [], this.successCB, this.errorCB)*/


             tx.executeSql('CREATE VIRTUAL TABLE IF NOT EXISTS Products USING fts4( '+
                 'authorID VARCHAR(32) NOT NULL,'+
                 'title VARCHAR(60) NOT NULL,'+
                 'description VARCHAR(160) NOT NULL,'+
                 'productID PRIMARY VARCHAR(32) NOT NULL,'+
                 'price_value INTEGER,' +
                 'price_unit VARCHAR(3),'+
                 'size_value INTEGER NOT NULL,' +
                 'size_unit VARCHAR(3),'+
                 'subCategory VARCHAR(32) NOT NULL,'+//region
                 'category VARCHAR(32) NOT NULL,'+//district
                 'street VARCHAR(32) NOT NULL,'+
                 'ward VARCHAR(32) NOT NULL,'+
                 'surveyed BOOLEAN,' +
                 'planned BOOLEAN,' +
                 'titleDeed BOOLEAN,'+
                 'rating_value INTEGER NOT NULL,' +
                 'rating_count INTEGER,'+
                 'photos BLOB ,'+
                 'seller BLOB,'+
                 'createdAt INTEGER NOT NULL,'+
                 'editedAt INTEGER NOT NULL,'+
                 'expireAt INTEGER NOT NULL,'+
                 'sold BOOLEAN ,); ', [], this.successCB, this.errorCB);









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


            let ph={
                 "data":"https://firebasestorage.googleapis.com/v0/b/nunua-ardhi.appspot.com/o/images%2FC3l3u9xsgphsDko4uq0JFlgsCSo1%2F-KcWgHvCwNd70oudwVVT%2FIMG-20170208-WA0029.jpg?alt=media&token=d9d65fdd-ef0e-4c11-bd0e-704787b58047",
                 "name" : "IMG-20170208-WA0029.jpg",
                 "type" : "image/jpeg"
             }

         let catLen=initialState.length;


         for(let i=0,n=0;i<n;i++) {
             let UID = Math.ceil(Math.random() * 100000);
             let cat =category[Math.floor(Math.random()*catLen)]
             that.addProduct({
                     ...scheme,
                 name :cat+" "+i,
                 //quantity :"",
                 description: "React testJS code runs inside this Chrome tab.Press CtrlJ to open Developer Tools. Enable Pause On Caught Exceptions for a better debugging experience.Status: Debugger session",

                 productID: UID,
                 price: UID,
                 l: cat.categoryName,
                 subCategory
                 //timestamp: new Date().getTime()/Math.ceil(Math.random() * 10),


             }).then((res) => {
                 console.log("item added" + i + " ")
             })
         }





         this.populateDatabase();

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
     attachDbListerners(res){
         if(res.rows?res.rows.length:false) {
             let productID=res.rows.item(0).productID;
             console.log("last product ",productID);
             firestack.database.ref('products').orderByKey().startAt(productID).on('child_added', (snapshot) => {

                 const val = snapshot.val();
                 //console.log("products from firebase ",val);
                 if(productID!=val.productID)
                     this.addProduct(val)
             })
         }
         else{
             firestack.database.ref('products').orderByKey().on('child_added', (snapshot) => {

                 const val = snapshot.val();
                 //console.log("products from firebase ",val);
                 this.addProduct(val)
             })
         }
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
     getProducts(category=null,subCategory=null) {

         console.log("getAllProducts sql...");
         let that=this;

         if(category){
             return new Promise((resolve, reject) => {

                 that.db.transaction((tx) => {

                     tx.executeSql(' SELECT * FROM Products WHERE category=(?) ORDER BY timestamp DESC', [category],(tx,res)=>{
                         return that.formatResults(tx,res,resolve)}, (res)=>{reject(res)})

                 }, (res)=>{reject(res)}, that.successCB)
             })
         }
         else if(subCategory){

             return new Promise((resolve, reject) => {

                 that.db.transaction((tx) => {

                     tx.executeSql(' SELECT * FROM Products WHERE category=(?) ORDER BY timestamp DESC', [subCategory],(tx,res)=>{
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
                 tx.executeSql('INSERT INTO Products ('+
                      'authorID,'+
                     'title,'+
                     'description,'+
                     'productID,'+
                     'price_value,' +
                     'price_unit,'+
                     'size_value,' +
                     'size_unit,'+
                     'subCategory,'+//region
                     'category,'+//district
                     'street,'+
                     'ward,'+
                     'surveyed' +
                     ',planned,' +
                     'titleDeed,'+
                     'rating_value ' +
                     ',rating_count,'+
                     'photos,'+
                     'seller,'+
                     'createdAt,'+
                     'editedAt,'+
                     'expireAt,'+
                     'sold ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                     [
                         product.authorID,
                         product.title,
                         product.description,
                         product.path,
                         product.price.value,
                         product.price.unit,
                         product.size.value,
                         product.size.unit,
                         product.location.region,
                         product.location.district,
                         product.location.street,
                         product.loacation.ward,
                         product.legal.surveyed,
                         product.legal.planned,
                         product.legal.titleDeed,
                         product.rating.value,
                         product.rating.count,
                         JSON.stringify(product.photos),
                         JSON.stringify(product.seller) ,
                        product.createdAt,
                         product.editedAt,
                         product.expireAt,
                         false
                     ],(res)=>{resolve(res)}, (res)=>{reject(res)})

                 /*tx.executeSql('INSERT INTO Products (' +
                     'acceptedPaymentMethod ,'+
                     'areaServed,'+
                     'availability,'+
                     'availableDeliveryMethod,'+
                     'brand,'+
                     'category,'+
                     'currency,'+
                    ' description,'+
                     'itemCondition,'+
                     'manufacturer,'+
                     'model,'+
                     'name,'+
                     'price,'+
                     'productID,'+
                     'quantity,'+
                     'timestamp,'+
                     'userID,'+
                     'userName,'+
                     'warranty,' +
                     'photos ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                     [
                         JSON.stringify(product.acceptedPaymentMethod) ,
                         JSON.stringify(product.areaServed),
                         product.availability,
                         JSON.stringify(product.availableDeliveryMethod),
                         product.brand,
                         product.category,
                         product.currency,
                         product.description,
                         product.itemCondition,
                         product.manufacturer,
                         product.model,
                         product.name,
                         product.price,
                         product.productID,
                         product.quantity,
                         product.timestamp,
                         product.userID,
                         product.userName,
                         product.warranty,
                         JSON.stringify(product.photos)
                     ],(res)=>{resolve(res)}, (res)=>{reject(res)})*/





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
//Todo split keywords and build a query to include each word in a search
                     tx.executeSql('SELECT * FROM Products WHERE Products MATCH (?) ORDER BY timestamp DESC', [keyword], (tx, res) => {
                         return that.formatResults(tx, res, resolve)
                     }, (res) => {
                         reject(res)
                     })

                 }
                 else {
                     tx.executeSql('SELECT * FROM Products WHERE Products MATCH (?) AND category=(?) ORDER BY timestamp DESC', [keyword, category], (tx, res) => {
                         return that.formatResults(tx, res, resolve)
                     }, (res) => {
                         reject(res)
                     })
                 }
             }, (res)=>{reject(res)}, that.successCB)
         })
     }
     //Todo update update method to apropiate fields
     updateProduct(product){

         let that =this;
         return new Promise((resolve,reject)=>{
            that.db.transaction((tx)=>{

                tx.executeSql('UPDATE Products SET '+
                'authorID=(?),'+
                'title=(?),'+
                'description=(?),'+
                'productID=(?)=(?),'+
                'price_value=(?),'+
                'price_unit=(?),'+
                'size_value,' +
                'size_unit=(?),'+
                'subCategory=(?),'+//region
                'category=(?),'+//district
                'street=(?),'+
                'ward=(?),'+
                'surveyed=(?),'+
                'planned=(?),'+
                'titleDeed=(?),'+
                'rating_value =(?),'+
                'rating_count=(?),'+
                'photos  =(?),'+
                'seller =(?),'+
                'createdAt =(?),'+
                'editedAt =(?),'+
                'expireAt =(?),'+
                'sold=(?),'+
                 'WHERE path=(?) AND authorID=(?)',
                        [
                            product.authorID,
                            product.title,
                            product.description,
                            product.path,
                            product.price.value,
                            product.price.unit,
                            product.size.value,
                            product.size.unit,
                            product.location.region,
                            product.location.district,
                            product.location.street,
                            product.loacation.ward,
                            product.legal.surveyed,
                            product.legal.planned,
                            product.legal.titleDeed,
                            product.rating.value,
                            product.rating.count,
                            JSON.stringify(product.photos),
                            JSON.stringify(product.seller) ,
                            product.createdAt,
                            product.editedAt,
                            product.expireAt,
                            false
                        ],(res)=>{resolve(res)}, (res)=>{reject(res)})


                /*tx.executeSql('UPDATE Products SET '
                     +'acceptedPaymentMethod =(?),'+
                     'areaServed=(?),'+
                     'availability=(?),'+
                     'availableDeliveryMethod=(?),'+
                     'brand=(?),'+
                     'category=(?),'+
                     'currency=(?),'+
                     ' description=(?),'+
                     'itemCondition=(?),'+
                     'manufacturer=(?),'+
                     'model=(?),'+
                     'name=(?),'+
                     'price=(?),'+
                     'productID=(?),'+
                     'quantity=(?),'+
                     'timestamp=(?),'+
                     'userID=(?),'+
                     'userName=(?),'+
                     'warranty=(?),' +
                     'photos=(?) )'+
                     'WHERE productID=(?) AND sellerID=(?)',
                     [   JSON.stringify(product.acceptedPaymentMethod) ,
                         JSON.stringify(product.areaServed),
                         product.availability,
                         JSON.stringify(product.availableDeliveryMethod),
                         product.brand,
                         product.category,
                         product.currency,
                         product.description,
                         product.itemCondition,
                         product.manufacturer,
                         product.model,
                         product.name,
                         product.price,
                         product.productID,
                         product.quantity,
                         product.timestamp,
                         product.userID,
                         product.userName,
                         product.warranty,
                         JSON.stringify(product.photos)
                     ],(res)=>{resolve(res)}, (res)=>{reject(res)})*/

             }, (res)=>{reject(res)},that.successCB)
         })
     }
     formatResults(tx,results,resolve){

             //that.getAllProductsSuccess(tx,results)

             let len = results.rows.length;
             let products=[];
             //let photos=[]
         for (let i = 0; i < len; i++) {
             let row = results.rows.item(i);
             row.photos = JSON.parse(row.photos);
             row.seller = JSON.parse(row.seller);

             products.push(row);
             //console.log(row.photos)

         }
             resolve(products)

     }


}

export const DB =new DBwrapper();