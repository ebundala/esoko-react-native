
import Firestack from 'react-native-firestack'

// Initialize Firebase
 /*  const config = {
    apiKey: "AIzaSyDNve8wgqo9-hnmLoZc_Y_C8ppsaVkyNuI",
    authDomain: "esoko-fc718.firebaseapp.com",
    databaseURL: "https://esoko-fc718.firebaseio.com",
    storageBucket: "esoko-fc718.appspot.com",
    messagingSenderId: "1071434923103"
  }; */







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
    sold:Boolean};
import {IMAGES} from "../products/products.actions"
import {initialState } from "../navigationView/categories.actions"
import Singleton from "./singleton";

import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);


export const database_name = "esoko.db";
export const database_version = "1.0";
//const database_displayname = "SQLite Test Database";
//const database_size = 200000;





export default class DatabaseWrapper extends Singleton{
    constructor(dbname) {
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
        this.last_query = "";

        /**
         * Results of the last query made
         *
         * @since 0.71
         * @access private
         * @var array|null
         */
        this.last_result = [];

        /**
         * MySQL result, which is either a resource or boolean.
         *
         * @since 0.71
         * @access protected
         * @var mixed
         */
        this.result = "";


        /**
         * Saved queries that were executed
         *
         * @since 1.5.0
         * @access private
         * @var array
         */
        this.queries = [];

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
        this.base_prefix = "";

        /**
         * Whether the database queries are ready to start executing.
         *
         * @since 2.3.2
         * @access private
         * @var bool
         */
        this.ready = false;


        /**
         * List of WordPress per-blog tables
         *
         * @since 2.5.0
         * @access private
         * @see wpdb::tables()
         * @var array
         */
        this.tables = ['posts', 'comments', 'postmeta',
            'terms', 'term_taxonomy', 'term_relationships', 'termmeta', 'commentmeta'];


        /**
         * WordPress Comments table
         *
         * @since 1.5.0
         * @access public
         * @var string
         */
        this.comments = "comments";

        /**
         * WordPress Comment Metadata table
         *
         * @since 2.9.0
         * @access public
         * @var string
         */
        this.commentmeta = "commentmeta";


        /**
         * WordPress Post Metadata table
         *
         * @since 1.5.0
         * @access public
         * @var string
         */
        this.postmeta = "postmeta";

        /**
         * WordPress Posts table
         *
         * @since 1.5.0
         * @access public
         * @var string
         */
        this.posts = "posts";

        /**
         * WordPress Terms table
         *
         * @since 2.3.0
         * @access public
         * @var string
         */
        this.terms = "terms";

        /**
         * WordPress Term Relationships table
         *
         * @since 2.3.0
         * @access public
         * @var string
         */
        this.term_relationships = "term_relationships";

        /**
         * WordPress Term Taxonomy table
         *
         * @since 2.3.0
         * @access public
         * @var string
         */
        this.term_taxonomy = "term_taxonomy";

        /**
         * WordPress Term Meta table.
         *
         * @since 4.4.0
         * @access public
         * @var string
         */
        this.termmeta = "termmeta";
        this.apps="apps";
        this.appsmeta="appsmeta";

        /**
         * Database Name
         *
         * @since 3.1.0
         * @access protected
         * @var string
         */
        this.dbname = dbname;
        /**
         * Database Handle
         *
         * @since 0.71
         * @access protected
         * @var string
         */
        this.dbh = SQLite;
        this.db = null;
        /**
         * A textual description of the last query/get_row/get_var call
         *
         * @since 3.0.0
         * @access public
         * @var string
         */
        this.func_call = [];

        /**
         * Whether we've managed to successfully connect at some point
         *
         * @since 3.9.0
         * @access private
         * @var bool
         */
        this.has_connected = false;
       // if (this.dbname && this.dbh)
            //this.connect();
    }

    connect(name) {
        let that = this;
        return this.dbh.echoTest().then((r) => {
            return that.dbh.openDatabase({name: that.dbname || name}).then((DB) => {
                that.db = DB;
                if (that.db) {
                    that.has_connected = true;
                    return (that.db);
                }
                throw (new Error("failed to connect to database " + that.dbname))
            }).catch((error) => {
                console.log(error);
            });


        }).catch(function (e) {
            console.log(e);
        })

    }

    tables() {
    }

    prepare(table, data, format,inline) {
        return this.process_fields(table, data, format,inline);
    }

    show_errors() {
        this.show_error = true;
    }

    hide_errors() {
        this.show_error = false;
    }

