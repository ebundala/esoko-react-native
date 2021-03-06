/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableNativeFeedback,
    ScrollView,
    TextInput,
    ListView,
    Image
} from 'react-native';
import {Card,Divider} from 'react-native-material-design';
import { Toolbar,Icon,} from 'react-native-material-ui';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from  "../../products/products.actions"
import {Statuses}  from "../../statuses/components/statuses"

import styles, {typographyStyle,colorStyle,colours} from "../../styles/styles"
let ctx;
 class homeComponent extends Component {

   constructor(props){
    super(props);
       this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
       this.state={query:null}
}

    openDrawer(){
        this.props.screenProps.drawer.openDrawer()
    }
    render(){
        ctx=this;
        let {navigate}=this.props.navigation;
        let {queryProducts,searchProducts,products,popular,newest,cheapest}=this.props;

      return(


             <View style={[styles.flex1]}>
                 <Toolbar
                     leftElement="menu"
                     onLeftElementPress={()=>{
                         this.openDrawer();
                     }}
                     centerElement="Home"
                     rightElement={<Statuses
                             color={colours.paperGrey50.color} navigate={navigate}/>
                         }
                 />


                 <ScrollView contentContainerStyle={[]}>
                     <View style={[{height:160,marginHorizontal:0,padding:0,elevation:5}]}>
                         <Image style={[styles.flex1,{resizeMode:Image.resizeMode.cover,margin:0}]} source={require("../../pngs/background.png")}>

                         </Image>
                     </View>
                     <View style={[{marginVertical:8}]}>
                         <Card style={[{height:50}]} >
                             <View style={[styles.horizontal]}>
                                 <View style={[styles.flex9]}>


                                     <TextInput
                                         ref={component => this.searchInput = component}
                                         keyboardType="web-search"
                                         style={styles.input}
                                         autoCorrect={true}
                                         autoCapitalize="none"
                                         placeholderTextColor={colours.paperGrey500.color}
                                         placeholder={"Search "}
                                         underlineColorAndroid="transparent"
                                         onSubmitEditing={(e) => {
                                             if(this.state.query) {
                                                 this.searchInput.blur();
                                                 searchProducts(this.state.query, "all", navigate)
                                             }
                                             else
                                                 this.searchInput.focus();
                                         }}
                                         onChangeText={query => this.setState({query})}
                                     />

                                 </View>
                                 <TouchableNativeFeedback onPress={()=>{
                                     if(this.state.query) {
                                         this.searchInput.blur();
                                         searchProducts(this.state.query,"all",navigate)

                                     }
                                     else
                                         this.searchInput.focus();
                                 }}>
                                     <View style={[styles.flex1,styles.centerJustified,styles.alignItemsCenter]}>
                                         <Icon name="search" />
                                     </View>
                                 </TouchableNativeFeedback>
                             </View>
                         </Card>
                         <View style={[{marginVertical:16}]}>
                         <Divider style={{marginHorizontal:140,height:2}}/>
                         <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified,{padding:8}]}>
                         <Text style={[styles.title]}>POPULAR PRODUCTS</Text>
                         </View>
                         <Divider style={{marginHorizontal:140,height:2}}/>
                         </View>
                         <ListView dataSource={this.ds.cloneWithRows(popular)}
                                   contentContainerStyle={[styles.horizontal,styles.spaceAround,styles.flexWrap]}
                                   scrollRenderAheadDistanceh={640}
                                   enableEmptySections={true}
                                   horizontal={true}
                                   renderRow={(data) =>
                                       <TouchableNativeFeedback onPress={() => {

                                           navigate("singleProduct", {
                                           data: data
                                       })}}>
                                           <View style={[,{
                                               height: 220,
                                               width:180
                                           },

                                           ]}>
                                               <Card style={[styles.flex1]}>

                                                   <View style={[styles.flex1]}>
                                                       <Image  style={[{
                                                           marginTop:16
                                                           ,marginBottom:8,
                                                           width:132,
                                                           height:132,
                                                           resizeMode:Image.resizeMode.stretch,
                                                           backgroundColor:colours.paperGrey300.color
                                                       }]}
                                                               source={{uri:data.photos[0].downloadUrl}}>

                                                       </Image>
                                                       <View style={[styles.spaceAround,styles.alignItemsCenter,{height:40}]}>
                                                           <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                               <Text style={[styles.productTitle]}>
                                                                   {data.name}
                                                                   </Text>
                                                           </View>
                                                           <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                               <Text style={[styles.currency]}>
                                                                   {data.currency}
                                                               </Text>
                                                               <Text style={[styles.price]}>
                                                                   {data.price}
                                                               </Text>
                                                           </View>
                                                       </View>
                                                   </View>




                                               </Card>
                                           </View>
                                       </TouchableNativeFeedback>}
                         />
                         <View style={[{marginVertical:16}]}>
                         <Divider style={{marginHorizontal:140,height:2}}/>
                         <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified,{padding:8}]}>
                             <Text style={[styles.title]}>NEWEST PRODUCTS</Text>
                         </View>
                         <Divider style={{marginHorizontal:140,height:2}}/>
                         </View>
                         <ListView dataSource={this.ds.cloneWithRows(newest)}
                                   contentContainerStyle={[styles.horizontal,styles.spaceAround,styles.flexWrap]}
                                   scrollRenderAheadDistance={640}
                                   enableEmptySections={true}
                                   horizontal={true}
                                   renderRow={(data) =>
                                       <TouchableNativeFeedback onPress={() => navigate("singleProduct", {
                                           data: data
                                       })}>
                                           <View style={[,{
                                               height: 220,
                                               width:180
                                           },

                                           ]}>
                                               <Card style={[styles.flex1]}>

                                                   <View style={[styles.flex1]}>
                                                       <Image  style={[{marginTop:16,
                                                           marginBottom:8,width:132,height:132,
                                                           resizeMode:Image.resizeMode.stretch,
                                                           backgroundColor:colours.paperGrey300.color
                                                       }]}
                                                               source={{uri:data.photos[0].downloadUrl}}>

                                                       </Image>
                                                       <View style={[styles.spaceAround,styles.alignItemsCenter,{height:40}]}>
                                                           <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                               <Text style={[styles.productTitle]}>
                                                                   {data.name}
                                                               </Text>
                                                           </View>
                                                           <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                               <Text style={[styles.currency]}>
                                                                   {data.currency}
                                                               </Text>
                                                               <Text style={[styles.price]}>
                                                                   {data.price}
                                                               </Text>
                                                           </View>
                                                       </View>
                                                   </View>




                                               </Card>
                                           </View>
                                       </TouchableNativeFeedback>}
                         />
                         <View style={[{marginVertical:16}]}>
                         <Divider style={{marginHorizontal:140,height:2}}/>
                          <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified,{padding:8}]}>
                             <Text style={[styles.title]}>CHEAPEST PRODUCTS</Text>
                         </View>
                         <Divider style={{marginHorizontal:140,height:2}}/>
                         </View>
                         <ListView dataSource={this.ds.cloneWithRows(cheapest)}
                                   contentContainerStyle={[styles.horizontal,styles.spaceAround,styles.flexWrap]}
                                   scrollRenderAheadDistance={640}
                                   enableEmptySections={true}
                                   horizontal={true}
                                   renderRow={(data) =>
                                       <TouchableNativeFeedback onPress={() => navigate("singleProduct", {
                                           data: data
                                       })}>
                                           <View style={[,{
                                               height: 220,
                                               width:180
                                           },

                                           ]}>
                                               <Card style={[styles.flex1]}>

                                                   <View style={[styles.flex1]}>
                                                       <Image  style={[{marginTop:16,
                                                           marginBottom:8,width:132,height:132,
                                                           resizeMode:Image.resizeMode.stretch,
                                                           backgroundColor:colours.paperGrey300.color
                                                       }]}
                                                               source={{uri:data.photos[0].downloadUrl}}>

                                                       </Image>
                                                       <View style={[styles.spaceAround,styles.alignItemsCenter,{height:40}]}>
                                                           <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                               <Text style={[styles.productTitle]}>
                                                                   {data.name}
                                                               </Text>
                                                           </View>
                                                           <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                               <Text style={[styles.currency]}>
                                                                   {data.currency}
                                                               </Text>
                                                               <Text style={[styles.price]}>
                                                                   {data.price}
                                                               </Text>
                                                           </View>
                                                       </View>
                                                   </View>




                                               </Card>
                                           </View>
                                       </TouchableNativeFeedback>}
                         />

                     </View>
                 </ScrollView>

             </View>


      )
    }

}


const mapStateToProps=(state)=>{
    "use strict";
    return{
popular:state.products,
cheapest:state.products,
newest:state.products


    }
}



const mapDispatchToProps=(dispatch)=>{
    "use strict";
    return bindActionCreators(actions,dispatch)
}
const mergeProps = (stateProps, dispatchProp, ownProps) => {

    return {
        ...ownProps,
        screenProps: {
            ...ownProps.screenProps,
            ...stateProps,
            ...dispatchProp,

        }
    }
}


export default home=connect(mapStateToProps,mapDispatchToProps)(homeComponent)







