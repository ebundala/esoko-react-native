/**
 * Created by ebundala on 3/11/2017.
 */



'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Button,
    TouchableNativeFeedback
} from 'react-native';

//import { StackNavigator } from 'react-navigation';
import { Toolbar} from 'react-native-material-ui';

import {IMAGES} from "../../products/products.consts"

import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"





import SQLite from 'react-native-sqlite-storage';
/*SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "esoko.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;
let db;

const SQLiteDemo = React.createClass({
   //common
    errorCB(err) {
        console.log("error: ",err);
        this.state.progress.push("Error: "+ (err.message || err));
        this.setState(this.state);
        return false;
    },
    successCB() {
        console.log("SQL executed ...");
    },
    openCB() {
        this.state.progress.push("Database OPEN");
        this.setState(this.state);

    },
    closeCB() {
        this.state.progress.push("Database CLOSED");
        this.setState(this.state);
    },
    deleteCB() {
        console.log("Database DELETED");
        this.state.progress.push("Database DELETED");
        this.setState(this.state);
    },
    populateDatabase(db){
        let that = this;
        that.state.progress.push("Database integrity check");
        that.setState(that.state);
        db.executeSql('SELECT 1 FROM Version LIMIT 1', [],
            function () {
                that.state.progress.push("Database is ready ... executing query ...");
                that.setState(that.state);
               // db.transaction((tx)=>{
                    that.searchProducts("debugging","electronics").then(that.getAllProductsSuccess).catch((e)=>{
                        console.error(e.message)
                    })
                //}
            },
            function (error) {
                console.log("received version error:", error);
                that.state.progress.push("Database not yet ready ... populating data");
                that.setState(that.state);
                db.transaction(that.populateDB, that.errorCB, function () {
                    that.state.progress.push("Database populated ... executing query ...");
                    that.setState(that.state);
                    db.transaction(()=>{

                        that.getAllProducts().then(that.getAllProductsSuccess).catch((e)=>{
                            console.error(e.message)
                        })


                    },that.errorCB, function () {
                        console.log("Transaction is now finished");
                        that.state.progress.push("Processing completed");
                        that.setState(that.state);
                        //that.closeDatabase();
                    });
                });
            });
    },
    populateDB(tx) {
        this.state.progress.push("Executing DROP stmts");
        this.setState(this.state);




        tx.executeSql('DROP TABLE IF EXISTS Products;');
        tx.executeSql('DROP TABLE IF EXISTS Orders;');
        tx.executeSql('DROP TABLE IF EXISTS Messages;');


        this.state.progress.push("Executing CREATE stmts");
        this.setState(this.state);

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
        let that=this
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
                /!*tx.executeSql('INSERT INTO Products (productID,title,currency,sellerID,price,postedOn,description,category,photos ) VALUES (?,?,?,?,?,?,?,?,?)',
                [
                item.ID,
                item.title,
                item.currency,
                item.sellerID ,
                item.price ,
                item.postedOn ,
                item.description ,
                item.category,
                JSON.stringify(item.photos)],that.successCB, that.errorCB)*!/

                that.addProduct(item).then((res,r)=>{
                    console.log("item added"+i+" ")
                })
        })


       /!* tx.executeSql('DROP TABLE IF EXISTS Employees;');
        tx.executeSql('DROP TABLE IF EXISTS Offices;');
        tx.executeSql('DROP TABLE IF EXISTS Departments;');

        this.state.progress.push("Executing CREATE stmts");
        this.setState(this.state);

        tx.executeSql('CREATE TABLE IF NOT EXISTS Version( '
            + 'version_id INTEGER PRIMARY KEY NOT NULL); ', [], this.successCB, this.errorCB);

        tx.executeSql('CREATE TABLE IF NOT EXISTS Departments( '
            + 'department_id INTEGER PRIMARY KEY NOT NULL, '
            + 'name VARCHAR(30) ); ', [], this.successCB, this.errorCB);

        tx.executeSql('CREATE TABLE IF NOT EXISTS Offices( '
            + 'office_id INTEGER PRIMARY KEY NOT NULL, '
            + 'name VARCHAR(20), '
            + 'longtitude FLOAT, '
            + 'latitude FLOAT ) ; ', [], this.successCB, this.errorCB);

        tx.executeSql('CREATE TABLE IF NOT EXISTS Employees( '
            + 'employe_id INTEGER PRIMARY KEY NOT NULL, '
            + 'name VARCHAR(55), '
            + 'office INTEGER, '
            + 'department INTEGER, '
            + 'FOREIGN KEY ( office ) REFERENCES Offices ( office_id ) '
            + 'FOREIGN KEY ( department ) REFERENCES Departments ( department_id ));', []);

        this.state.progress.push("Executing INSERT stmts");
        this.setState(this.state);

        tx.executeSql('INSERT INTO Departments (name) VALUES ("Client Services");', []);
        tx.executeSql('INSERT INTO Departments (name) VALUES ("Investor Services");', []);
        tx.executeSql('INSERT INTO Departments (name) VALUES ("Shipping");', []);
        tx.executeSql('INSERT INTO Departments (name) VALUES ("Direct Sales");', []);

        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Denver", 59.8,  34.);', []);
        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Warsaw", 15.7, 54.);', []);
        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Berlin", 35.3, 12.);', []);
        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Paris", 10.7, 14.);', []);

        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Sylvester Stallone", 2,  4);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Elvis Presley", 2, 4);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Leslie Nelson", 3,  4);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Fidel Castro", 3, 3);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Bill Clinton", 1, 3);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Margaret Thatcher", 1, 3);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Donald Trump", 1, 3);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Dr DRE", 2, 2);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Samantha Fox", 2, 1);', []);*!/
        console.log("all config SQL done");
    },
    loadAndQueryDB(){
        this.state.progress.push("Opening database ...");
        this.setState(this.state);
        db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
        this.populateDatabase(db);
    },
    deleteDatabase(){
        this.state.progress = ["Deleting database"];
        this.setState(this.state);
        SQLite.deleteDatabase(database_name, this.deleteCB, this.errorCB);
    },
    closeDatabase(){
        var that = this;
        if (db) {
            console.log("Closing database ...");
            that.state.progress.push("Closing database");
            that.setState(that.state);
            db.close(that.closeCB,that.errorCB);
        } else {
            that.state.progress.push("Database was not OPENED");
            that.setState(that.state);
        }
    },
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

            that.state.progress.push("Processing completed");
            that.setState(that.state);
        });
        })
    },
    getAllProductsSuccess(results) {
        console.log("results\n"+JSON.stringify(results))
        this.state.progress.push("Query completed");
        this.setState(this.state);
        let len = results.length;
        for (let i = 0; i < len; i++) {
            let row = results[i];
            this.state.progress.push(row);
        }
        this.setState(this.state);
    },
    query(sql){
        let that =this;
        return new Promise((resolve, reject) => {
            that.state.progress.push("Database query ... executing  ...");
            that.setState(that.state);
            db.transaction((tx) => {
                tx.executeSql(sql, [], resolve, reject)
            }, reject, that.successCB);
        })
    },

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
    },
    deleteProduct(id){
        let that =this;
        return new Promise((resolve,reject)=>{
            db.transaction((tx)=>{

                tx.executeSql('DELETE FROM Products WHERE productID=(?)',
                    [id],resolve, reject)





            }, reject,that.successCB)
        })
    },
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
    },
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
    },

    //ORDERS METHODS
    addOrder(order){
        let that =this;
        return new Promise((resolve,reject)=>{

            db.transaction((tx)=>{

                tx.executeSql('INSERT INTO Products (productID,title,currency,sellerID,price,postedOn,description,category,photos ) VALUES (?,?,?,?,?,?,?,?,?)',
                    [
                        order.ID,
                        order.title,
                        order.currency,
                        order.sellerID ,
                        order.price ,
                        order.postedOn ,
                        order.description ,
                        order.category,
                        JSON.stringify(order.photos)],resolve, reject)





            }, reject,that.successCB)
        })
    },
    deleteOrder(id){
        let that =this;
        return new Promise((resolve,reject)=>{
            db.transaction((tx)=>{

                tx.executeSql('DELETE FROM Orders WHERE productID=(?)',
                    [id],resolve, reject)





            }, reject,that.successCB)
        })
    },
    searchOrders(keyword="*",sellerID="*",productID="*"){
        let that = this;
        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(' SELECT * FROM Orders WHERE Orders MATCH (?) AND sellerID=(?) ORDER BY postedOn DESC', [keyword,sellerID], (tx,results)=>{
                    let len = results.rows.length;
                    let res=[];
                    for (let i = 0; i < len; i++) {
                        res.push(results.rows.item(i));

                    }
                    resolve(res)
                }, reject)

            }, reject, that.successCB)
        })
    },
    updateOrder(product){
        let that =this;
        return new Promise((resolve,reject)=>{
            db.transaction((tx)=>{

                tx.executeSql('UPDATE Products SET title=(?),currency=(?),sellerID=(?),price=(?),postedOn=(?),description=(?),category=(?),photos=(?) WHERE productID=(?)',
                    [   product.title,
                        product.currency,
                        product.sellerID ,
                        product.price ,
                        product.postedOn ,
                        product.description ,
                        product.category,
                        JSON.stringify(product.photos),
                        product.productID
                    ],resolve, reject)





            }, reject,that.successCB)
        })
    },

    //MESSAGES METHODS
    addMessage(message){
        let that = this;
        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql('INSERT INTO Products (productID,title,currency,sellerID,price,postedOn,description,category,photos ) VALUES (?,?,?,?,?,?,?,?,?)',
                    [
                        message.ID,
                        message.title,
                        message.currency,
                        message.sellerID,
                        message.price,
                        message.postedOn,
                        message.description,
                        message.category,
                        JSON.stringify(message.photos)], resolve, reject)


            }, reject, that.successCB)
        })
    },
    deleteMessage(id){
        let that =this;
        return new Promise((resolve,reject)=>{
            db.transaction((tx)=>{
                tx.executeSql('DELETE FROM Messages WHERE productID=(?)',
                    [id],resolve, reject)
            }, reject,that.successCB)
        })
    },

    searchMessages(keyword="*",senderID="*"){
        let that = this;
        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(' SELECT * FROM Messages WHERE Messages MATCH (?) AND senderID=(?) ORDER BY postedOn DESC', [keyword,senderID], (tx,results)=>{
                    let len = results.rows.length;
                    let res=[];
                    for (let i = 0; i < len; i++) {
                        res.push(results.rows.item(i));

                    }
                    resolve(res)
                }, reject)

            }, reject, that.successCB)
        })
    },

    updateMessage(product){
        let that =this;
        return new Promise((resolve,reject)=>{
            db.transaction((tx)=>{

                tx.executeSql('UPDATE Products SET title=(?),currency=(?),sellerID=(?),price=(?),postedOn=(?),description=(?),category=(?),photos=(?) WHERE productID=(?)',
                    [   product.title,
                        product.currency,
                        product.sellerID ,
                        product.price ,
                        product.postedOn ,
                        product.description ,
                        product.category,
                        JSON.stringify(product.photos),
                        product.productID
                    ],resolve, reject)





            }, reject,that.successCB)
        })
    },

//react methods
    getInitialState(){
        return {
            progress: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
    },

    componentWillUnmount(){
        this.closeDatabase();
    },
    runDemo(){
        this.state.progress = ["Starting SQLite Callback Demo"];
        this.setState(this.state);
        this.loadAndQueryDB();
    },

    renderProgressEntry(entry){
        return (<View style={listStyles.li}>
            <View>
                {entry.hasOwnProperty("title")?
                    <TouchableNativeFeedback onPress={()=>{this.updateProduct({...entry,title:"updated too"})}}>
                    <Text style={listStyles.title}>{entry.title}</Text>
                </TouchableNativeFeedback>:
                    <Text style={listStyles.title}>{entry}</Text>
                        }
            </View>
        </View>)
    },

    render(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (<View style={st.mainContainer}>
            <View style={st.toolbar}>
                <Text style={st.toolbarButton} onPress={this.runDemo}>
                    Run Demo
                </Text>
                <Text style={st.toolbarButton} onPress={this.closeDatabase}>
                    Close DB
                </Text>
                <Text style={st.toolbarButton} onPress={this.deleteDatabase}>
                    Delete DB
                </Text>
            </View>
            <ListView
                enableEmptySections={true}
                dataSource={ds.cloneWithRows(this.state.progress)}
                renderRow={this.renderProgressEntry}
                style={listStyles.liContainer}/>
        </View>);
    }
});

var listStyles = StyleSheet.create({
    li: {
        borderBottomColor: '#c8c7cc',
        borderBottomWidth: 0.5,
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    liContainer: {
        backgroundColor: '#fff',
        flex: 1,
        paddingLeft: 15,
    },
    liIndent: {
        flex: 1,
    },
    liText: {
        color: '#333',
        fontSize: 17,
        fontWeight: '400',
        marginBottom: -3.5,
        marginTop: -3.5,
    },
});

var st = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    toolbar: {
        backgroundColor: '#51c04d',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarButton: {
        color: 'blue',
        textAlign: 'center',
        flex: 1
    },
    mainContainer: {
        flex: 1
    }
});*/
SQLite.DEBUG(true);
SQLite.enablePromise(true);