    flush() {
        this.last_result = [];
        this.last_query = "";
        this.num_queries = 0;
        this.last_error = "";
        this.queries = [];
        this.rows_affected = 0;
        this.num_rows = 0;
        this.insert_id = 0;
        this.func_call=[];


        //this.from_disk_cache = false;
    }

    check_connection() {

        return this.has_connected;
    }

    query(sqlObject) {
        let values = [];
        let sql = "";
        if (sqlObject.hasOwnProperty("sql")) {
            sql = sqlObject.sql;
            values = sqlObject.values;
        } else {
            sql = sqlObject;
        }
        this.last_query = sql;
        this.queries.push(sqlObject);
        this.num_queries++;
        this.func_call.push(`\db.query(\"${sql}\")`);

        let that = this;
        return new Promise((resolve, reject) => {
            return this.db.executeSql(sql, values).then(res => {
                console.log("query response ", res);
                if (res instanceof Array && res.length) {
                    that.rows_affected = res[0].rowsAffected;
                    that.num_rows = res[0].rows.length;
                    that.insert_id = res[0].insertId;
                    that.last_result.push(res[0]);

                    resolve(res[0]);
                }
                else {
                    throw new Error(sql + "\n query result is not an array");
                }
            }).catch(e => {
                console.log(e);
                that.last_error = e;
                that.last_result.push(e);
                reject(e)
            });
        }).then((res) => {
            return res;
        })

    }
    queryBatch(sql){

        this.last_query = sql;
        this.queries.push(sql);
        this.num_queries++;
        this.func_call.push(`\db.queryBatch(\"${sql}\")`);

        let that = this;

        return this.db.sqlBatch(sql).then(res => {
            console.log("query response ", res);

            that.rows_affected = 0;
            that.num_rows = 0;
            that.insert_id = 0;
            that.last_result.push(res[0]);
            return res;
        }).catch(e => {
            console.log(e);
            that.last_error = e;
            that.last_result.push(e);
        });
    }

    debug() {
        this.func_call.push(`\db.debug()`);
        console.log("all query info\n", this.last_result, "\n", this.queries, "\n",this.func_call,"\n\n\n\n");
        console.log("last query info\n", this.last_result[this.num_queries-1], "\n", this.func_call[this.func_call.length-2], "\n", this.last_query);
    }

    insert(table, data) {

        let sql = this.process_fields(table, data, "INSERT");
        this.func_call.push(`\db.insert(${sql})`);
        return this.query(sql)
    }

    replace(table, oldData, newData) {
        let sql = this.process_fields(table, oldData, "AND");
        this.func_call.push(`\db.replace(\"${table}\",${oldData},${newData})`);

        return this.query(sql).then((res) => {
            if (res.rows.length) {
                let item = res.rows.item(0);
                newData.where = "id=" + item.id;
                sql = this.process_fields(table, newData, "SET");
                return this.query(sql)
            }
            throw new Error("Item not found ")
        })

    }

    update(table, data, where) {
        let sql=this.process_fields(table,{...data,where},"SET");
        return this.query(sql)
    }

    delete(table, where) {
        let data={
            where:where
        };
        let sql=this.process_fields(table,data,"DELETE");
        return this.query(sql);
    }

