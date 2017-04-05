/**
 * Created by ebundala on 4/5/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableNativeFeedback,
    Button,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from  "../../products/products.actions"
import styles from "../../styles/styles"


class navigationViewContainer extends Component{

    constructor(props){
        super(props);

    }


    render(){

        let {queryProducts,root}=this.props;
        let {navigate}=this.props.navigation;
        return(


            <View style={[styles.flex1]}>
                <View style={[styles.flex2,styles.red]}>

                </View>
                <View style={[styles.flex8]}>
                <ScrollView contentContainerStyle={[styles.spaceAround]}>

                    {this.catergories().map((child,i)=>
                        <TouchableNativeFeedback key={i} onPress={() =>{root.closeDrawer();queryProducts(child, navigate)}}>
                            <View style={[{
                                height:50,
                                marginVertical:5,
                                marginHorizontal:5,

                                elevation:1,
                                // backgroundColor:"blue"
                            },
                                //styles.yellow,
                                styles.alignItemsCenter,
                                styles.centerJustified
                            ]}>
                                <Text style={[{fontSize:16,fontWeight:"bold",textAlign:"center"}]}>{child+i}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    )}

                </ScrollView>
                </View>
                <View style={[styles.flex4,styles.yellow]}>

                </View>
            </View>



        )
    }
    catergories(){
        return[
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
        ]
    }

}


const mapStateToProps=(state)=>{
    "use strict";
    return{

    }
}



const mapDispatchToProps=(dispatch)=>{
    "use strict";
    return bindActionCreators(actions,dispatch)
}
//const mergeProps=()=>{}


export default navigationView=connect(mapStateToProps,mapDispatchToProps)(navigationViewContainer)

