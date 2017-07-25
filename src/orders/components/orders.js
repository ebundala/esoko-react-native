/**
 * Created by ebundala on 3/11/2017.
 */



'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
    Button,
    TouchableNativeFeeDBack
} from 'react-native';

//import { StackNavigator } from 'react-navigation';
import {Toolbar} from 'react-native-material-ui';

import {IMAGES} from "../../products/products.consts"

import styles, {typographyStyle, colorStyle, colours} from "../../styles/styles"


import SQLite from 'react-native-sqlite-storage';
import DatabaseWrapper, {DB,database_name} from "../../utils/database";
import {get_DB_schema} from "../../utils/schema";
import dataSchema from "../../utils/dataSchema";



export class OrdersList extends Component {
    constructor() {
        super();
        this.state = {
            name: "elias",
            age: 678,
            job: "engineer",
            industry: "software"
        }
    }

    render() {
        let {navigate, goBack}=this.props.navigation;
        //let DB= new DatabaseWrapper(database_name);
        return (


            <View style={{flex: 1}}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        goBack();
                    }}
                    centerElement="Orders"
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                    }}
                />

                <ScrollView>
                    <Button title=" connect " onPress={() => {
                        //DB.process_fields("users",this.state,"INSERT")
                        DB.connect()
                            .then((res) => {

                                DB.debug();
                                console.log(res)
                            });

                    }}/>
                    <Button title="delete DB" onPress={() => {

                        DB.delete_DB().then(() => {
                            alert("DB Deleted")
                        }).catch((e) => {
                            console.log(e)
                        });

                    }}/>

                    <Button title=" Create tableS" onPress={() => {
                        /*DB.query( DB.process_fields("users",{
                         name:"VARCHAR(50)",
                         age:"INTEGER",
                         job:"VARCHAR(50)",
                         industry:"VARCHAR(50)"
                         },"CREATE")
                         ).then((res)=>{
                         //console.log("result",res)
                         DB.debug();
                         });*/
                        DB.db.sqlBatch(get_DB_schema()).then((res) => {
                            console.log("table creation results", res);


                        }).catch((e) => {
                            console.log(e)
                        });

                    }}/>

                <Button title=" insert" onPress={() => {

                    DB.query(DB.process_fields(DB.posts, dataSchema.posts, "INSERT")).then((res) => {
                        // console.log("result",res)
                        DB.debug();
                    });

                }
                }/>

                <Button title=" update" onPress={() => {

                    let item = {...this.state};

                    //console.log(this.state)
                    DB.update("users", this.state, "id=1").then((res) => {
                        // console.log("result",res)
                        DB.debug();
                    });
                }}/>

                <Button title=" AND " onPress={() => {

                    //console.log(this.state)
                    DB.query(DB.process_fields("users", this.state, "AND")).then(res => {
                        DB.debug();
                        //console.log("result",res);
                    });
                }}/>

                <Button title=" OR " onPress={() => {
                    console.log(this.state);
                    DB.query(DB.process_fields("users", this.state, "OR")).then(res => {
                        DB.debug();
                        //console.log("result",res);
                    });

                }}/>

                <Button title=" query " onPress={() => {
                    //DB.process_fields("users",this.state,"INSERT")
                    DB.query("SELECT * FROM users").then((res) => {
                        DB.debug();
                        console.log(res)
                    })
                    /*.then((res)=>{
                     console.log("result",DB.last_result[DB.num_queries-1])
                     });*/

                }}/>

                <Button title=" replace " onPress={() => {
                    //DB.process_fields("users",this.state,"INSERT")
                    DB.replace("users", this.state, this.state)
                        .then((res) => {
                            DB.debug();
                            console.log(res)
                        });

                }}/>
                <Button title=" get_var " onPress={() => {
                    //DB.process_fields("users",this.state,"INSERT")
                    DB.get_var(null, "name")
                        .then((res) => {
                            //DB.debug();
                            console.log(res);
                        });
                    DB.get_var("SELECT * FROM users", "name")
                        .then((res) => {
                            //DB.debug();
                            console.log("with param", res);
                        });

                }}/>
                <Button title=" get_col " onPress={() => {
                    //DB.process_fields("users",this.state,"INSERT")
                    DB.get_col(null, "name")
                        .then((res) => {

                            //DB.debug();
                            console.log(res)
                        });

                    DB.get_col("SELECT * FROM users", "job",)
                        .then((res) => {

                            // DB.debug();
                            console.log("with param", res)
                        });

                }}/>
                <Button title=" get_row " onPress={() => {
                    //DB.process_fields("users",this.state,"INSERT")
                    DB.get_row(null, 5)
                        .then((res) => {

                            //DB.debug();
                            console.log("with param", res)
                        });
                    DB.get_row()
                        .then((res) => {

                            //DB.debug();
                            console.log(res)
                        });

                }}/>
                <Button title=" get_results " onPress={() => {
                    //DB.process_fields("users",this.state,"INSERT")
                    DB.get_results("SELECT * FROM users")
                        .then((res) => {

                            // DB.debug();
                            console.log("with param", res)
                        });

                    DB.get_results()
                        .then((res) => {

                            //DB.debug();
                            console.log(res)
                        });

                }}/>
                <Button title=" delete " onPress={() => {
                    //DB.process_fields("users",this.state,"INSERT")
                    DB.delete("users", "id=2")
                        .then((res) => {

                            DB.debug();
                            console.log(res)
                        });

                }}/>

                    <Button title=" insert term " onPress={() => {
                        //DB.process_fields("users",this.state,"INSERT")
                        DB.insert_term({
                           // term_id:null,
                            name:"base_app",
                           // slug:null,
                           // term_group:null,
                        })
                            .then((res) => {

                                DB.debug();
                                console.log(res)
                            });

                    }}/>
                    <Button title=" insert post " onPress={() => {
                        //DB.process_fields("users",this.state,"INSERT")
                        DB.insert_post(
                            {
                               // ID:null,
                               // post_author:"",
                               // post_date:"",
                                // post_date_gmt:"" ,
                                post_content:"hello world",
                                post_title:"am title",
                                // post_excerpt:"" ,
                               // post_status:"",
                              //  comment_status:"",
                                //ping_status:"" ,
                                //post_password:"" ,
                             //   post_name:"",
                                // to_ping:"" ,
                                //pinged:"" ,
                             //   post_modified:"",
                                // post_modified_gmt:"",
                              //  post_content_filtered:"",
                             //   post_parent:"",
                              //  guid:"",
                              //  menu_order:"",
                             //   post_type:"",
                            //    post_mime_type:"",
                            //    comment_count:"",
                                //app_id:"",
                            },{category:{
                               // object_id:"",
                                term_taxonomy_id:0,
                                //term_order:"",
                            }}
                        )
                            .then((res) => {

                                DB.debug();
                                console.log(res)
                            });



                        return  this.insert_terms_recursively(dataScheme.locations).then((res)=>{

                            return this.query("SELECT * FROM "+this.terms+" JOIN "+this.term_taxonomy+" ON "+this.term_taxonomy+".term_id="+this.terms+".term_id").then((res)=>{

                                debugger;
                                for(let j=0;j<res.rows.length;j++){
                                    console.log(res.rows.item(j))
                                }
                            })
                        })

                    }}/>

                    <Button title=" insert terms recursively " onPress={() => {
                        //DB.process_fields("users",this.state,"INSERT")




                        DB.insert_terms_recursively(dataSchema.locations,{},{
                           // term_taxonomy_id:"",
                          //  term_id:"",
                            taxonomy:"location",
                          //  description:"",
                           parent:2,
                          //  count:"",
                        }).then((res)=>{

                            return DB.query("SELECT * FROM "+DB.terms+" JOIN "+DB.term_taxonomy+" ON "+DB.term_taxonomy+".term_id="+DB.terms+".term_id").then((res)=>{

                                //debugger;
                                for(let j=0;j<res.rows.length;j++){
                                    console.log(res.rows.item(j))
                                }
                            })
                        })

                    }}/>
            </ScrollView>
    </View>
    )
    }
}

export class SingleOrderView extends Component {

    render() {
        let {navigate, goBack}=this.props.navigation;
        return (
            <View style={{flex: 1}}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
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

 