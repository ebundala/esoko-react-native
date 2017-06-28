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
import Singleton from "../../utils/singleton";
SQLite.DEBUG(true);
SQLite.enablePromise(true);








const database_name = "eso.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;


class DatabaseWrapper extends Singleton{
    constructor(dbname){
        super();

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
        this.last_query="";

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
     query (sqlObject){
        let values=[];
        let sql="";
         if(sqlObject.hasOwnProperty("sql"))
         {
            sql=sqlObject.sql;
            values=sqlObject.values;

        }else{
             sql=sqlObject;

         }
        this.last_query=sql;
         this.num_queries++;

        let that=this;

       /*  this.db.transaction(tx =>
         {
            // return tx.executeSql(sq,[]).then(r=>{
                 return that.db.executeSql(sql,values).then(()=>{
                     return that.db.executeSql("SELECT * FROM "+table+"",[]).then(res => {
                         console.log("res",res[0].rows.item(0));
                         //alert(res[0].rows.item(1))
                     }).catch(e => {
                         console.log(e)
                     })
                 })
            // })
         }).then(res => {
             console.log("trx",res)
         }).catch(e => {
             console.log(e)
         });*/


         return this.db.executeSql(sql,values).then(res=>{
                console.log("query res ",res[0]);
                that.last_result.push(res[0]);
                return res;

            }).catch(e => {
                console.log(e);
                that.last_error=e;

            });



    }
    _do_query(){}
    insert(){}
    replace(){}
    //_insert_replace_helper( table, data, format = null, type = 'INSERT' ) {}
    update( table, data, where, format = null, where_format = null ) {}
    delete( table, where, where_format = null ) {}
    process_fields( table, data, format ){
        let sql=[],sq=[],placeholder=[],values=[],field;
        let that=this;
        switch(format){
            case "CREATE":
                for(field in data){
                    if(data.hasOwnProperty(field)){
                        //values.push(data[field].toString());
                        sql.push(field+" "+data[field].toString());
                    }
                }
                //sql=sql.join(" ?, ")+" ? ";
                 sql="CREATE TABLE IF NOT EXISTS "+table+"(id INTEGER PRIMARY KEY AUTOINCREMENT,"+sql.toString()+")";
                console.log(sql);

                break;
            case "INSERT":
                for(field in data){
                   if(data.hasOwnProperty(field)){
                    values.push(data[field].toString());
                    sql.push(field);

                    placeholder.push("?");

                   }
                }
                sql="INSERT INTO "+table+"("+sql.toString()+") VALUES("+placeholder.toString()+")";
                console.log(sql);

               break;
            case "SET":
                for(field in data){
                    if(data.hasOwnProperty(field)){
                        values.push(data[field].toString());
                        sql.push(field+"=?");
                        //sq.push(field+" VARCHAR(50)");
                        //placeholder.push("?");
                    }
                }
                sql="UPDATE "+table+" SET "+sql.toString()+" WHERE id=1";
                console.log(sql);

                break;
            case "AND":
                for(field in data){
                    if(data.hasOwnProperty(field)){
                        values.push(data[field].toString());
                        sql.push(field+"=?");
                    }
                }
                sql=sql.join(" AND ");
                sql="SELECT * FROM "+table+" WHERE ("+sql.toString()+")";
                console.log(sql);

                break;
            case "OR":
                for(field in data){
                    if(data.hasOwnProperty(field)){
                        values.push(data[field].toString());
                        sql.push(field+"=?");
                    }
                }
               sql=sql.join(" OR ");
                sql="SELECT * FROM "+table+" WHERE ("+sql.toString()+")";

                break;

            default:
                sql="";

        }

        return {sql,values};
    }
    //process_field_formats( data, format ) {}
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
    this.state={
        name:"elias",
        age:678,
        job:"engineer",
        industry:"software"
    }
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

                <Button title="delete DB" onPress={()=>{

                    db.delete_db().then(()=>{
                        alert("db Deleted")
                    }).catch((e)=>{
                        console.log(e)
                    });

                }}/>

                <Button title=" Create table" onPress={()=>{
                    db.query( db.process_fields("users",{
                        name:"VARCHAR(50)",
                        age:"INTEGER",
                        job:"VARCHAR(50)",
                        industry:"VARCHAR(50)"
                    },"CREATE")
                    ).then((res)=>{
                        console.log("result",res)
                    });

                }}/>
                <Button title=" insert" onPress={()=>{

                    db.query(db.process_fields("users",this.state,"INSERT")).then((res)=>{
                        console.log("result",res)
                    });

                }}/>

                <Button title=" set" onPress={()=>{


                    db.query(db.process_fields("users",this.state,"SET")).then(res=>{

                        console.log("result",res);
                    });
                }}/>

                <Button title=" AND " onPress={()=>{


                    db.query(db.process_fields("users",this.state,"AND")).then(res=>{

                        console.log("result",res);
                    });
            }}/>

                <Button title=" OR " onPress={()=>{

                    db.query(db.process_fields("users",this.state,"OR")).then(res=>{

                        console.log("result",res);
                    });

                }}/>

                <Button title=" query " onPress={()=>{
                    //db.process_fields("users",this.state,"INSERT")
                    db.query("SELECT * FROM users")
                    /*.then((res)=>{
                        console.log("result",db.last_result[db.num_queries-1])
                    });*/

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

 