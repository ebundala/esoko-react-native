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

import {IMAGES} from "../../products/products.actions"

import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"





import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
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
                /*tx.executeSql('INSERT INTO Products (productID,title,currency,sellerID,price,postedOn,description,category,photos ) VALUES (?,?,?,?,?,?,?,?,?)',
                [
                item.ID,
                item.title,
                item.currency,
                item.sellerID ,
                item.price ,
                item.postedOn ,
                item.description ,
                item.category,
                JSON.stringify(item.photos)],that.successCB, that.errorCB)*/

                that.addProduct(item).then((res,r)=>{
                    console.log("item added"+i+" ")
                })
        })


       /* tx.executeSql('DROP TABLE IF EXISTS Employees;');
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
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Samantha Fox", 2, 1);', []);*/
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
});












export class OrdersList extends Component{
    static navigationOptions = {
        title: 'Orders',
        header: ({ state, setParams ,navigate}) => {
        // let  right=(<Statuses navigate={navigate}/>);
           let style=styles.navBarBackground;
         return {style};
         },

    };
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
            <SQLiteDemo style={[styles.flex1]}/>
            {false&&<View>

                <Button title="Orders One" onPress={()=>navigate("singleOrder",{title:"Orders one"})}/>
                <Button title="Orders two" onPress={()=>navigate("singleOrder",{title:"Orders two"})}/>
                <Button title="Orders three" onPress={()=>navigate("singleOrder",{title:"Orders three"})}/>
                <Button title="Orders four" onPress={()=>navigate("singleOrder",{title:"Orders four"})}/>
            </View>}
        </View>
        )
    }
}

export class SingleOrderView extends Component{
    static navigationOptions = {
        title: ({ state, setParams ,navigate}) => {
            return state.params.title
        },
        header: ({ state, setParams ,navigate}) => {
            // let  right=(<Statuses navigate={navigate}/>);
            //let  left=(<Menu  onPress={()=>ctx.openDrawer()}/>);
            let style=styles.navBarBackground;
            return {style};
        },

    };
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

 /*const orders=StackNavigator({
    allOrders:{screen:OrdersList}  ,
    singleOrder:{screen:SingleOrder}
},{headerMode:"none"})





export default orders;*/