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
import {Icon,Card ,Button,Divider} from 'react-native-material-design';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from  "../../products/products.actions"
import {Statuses,Menu}  from "../../statuses/components/statuses"

import styles, {typographyStyle,colorStyle,colours} from "../../styles/styles"
let ctx;
 class homeComponent extends Component {

   constructor(props){
    super(props);
       this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});

}
    static navigationOptions = {
        title: 'Home',

        header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu  onPress={()=>ctx.openDrawer()}/>
            );
          //let style={backgroundColor:colours.paperBlue500.color,color:"#323c3f"}
            return { right ,left};
        },

    };
    openDrawer(){
        this.props.screenProps.drawer.openDrawer()
    }
    render(){
        ctx=this;
        let {navigate}=this.props.navigation;
        let {queryProducts,products}=this.props;

      return(


             <View style={[styles.flex1]}>
                 <ScrollView contentContainerStyle={[]}>
                     <View style={[{height:160,marginHorizontal:0,padding:0,elevation:5}]}>
                         <Image style={[styles.flex1,{resizeMode:Image.resizeMode.cover,margin:0}]} source={{uri:"http://10.0.2.2:3000/grandcanyon.png"}}>

                         </Image>
                     </View>
                     <View style={[{marginVertical:8}]}>
                         <Card style={[{height:50}]} >
                             <View style={[styles.horizontal]}>
                                 <View style={[styles.flex1,styles.centerJustified,styles.alignItemsCenter]}>
                                     <Icon name="search" />
                                 </View>

                                 <View style={[styles.flex9]}>


                                     <TextInput
                                         ref={component => this.searchInput = component}
                                         keyboardType="web-search"
                                         style={styles.input}
                                         autoCorrect={true}
                                         autoCapitalize="none"
                                         placeholderTextColor='#a8aAeC'
                                         placeholder={"Search "}
                                         onSubmitEditing={(query) => {
                                             //props.searchProducts(this.state.query,title,navigate)
                                         }}
                                         onChangeText={query => this.setState({query})}
                                     />

                                 </View>
                             </View>
                         </Card>
                         <View style={[{marginVertical:16}]}>
                         <Divider style={[{marginHorizontal:140,height:2}]}/>
                         <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified,{padding:8}]}>
                         <Text style={[typographyStyle.paperFontTitle,styles.title]}>POPULAR PRODUCTS</Text>
                         </View>
                         <Divider style={[{marginHorizontal:140,height:2}]}/>
                         </View>
                         <ListView dataSource={this.ds.cloneWithRows(products)}
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
                                                       <Image  style={[{marginTop:16,marginBottom:8,width:132,height:132,resizeMode:Image.resizeMode.stretch}]}
                                                               source={{uri:data.photos[0].url}}>

                                                       </Image>
                                                       <View style={[styles.spaceAround,styles.alignItemsCenter,{height:40}]}>
                                                           <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                               <Text style={[styles.productTitle]}>
                                                                   {data.title}
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

                                                   {false&& <View>
                                                       <View style={[styles.horizontal,styles.alignItemsCenter,styles.flexStart]}>
                                                           <Icon size={14} name="update"  />
                                                           <Text style={[{fontSize: 10,marginHorizontal:5}]}>{data.postedOn}</Text>

                                                       </View>
                                                       <View style={[styles.horizontal,styles.flex1,{margin:5}]}>

                                                           <View ref="detail" style={[styles.flex8,]}>
                                                               <View style={[styles.horizontal,]}>
                                                                   <Text style={[{fontSize: 16,fontWeight:"bold"}]}>{data.title}</Text>
                                                               </View>
                                                               <View style={[styles.flex1,{marginVertical:5,overflow:"hidden",backgroundColor:"white"}]}>
                                                                   <Text style={[{fontSize: 12,textAlign:"left"}]}>{data.description}</Text>
                                                               </View>
                                                               <View >
                                                                   <Text style={[{fontSize: 14,fontWeight:"bold",color:"orange"}]}>{"Price "+data.price}</Text>
                                                               </View>

                                                           </View>
                                                           <View ref="photo" style={[styles.flex4,styles.yellow,{elevation:2}]}>

                                                           </View>
                                                       </View>
                                                       <View style={[styles.horizontal,styles.spaceAround,{elevation:5,backgroundColor:"lime"}]}>

                                                           <TouchableNativeFeedback  title={"review "}
                                                                                     onPress={() => props.reviewProduct(data,navigate)}>
                                                               <View>
                                                                   <Text>
                                                                       review
                                                                   </Text>
                                                               </View>
                                                           </TouchableNativeFeedback>
                                                           <TouchableNativeFeedback  title={"Bids "}
                                                                                     onPress={() => props.placeBid(data,navigate)}>
                                                               <View>
                                                                   <Text>
                                                                       Bids
                                                                   </Text>
                                                               </View>
                                                           </TouchableNativeFeedback>
                                                           <TouchableNativeFeedback
                                                               onPress={() =>props.startChat(data,navigate)}>
                                                               <View>
                                                                   <Text>
                                                                       Chats
                                                                   </Text>
                                                               </View>
                                                           </TouchableNativeFeedback>


                                                       </View>
                                                   </View>}

                                                   {false&&<View style={[styles.horizontal]}>


                                                       <Button title={"add Product "}
                                                               onPress={() =>props.addProduct(data,navigate)}/>
                                                       <Button title={"edit Product "}
                                                               onPress={() =>props.editProduct(data,navigate)}/>

                                                   </View>}
                                               </Card>
                                           </View>
                                       </TouchableNativeFeedback>}
                         />
                         <View style={[{marginVertical:16}]}>
                         <Divider style={[{marginHorizontal:140,height:2}]}/>
                         <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified,{padding:8}]}>
                             <Text style={[typographyStyle.paperFontTitle,styles.title]}>NEWEST PRODUCTS</Text>
                         </View>
                         <Divider style={[{marginHorizontal:140,height:2}]}/>
                         </View>
                         <ListView dataSource={this.ds.cloneWithRows(products)}
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
                                                       <Image  style={[{marginTop:16,marginBottom:8,width:132,height:132,resizeMode:Image.resizeMode.stretch}]}
                                                               source={{uri:data.photos[0].url}}>

                                                       </Image>
                                                       <View style={[styles.spaceAround,styles.alignItemsCenter,{height:40}]}>
                                                           <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                               <Text style={[styles.productTitle]}>
                                                                   {data.title}
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

                                                   {false&& <View>
                                                       <View style={[styles.horizontal,styles.alignItemsCenter,styles.flexStart]}>
                                                           <Icon size={14} name="update"  />
                                                           <Text style={[{fontSize: 10,marginHorizontal:5}]}>{data.postedOn}</Text>

                                                       </View>
                                                       <View style={[styles.horizontal,styles.flex1,{margin:5}]}>

                                                           <View ref="detail" style={[styles.flex8,]}>
                                                               <View style={[styles.horizontal,]}>
                                                                   <Text style={[{fontSize: 16,fontWeight:"bold"}]}>{data.title}</Text>
                                                               </View>
                                                               <View style={[styles.flex1,{marginVertical:5,overflow:"hidden",backgroundColor:"white"}]}>
                                                                   <Text style={[{fontSize: 12,textAlign:"left"}]}>{data.description}</Text>
                                                               </View>
                                                               <View >
                                                                   <Text style={[{fontSize: 14,fontWeight:"bold",color:"orange"}]}>{"Price "+data.price}</Text>
                                                               </View>

                                                           </View>
                                                           <View ref="photo" style={[styles.flex4,styles.yellow,{elevation:2}]}>

                                                           </View>
                                                       </View>
                                                       <View style={[styles.horizontal,styles.spaceAround,{elevation:5,backgroundColor:"lime"}]}>

                                                           <TouchableNativeFeedback  title={"review "}
                                                                                     onPress={() => props.reviewProduct(data,navigate)}>
                                                               <View>
                                                                   <Text>
                                                                       review
                                                                   </Text>
                                                               </View>
                                                           </TouchableNativeFeedback>
                                                           <TouchableNativeFeedback  title={"Bids "}
                                                                                     onPress={() => props.placeBid(data,navigate)}>
                                                               <View>
                                                                   <Text>
                                                                       Bids
                                                                   </Text>
                                                               </View>
                                                           </TouchableNativeFeedback>
                                                           <TouchableNativeFeedback
                                                               onPress={() =>props.startChat(data,navigate)}>
                                                               <View>
                                                                   <Text>
                                                                       Chats
                                                                   </Text>
                                                               </View>
                                                           </TouchableNativeFeedback>


                                                       </View>
                                                   </View>}

                                                   {false&&<View style={[styles.horizontal]}>


                                                       <Button title={"add Product "}
                                                               onPress={() =>props.addProduct(data,navigate)}/>
                                                       <Button title={"edit Product "}
                                                               onPress={() =>props.editProduct(data,navigate)}/>

                                                   </View>}
                                               </Card>
                                           </View>
                                       </TouchableNativeFeedback>}
                         />
                         <View style={[{marginVertical:16}]}>
                         <Divider style={[{marginHorizontal:140,height:2}]}/>
                          <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified,{padding:8}]}>
                             <Text style={[typographyStyle.paperFontTitle,styles.title]}>CHEAPEST PRODUCTS</Text>
                         </View>
                         <Divider style={[{marginHorizontal:140,height:2}]}/>
                         </View>
                         <ListView dataSource={this.ds.cloneWithRows(products)}
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
                                                       <Image  style={[{marginTop:16,marginBottom:8,width:132,height:132,resizeMode:Image.resizeMode.stretch}]}
                                                               source={{uri:data.photos[0].url}}>

                                                       </Image>
                                                       <View style={[styles.spaceAround,styles.alignItemsCenter,{height:40}]}>
                                                           <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                               <Text style={[styles.productTitle]}>
                                                                   {data.title}
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

                                                   {false&& <View>
                                                       <View style={[styles.horizontal,styles.alignItemsCenter,styles.flexStart]}>
                                                           <Icon size={14} name="update"  />
                                                           <Text style={[{fontSize: 10,marginHorizontal:5}]}>{data.postedOn}</Text>

                                                       </View>
                                                       <View style={[styles.horizontal,styles.flex1,{margin:5}]}>

                                                           <View ref="detail" style={[styles.flex8,]}>
                                                               <View style={[styles.horizontal,]}>
                                                                   <Text style={[{fontSize: 16,fontWeight:"bold"}]}>{data.title}</Text>
                                                               </View>
                                                               <View style={[styles.flex1,{marginVertical:5,overflow:"hidden",backgroundColor:"white"}]}>
                                                                   <Text style={[{fontSize: 12,textAlign:"left"}]}>{data.description}</Text>
                                                               </View>
                                                               <View >
                                                                   <Text style={[{fontSize: 14,fontWeight:"bold",color:"orange"}]}>{"Price "+data.price}</Text>
                                                               </View>

                                                           </View>
                                                           <View ref="photo" style={[styles.flex4,styles.yellow,{elevation:2}]}>

                                                           </View>
                                                       </View>
                                                       <View style={[styles.horizontal,styles.spaceAround,{elevation:5,backgroundColor:"lime"}]}>

                                                           <TouchableNativeFeedback  title={"review "}
                                                                                     onPress={() => props.reviewProduct(data,navigate)}>
                                                               <View>
                                                                   <Text>
                                                                       review
                                                                   </Text>
                                                               </View>
                                                           </TouchableNativeFeedback>
                                                           <TouchableNativeFeedback  title={"Bids "}
                                                                                     onPress={() => props.placeBid(data,navigate)}>
                                                               <View>
                                                                   <Text>
                                                                       Bids
                                                                   </Text>
                                                               </View>
                                                           </TouchableNativeFeedback>
                                                           <TouchableNativeFeedback
                                                               onPress={() =>props.startChat(data,navigate)}>
                                                               <View>
                                                                   <Text>
                                                                       Chats
                                                                   </Text>
                                                               </View>
                                                           </TouchableNativeFeedback>


                                                       </View>
                                                   </View>}

                                                   {false&&<View style={[styles.horizontal]}>


                                                       <Button title={"add Product "}
                                                               onPress={() =>props.addProduct(data,navigate)}/>
                                                       <Button title={"edit Product "}
                                                               onPress={() =>props.editProduct(data,navigate)}/>

                                                   </View>}
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
products:state.products
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