    process_fields(table, data, format,inline=false) {
        let sql = [], placeholder = [], values = [], field;
        let conditions = "";
        this.func_call.push(`\db.process_fields(\"${table}\",${data},${format})`);
        switch (format) {
            case "CREATE":
                for (field in data) {
                    if (data.hasOwnProperty(field)) {
                        //values.push(data[field].toString());
                        sql.push(field + " " + data[field].toString());
                    }
                }
                sql = "CREATE TABLE IF NOT EXISTS " + table + "(id INTEGER PRIMARY KEY AUTOINCREMENT," + sql.toString() + ")";
                console.log(sql);
                break;
            case "INSERT":
                for (field in data) {
                    if (data.hasOwnProperty(field)&&(field != "where")) {
                        let val=data[field]?data[field].toString():null;
                        !inline?values.push(val):null;
                        inline?val?sql.push(field):null:sql.push(field);
                        inline?(val?placeholder.push("'"+val+"'"):null):placeholder.push("?");

                    }
                }
                sql = "INSERT INTO " + table + "(" + sql.toString() + ") VALUES(" + placeholder.toString() + ")";
                console.log(sql);
                break;
            case "SET":

                for (field in data) {
                    if (data.hasOwnProperty(field)) {
                        if (field != "where") {
                            let val=data[field]?data[field].toString():null;
                            values.push(val);
                            !inline?values.push(val):null;
                            inline?val?sql.push(field):null:sql.push(field);
                            inline?(val?sql.push(field+"="+val):null):sql.push(field+"=?");


                        }
                        else {
                            conditions = data["where"].toString();
                        }
                    }
                }
                if (conditions) {
                    sql = "UPDATE " + table + " SET " + sql.toString() + " WHERE " + conditions;
                }
                else {
                    sql = "";

                }
                console.log(sql);

                break;
            case "DELETE":
                if (data.hasOwnProperty("where")) {
                    conditions = data["where"].toString();

                } else {

                    for (field in data) {
                        if (data.hasOwnProperty(field)) {
                            let val=data[field]?data[field].toString():null;
                            values.push(val);
                           // sql.push(field + "=?");
                            inline?sql.push(field+"="+val):sql.push(field + "=?");
                        }
                    }
                }
                if (conditions) {
                    sql = "DELETE FROM " + table + " WHERE " + conditions;
                    values = [];
                }
                else {
                    sql = "DELETE FROM " + table + " WHERE " + sql.toString();

                }
                console.log(sql);
                break;
            case "AND":
                if (data.hasOwnProperty("where")){
                    conditions = data["where"].toString();
                }
                else {
                    for (field in data) {
                        if (data.hasOwnProperty(field)&&(field != "where")) {

                            let val=data[field]?data[field].toString():null;
                            values.push(val);
                            //sql.push(field + "=?");
                            inline?sql.push(field+"="+val):sql.push(field + "=?");
                        }
                    }
                    sql = sql.join(" AND ");
                }

                if(conditions){
                    sql = "SELECT * FROM " + table + " WHERE "+conditions;
                }
                else{
                    sql = "SELECT * FROM " + table + " WHERE (" + sql.toString() + ")";
                }
                console.log(sql);
                break;
            case "OR":
                if (data.hasOwnProperty("where")){
                    conditions = data["where"].toString();
                }
                else {
                    for (field in data) {
                        if (data.hasOwnProperty(field)&&(field != "where")) {
                            let val=data[field]?data[field].toString():null;
                            values.push(val);
                           // sql.push(field + "=?");
                            inline?sql.push(field+"="+val):sql.push(field + "=?");
                        }
                    }
                    sql = sql.join(" OR ");
                }
                if (conditions) {
                    sql = "SELECT * FROM " + table + " WHERE " + conditions;
                    values = []
                } else {
                    sql = "SELECT * FROM " + table + " WHERE (" + sql.toString() + ")";
                }
                break;
            default:
                sql = "";

        }

        return inline?sql:{sql, values};
    }

    get_var( query = null,field, x = 0, y = this.num_queries) {

        let values;
        // Log how the function was called
        this.func_call.push(`\db.get_var(\"${query}\",${x},${y})`);
        let that = this;

        return new Promise((resolve, reject) => {
            // If there is a query then perform it if not then use cached results..
            if (query) {
                return that.query(query).then((results) => {
                    resolve(results.rows.length ? results.rows.item(x)[field] : null);
                });
            }

            // Extract var out of cached results based x,y vals
            if (that.last_result.length&&that.last_result[y-1]) {
                values = that.last_result[y-1];
            }

            // If there is a value return it else return null
            resolve(values&&values.hasOwnProperty("rows") && values.rows.length ? values.rows.item(x)[field] : null);
        });
    }

    get_row( query = null,x = 0, y = this.num_queries) {
        let values;
        // Log how the function was called
        this.func_call.push(`\db.get_row(\"${query}\",${x},${y})`);

        let that = this;

        return new Promise((resolve, reject) => {
            // If there is a query then perform it if not then use cached results..
            if (query) {
                return that.query(query).then((results) => {
                    resolve(results.rows.length ? results.rows.item(y) : null);
                });
            }

            // Extract var out of cached results based x,y vals
            if (that.last_result.length&&that.last_result[y-1]) {
                values = that.last_result[y-1];
            }

            // If there is a value return it else return null
            resolve(values&&values.hasOwnProperty("rows") && values.rows.length ? values.rows.item(x) : null);
        });
    }

