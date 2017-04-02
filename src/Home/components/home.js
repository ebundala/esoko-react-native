/**
 * Created by ebundala on 3/11/2017.
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
import {Statuses,Menu}  from "../../statuses/components/statuses"
import { StackNavigator } from 'react-navigation';
import styles from "../../styles/styles"
let ctx;
 class homeComponent extends Component{

constructor(props){
    super(props);

}
    static navigationOptions = {
        title: 'Home',

        header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu  onPress={()=>ctx.openDrawer()}/>
            );

            return { right ,left};
        },

    };
    openDrawer(){
        this.props.screenProps.drawer.openDrawer()
    }
    render(){
        ctx=this;
        let {navigate}=this.props.navigation;
        let {queryProducts}=this.props
      return(


             <View >
                 <ScrollView contentContainerStyle={[{flexWrap:"wrap"},styles.horizontal,styles.spaceAround]}>
                 {this.catergories().map((child,i)=>
                 <TouchableNativeFeedback key={i} onPress={() =>queryProducts(child, navigate)}>
                 <View style={[{
                     width:100,
                     height:100,
                     marginVertical:8,
                     borderRadius:5,
                     elevation:2,
                    // backgroundColor:"blue"
                 },
                     //styles.yellow,
                     styles.alignItemsCenter,
                     styles.centerJustified
                 ]}>
                     <Text style={[{width:100,fontSize:12,textAlign:"center"}]}>{child+i}</Text>
                 </View>
                 </TouchableNativeFeedback>
                 )}
                 </ScrollView>

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
const mergeProps=()=>{}


export default home=connect(mapStateToProps,mapDispatchToProps)(homeComponent)







/*
class AllView extends Component{
    static navigationOptions = {
        title: 'allView',
        /!*header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu navigate={navigate}/>
            );

            return { right ,left};
        },*!/

    };
    render(){
        let navigate=this.props.navigation.navigate;
        return(
            <View style={{flex:1,justifyContent:"space-between"}}>
            <Text>AllView</Text>
            <Button title="view One" onPress={()=>navigate("single",{title:"view one"})}/>
                <Button title="view two" onPress={()=>navigate("single",{title:"view two"})}/>
                <Button title="view three" onPress={()=>navigate("single",{title:"view three"})}/>
                <Button title="view four" onPress={()=>navigate("single",{title:"view four"})}/>
        </View>
        )
    }
}

class SingleView extends Component{
    static navigationOptions = {
        title: ({ state, setParams ,navigate}) => {
            return state.params.title
        },
        /!*header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu navigate={navigate}/>
            );

            return { right ,left};
        },*!/

    };
    render(){
        return(
            <View style={{flex:1}}>
                <Text>singleView</Text>
            </View>
        )
    }
}

export const TestPage=StackNavigator({
  all:{screen:AllView}  ,
  single:{screen:SingleView}
},{headerMode:"none"})*/