const database_name = "eso.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;


class DatabaseWrapper {
    constructor(dbname){


        /**
         * Whether to show SQL/DB errors.
         *
         * Default behavior is to show errors if both WP_DEBUG and WP_DEBUG_DISPLAY
         * evaluated to true.
         *
         * @since 0.71
         * @access private
         * @var bool
         */
        this.show_error = false;

        /**
         * Whether to suppress errors during the DB bootstrapping.
         *
         * @access private
         * @since 2.5.0
         * @var bool
         */
        this.suppress_errors = false;

        /**
         * The last error during query.
         *
         * @since 2.5.0
         * @var string
         */
        this.last_error = '';

        /**
         * Amount of queries made
         *
         * @since 1.2.0
         * @access public
         * @var int
         */
        this.num_queries = 0;

        /**
         * Count of rows returned by previous query
         *
         * @since 0.71
         * @access public
         * @var int
         */
        this.num_rows = 0;

        /**
         * Count of affected rows by previous query
         *
         * @since 0.71
         * @access private
         * @var int
         */
        this.rows_affected = 0;

        /**
         * The ID generated for an AUTO_INCREMENT column by the previous query (usually INSERT).
         *
         * @since 0.71
         * @access public
         * @var int
         */
        this.insert_id = 0;

        /**
         * Last query made
         *
         * @since 0.71
         * @access private
         * @var array
         */
        this.last_query=[];

        /**
         * Results of the last query made
         *
         * @since 0.71
         * @access private
         * @var array|null
         */
        this.last_result=[];

        /**
         * MySQL result, which is either a resource or boolean.
         *
         * @since 0.71
         * @access protected
         * @var mixed
         */
       this.result="";

        /**
         * Cached column info, for sanity checking data before inserting
         *
         * @since 4.2.0
         * @access protected
         * @var array
         */
       this.col_meta = [];

        /**
         * Calculated character sets on tables
         *
         * @since 4.2.0
         * @access protected
         * @var array
         */
       this.table_charset = [];

        /**
         * Whether text fields in the current query need to be sanity checked.
         *
         * @since 4.2.0
         * @access protected
         * @var bool
         */
       this.check_current_query = true;

        /**
         * Flag to ensure we don't run into recursion problems when checking the collation.
         *
         * @since 4.2.0
         * @access private
         * @see wpdb::check_safe_collation()
         * @var bool
         */
        this.checking_collation = false;

        /**
         * Saved info on the table column
         *
         * @since 0.71
         * @access protected
         * @var array
         */
       this.col_info=[];

        /**
         * Saved queries that were executed
         *
         * @since 1.5.0
         * @access private
         * @var array
         */
        this.queries=[];

        /**
         * The number of times to retry reconnecting before dying.
         *
         * @since 3.9.0
         * @access protected
         * @see wpdb::check_connection()
         * @var int
         */
       this.reconnect_retries = 5;

        /**
         * WordPress table prefix
         *
         * You can set this to have multiple WordPress installations
         * in a single database. The second reason is for possible
         * security precautions.
         *
         * @since 2.5.0
         * @access public
         * @var string
         */
        this.prefix = '';

        /**
         * WordPress base table prefix.
         *
         * @since 3.0.0
         * @access public
         * @var string
         */
        this.base_prefix="";

        /**
         * Whether the database queries are ready to start executing.
         *
         * @since 2.3.2
         * @access private
         * @var bool
         */
        this.ready = false;

        /**
         * Blog ID.
         *
         * @since 3.0.0
         * @access public
         * @var int
         */
        this.blogid = 0;

        /**
         * Site ID.
         *
         * @since 3.0.0
         * @access public
         * @var int
         */
        this.siteid = 0;

        /**
         * List of WordPress per-blog tables
         *
         * @since 2.5.0
         * @access private
         * @see wpdb::tables()
         * @var array
         */
        this.tables = [ 'posts', 'comments', 'links', 'options', 'postmeta',
            'terms', 'term_taxonomy', 'term_relationships', 'termmeta', 'commentmeta' ];

        

        /**
         * List of WordPress global tables
         *
         * @since 3.0.0
         * @access private
         * @see wpdb::tables()
         * @var array
         */
        this.global_tables = ['users', 'usermeta' ];

        /**
         * List of Multisite global tables
         *
         * @since 3.0.0
         * @access private
         * @see wpdb::tables()
         * @var array
         */
        this.ms_global_tables = [ 'blogs', 'signups', 'site', 'sitemeta',
            'sitecategories', 'registration_log', 'blog_versions' ];

        /**
         * WordPress Comments table
         *
         * @since 1.5.0
         * @access public
         * @var string
         */
        this.comments="";

        /**
         * WordPress Comment Metadata table
         *
         * @since 2.9.0
         * @access public
         * @var string
         */
        this.commentmeta="";

        /**
         * WordPress Links table
         *
         * @since 1.5.0
         * @access public
         * @var string
         */
        this.links="";

        /**
         * WordPress Options table
         *
         * @since 1.5.0
         * @access public
         * @var string
         */
        this.options="";

        /**
         * WordPress Post Metadata table
         *
         * @since 1.5.0
         * @access public
         * @var string
         */
        this.postmeta="";

        /**
         * WordPress Posts table
         *
         * @since 1.5.0
         * @access public
         * @var string
         */
        this.posts="";

        /**
         * WordPress Terms table
         *
         * @since 2.3.0
         * @access public
         * @var string
         */
        this.terms="";

        /**
         * WordPress Term Relationships table
         *
         * @since 2.3.0
         * @access public
         * @var string
         */
        this.term_relationships="";

        /**
         * WordPress Term Taxonomy table
         *
         * @since 2.3.0
         * @access public
         * @var string
         */
        this.term_taxonomy="";

        /**
         * WordPress Term Meta table.
         *
         * @since 4.4.0
         * @access public
         * @var string
         */
        this.termmeta="";

        //
        // Global and Multisite tables
        //

        /**
         * WordPress User Metadata table
         *
         * @since 2.3.0
         * @access public
         * @var string
         */
        this.usermeta="";

        /**
         * WordPress Users table
         *
         * @since 1.5.0
         * @access public
         * @var string
         */
        this.users="";

        /**
         * Multisite Blogs table
         *
         * @since 3.0.0
         * @access public
         * @var string
         */
        this.blogs="";

        /**
         * Multisite Blog Versions table
         *
         * @since 3.0.0
         * @access public
         * @var string
         */
        this.blog_versions="";

        /**
         * Multisite Registration Log table
         *
         * @since 3.0.0
         * @access public
         * @var string
         */
        this.registration_log="";

        /**
         * Multisite Signups table
         *
         * @since 3.0.0
         * @access public
         * @var string
         */
        this.signups="";

        /**
         * Multisite Sites table
         *
         * @since 3.0.0
         * @access public
         * @var string
         */
        this.site="";

        /**
         * Multisite Sitewide Terms table
         *
         * @since 3.0.0
         * @access public
         * @var string
         */
        this.sitecategories="";

        /**
         * Multisite Site Metadata table
         *
         * @since 3.0.0
         * @access public
         * @var string
         */
        this.sitemeta="";

        /**
         * Format specifiers for DB columns. Columns not listed here default to %s. Initialized during WP load.
         *
         * Keys are column names, values are format types: 'ID' => '%d'
         *
         * @since 2.8.0
         * @see wpdb::prepare()
         * @see wpdb::insert()
         * @see wpdb::update()
         * @see wpdb::delete()
         * @see wp_set_wpdb_vars()
         * @access public
         * @var array
         */
        this.field_types = [];

        /**
         * Database table columns charset
         *
         * @since 2.2.0
         * @access public
         * @var string
         */
        this.charset="";

        /**
         * Database table columns collate
         *
         * @since 2.2.0
         * @access public
         * @var string
         */
        this.collate="";

       

        /**
         * Database Name
         *
         * @since 3.1.0
         * @access protected
         * @var string
         */
       this.dbname=dbname;

       

        /**
         * Database Handle
         *
         * @since 0.71
         * @access protected
         * @var string
         */
       this.dbh=SQLite;
        this.db=null;
        /**
         * A textual description of the last query/get_row/get_var call
         *
         * @since 3.0.0
         * @access public
         * @var string
         */
        this.func_call="";
        
        /**
         * Whether we've managed to successfully connect at some point
         *
         * @since 3.9.0
         * @access private
         * @var bool
         */
        this.has_connected = false;
      if(this.dbname&&this.dbh)
        this.connect();
    }
    connect(name){
        let that=this;
      return  this.dbh.echoTest().then((r)=>{
          return  that.dbh.openDatabase({name : that.dbname||name}).then((DB) => {
                that.db = DB;
                if(that.db){
                    that.has_connected=true;
                    return(that.db);
                }
                throw (new Error("failed to connect to database "+that.dbname))
            }).catch((error) => {
                console.log(error);
            });


        }).catch(function(e){
            console.log(e);
        })

    }
    tables(){}
    prepare(){

    }
    show_errors(){
        this.show_error=true;
    }
    hide_errors(){
        this.show_error=false;
    }
    flush(){
        this.last_result = [];
        this.col_info = [];
        this.last_query = "";
        //this.from_disk_cache = false;
    }
    check_connection(){

        return this.has_connected;
    }
    query(){}
    _do_query(){}
    insert(){}
    replace(){}
    _insert_replace_helper( table, data, format = null, type = 'INSERT' ) {}
    update( table, data, where, format = null, where_format = null ) {}
    delete( table, where, where_format = null ) {}
    process_fields( table, data, format ) {

    }
    process_field_formats( data, format ) {}
    get_var( query = null,field,x = 0, y = 0 ) {

        let values;
        // Log how the function was called
        this.func_call = `\db.get_var(\"${query}\",${x},${y})`;
        let that = this;

        return new Promise((resolve, reject) => {
            // If there is a query then perform it if not then use cached results..
            if (query) {
                return that.query(query).then((results) => {
                    resolve(results.rows.length ? results.rows.item(x)[field] : null);
                });
            }

            // Extract var out of cached results based x,y vals
            if (that.last_result[y]) {
                values = that.last_result[y];
            }

            // If there is a value return it else return null
            resolve(values.hasOwnProperty("rows") && values.rows.length ? values.rows.item(x)[field] : null);
        });
    }
    get_row( query = null ,x=0,y = 0) {
        let values;
        // Log how the function was called
        this.func_call = `\db.get_row(\"${query}\",${x},${y})`;

        let that = this;

        return new Promise((resolve, reject) => {
            // If there is a query then perform it if not then use cached results..
            if (query) {
                return that.query(query).then((results) => {
                    resolve(results.rows.length ? results.rows.item(y): null);
                });
            }

            // Extract var out of cached results based x,y vals
            if (that.last_result[x]) {
                values = that.last_result[x];
            }

            // If there is a value return it else return null
            resolve(values.hasOwnProperty("rows") && values.rows.length ? values.rows.item(y): null);
        });
    }
    get_col( query = null ,field, x = 0 ) {
        let values=[];
        // Log how the function was called
        this.func_call = `\db.get_col(\"${query}\",${x})`;

        let that = this;

        return new Promise((resolve, reject) => {
            // If there is a query then perform it if not then use cached results..
            if (query) {
                return that.query(query).then((results) => {
                    let len=results.rows.length;
                    for (let i=0;i<len;i++)
                    {
                        values.push(results.rows.item(i)[field]);
                    }
                    resolve(values.length ? values: null);
                });
            }

            // Extract var out of cached results based x,y vals
            if (that.last_result[x]) {
                let last=that.last_result[x];
                let len=last.hasOwnProperty("rows") && last.rows.length ? last.rows.length: 0;
                for (let i=0;i<len;i++)
                {
                    values.push(last.rows.item(i)[field]);
                }

            }

            // If there is a value return it else return null
            resolve(values instanceof Array && values.length ? values: null);
        });
    }
    get_results( query = null, x = 0 )
    {
        let values;
        this.func_call = `\db->get_results(\"${query}\", ${x})`;
        let that = this;
        return new Promise((resolve, reject) => {
            if (query) {
                return that.query(query).then((results) => {

                    resolve(results.rows.length ? results : null);
                })
            }
            if (that.last_result[x]) {
                values = that.last_result[x];

            }


            resolve(values.hasOwnProperty("rows") && values.rows.length ? values : null);
        })
    }
    close(){
        if (this.db) {
            console.log("Closing database ...");
            let that=this;
           return this.db.close().then((status) => {
               that.has_connected=false;
            return this.flush();
            }).catch((error) => {
                console.log("Closing database ... error");
            });
        } else {
            return new Promise((r,reject)=>{
                reject(new Error("db is undefined"));
            })
            console.log("Database not opened");
        }
    }
    delete_db(dbname){
      return  this.dbh.deleteDatabase(this.dbname||dbname).then(() => {
            console.log("Database DELETED");

        }).catch((error) => {
          console.log("Database DELETE error");
        });
    }
}


export class OrdersList extends Component{
constructor(){
    super();
    this.state={}
}
    render(){
        let {navigate,goBack}=this.props.navigation;
       let db= new DatabaseWrapper(database_name);
        return(


        <View style={{flex:1}}>
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={()=>{
                    goBack();
                }}
                centerElement="Orders"
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                }}
            />

            <View>

                <Button title="Orders One" onPress={()=>{

                    db.close().then(()=>{
                        alert("dbClosed")
                    }).catch((e)=>{
                        console.log(e)
                    });

                }}/>

            </View>
        </View>
        )
    }
}

export class SingleOrderView extends Component{

    render(){
        let {navigate,goBack}=this.props.navigation;
        return(
            <View style={{flex:1}}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={()=>{
                        goBack();
                    }}
                    centerElement="Orders"
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                    }}
                />
                <Text>single order View</Text>
            </View>
        )
    }
}

 