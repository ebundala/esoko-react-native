/**
 * Created by ebundala on 4/5/2017.
 */
import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableNativeFeedback,
    Button,
    ScrollView
} from 'react-native';
import {Divider} from "react-native-material-design"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from  "../../products/products.actions"
import styles from "../../styles/styles"


class navigationViewContainer extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        let {queryProducts, root}=this.props;
        let {navigate}=this.props.navigation;
        return (


            <View style={[styles.flex1]}>
                <View style={[styles.flex2, styles.centerJustified]}>
                    <View style={[styles.flexStart, styles.yellow, {
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        marginHorizontal: 16
                    }]}>

                    </View>
                </View>
                <Divider/>
                <View style={[styles.flex8]}>
                    <ScrollView contentContainerStyle={[styles.spaceAround]}>

                        {this.catergories().map((child, i) =>
                            <TouchableNativeFeedback key={i} onPress={() => {
                                root.closeDrawer();
                                setTimeout(()=>{
                                queryProducts(child, navigate)
                                },16)
                            }}>
                                <View style={[{
                                    height: 50,
                                    marginVertical: 5,
                                    //marginHorizontal:16,

                                    // elevation:2,
                                    //backgroundColor:"lime"
                                },
                                    //styles.yellow,
                                    //styles.alignItemsCenter,
                                    styles.centerJustified
                                ]}>
                                    <Text style={[{
                                        fontSize: 14,
                                        paddingHorizontal: 16,
                                        fontWeight:"400",
                                    }]}>{child}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        )}

                    </ScrollView>

                </View>
                <Divider/>
                <View style={[styles.flex3, styles.spaceAround, {}]}>
                    <TouchableNativeFeedback onPress={() => {
                        root.closeDrawer();

                        navigate("createProduct")
                    }}>
                        <View style={[]}>
                            <Text style={[{fontSize: 16, paddingHorizontal: 16, fontWeight: "bold",}]}>Sell product</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => {root.closeDrawer();}}>
                    <View style={[]}>
                         <Text style={[{fontSize: 16, paddingHorizontal: 16, fontWeight: "bold",}]}>Settings</Text>
                    </View>
                </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => {root.goToAccount();}}>
                    <View style={[]}>
                     <Text style={[{fontSize: 16, paddingHorizontal: 16, fontWeight: "bold",}]}>Account</Text>
                    </View>
                    </TouchableNativeFeedback>

                </View>
            </View>



        )
    }

    catergories() {
        return [
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


const mapStateToProps = (state) => {
    "use strict";
    return {}
}


const mapDispatchToProps = (dispatch) => {
    "use strict";
    return bindActionCreators(actions, dispatch)
}
//const mergeProps=()=>{}


export default navigationView = connect(mapStateToProps, mapDispatchToProps)(navigationViewContainer)