    get_col( query = null,field, y = this.num_queries) {
        let values = [];
        // Log how the function was called
        this.func_call.push(`\db.get_col(\"${query}\",${field},${y})`);

        let that = this;

        return new Promise((resolve, reject) => {
            // If there is a query then perform it if not then use cached results..
            if (query) {
                return that.query(query).then((results) => {
                    let len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        values.push(results.rows.item(i)[field]);
                    }
                    resolve(values.length ? values : null);
                });
            }

            // Extract var out of cached results based x,y vals
            if (that.last_result.length&&that.last_result[y-1]) {
                let last = that.last_result[y-1];
                let len = last.hasOwnProperty("rows") && last.rows.length ? last.rows.length : 0;
                for (let i = 0; i < len; i++) {
                    values.push(last.rows.item(i)[field]);
                }

            }

            // If there is a value return it else return null
            resolve(values instanceof Array && values.length ? values : null);
        });
    }

    get_results(query = null, y = this.num_queries) {
        let values;
        this.func_call.push(`\db.get_results(\"${query}\", ${y})`);
        let that = this;
        return new Promise((resolve, reject) => {
            if (query) {
                return that.query(query).then((results) => {

                    resolve(results.rows.length ? results : null);
                })
            }
            if (that.last_result.length&&that.last_result[y-1]) {
                values = that.last_result[y-1];

            }


            resolve(values&&values.hasOwnProperty("rows") && values.rows.length ? values : null);
        })
    }

    close() {
        this.func_call.push("db.close()");
        if (this.db) {
            console.log("Closing database ...");
            let that = this;
            return this.db.close().then((status) => {
                that.has_connected = false;
                return this.flush();
            }).catch((error) => {
                console.log("Closing database ... error");
            });
        } else {
            console.log("Database not opened");
            return new Promise((r, reject) => {
                reject(new Error("db is undefined"));
            })

        }
    }

    delete_DB(dbname) {
        return this.dbh.deleteDatabase(this.dbname || dbname).then(() => {
            console.log("Database DELETED");

        }).catch((error) => {
            console.log("Database DELETE error");
        });
    }

    prepare_meta(metadata={},table="",args={},format="INSERT"){
        let key,batch=[];
        for(key in metadata ){
            batch.push(this.prepare(table,{meta_key:key,meta_value:metadata[key],...args},format,true))
        }
        return batch;
    }

    insert_meta(metadata,table="",args={},insertId){

        return new Promise((resolve,reject)=>{
            if(metadata)
            {
                let batch= this.prepare_meta(metadata,table,args);
                //for(let i=0;i<batch.length;i++){
                return  this.queryBatch(batch).then((res)=>{
                    //console.log(res)
                    resolve(insertId)
                })
            }
            else{
                resolve(insertId);
            }

        })
    }

    prepare_batch(data={},table="",args={},format="INSERT"){
        let key,batch=[];
        for(key in data)
        {
            batch.push(this.prepare(table,{...data[key],...args},format,true))
        }
        return batch;
    }

    insert_term(term,taxonomy)
    {
        let metadata;
        if(term.hasOwnProperty("metadata")){
            metadata=term.metadata;
            delete  term.metadata;
        }
        this.flush();
       return this.insert(this.terms,term).then((res)=>{
           let insertId=this.insert_id;
         return this.insert_meta(metadata,this.termmeta,{term_id:insertId},insertId);

        }).then((term_id)=>{
           //add taxonomy after a term is added
           console.log("tax_term "+term_id);
           return this.insert(this.term_taxonomy,{...taxonomy,term_id})


       })
    }
    base_terms(){
        this.query("SELECT * FROM terms WHERE name='")
    }
    get_term(name){}
    insert_term_relationships(term_relationships,object_id){
        return new Promise((resolve,reject)=>{
            if(term_relationships&&object_id){
                let batch = this.prepare_batch(term_relationships, this.term_relationships, {object_id});
                //console.log(batch);
                return this.queryBatch(batch).then((res) => {
                    //console.log(res)
                    resolve(object_id)
                })
            }
            resolve(object_id)
        })


}
    insert_post(post={},term_relationships={}){
        let metadata;
        if(post.hasOwnProperty("metadata"))
        {
            metadata=post.metadata;
            delete  post.metadata;
        }
        metadata={region:"rukwa",district:"swax",price:"5000000"};//todo remove after tests
        this.flush();
        return this.insert(this.posts,post).then((res)=>{
            let insertId=this.insert_id;
            console.log("failed",res)
           // debugger;
            return this.insert_meta(metadata,this.postmeta,{post_id:insertId},insertId);
            /*return new Promise((resolve,reject)=>{
                if(metadata)
                {
                    let batch= this.prepare_meta(metadata,this.postmeta,{post_id:insertId});

                    return  this.queryBatch(batch).then((res)=>{
                        //console.log(res)
                        resolve(insertId)
                    })
                }
                else{
                    resolve(insertId);
                }

            })*/

        }).then((object_id)=>{
            //add term_relationships after a post is added
            console.log("term "+object_id);
            return this.insert_term_relationships(term_relationships,object_id);

        })
    }
    update_term(term,taxonomy){}
    update_post(post){}
    delete_term(){}
    delete_post(){}
}

export const DB =new DatabaseWrapper(database_name);