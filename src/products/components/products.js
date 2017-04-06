/**
 * Created by ebundala on 3/11/2017.
 */
import React, {Component} from "react";
import { StyleSheet,
    Text, View, ListView,Image,ScrollView, TextInput,
     ViewPagerAndroid,
    TouchableNativeFeedback
} from "react-native";
import {Icon,Card ,Button,Divider} from 'react-native-material-design';
import {StackNavigator} from "react-navigation";
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Statuses,Menu}  from "../../statuses/components/statuses"
import Reviews from "../../reviews/components/reviews";
import Bids from "../../bids/components/bids"
import Chats from "../../chats/components/chats"
import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"
import * as actions from  "../products.actions"
let ctx;
const IMAGES=[
    require("../../pngs/baseball.png"),
    require("../../pngs/bear.png"),
    require("../../pngs/bison.png"),
    require("../../pngs/brooklyn.png"),
    require("../../pngs/delaware.png"),
    require("../../pngs/goldengate.png"),
    require("../../pngs/goldengate2.png"),
    require("../../pngs/grandcanyon.png"),
    require("../../pngs/leonardo_da_vinci_52027-1400x1050.png"),
    require("../../pngs/liberty2.png"),
    require("../../pngs/rockies-1.png"),
    require("../../pngs/rushmore.png"),
    require("../../pngs/salmoncreek.png"),
    require("../../pngs/shuttle.png"),
    require("../../pngs/teton.png"),

]
class ProductsList extends Component {
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return state.params.title
        },
        header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu  onPress={()=>ctx.openDrawer()}/>
            );

            return { right ,left};
        },

    };

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        let {title}=this.props.navigation.state.params;

        let {products}=this.props.screenProps;
        this.state = {
            dataSource: this.ds.cloneWithRows(products)
        }

    }

    render() {
        ctx=this;
        let navigate = this.props.navigation.navigate;
        let {title}=this.props.navigation.state.params;
        let props=this.props.screenProps;

        return (
            <View style={[styles.flex1]}>
                <Card style={[{height:50}]} >
                    <View style={[styles.horizontal]}>
                    <View style={[styles.flex1,styles.centerJustified,styles.alignItemsCenter]}>
                        <Icon name="search" />
                    </View>

                        <View style={[styles.flex9]}>


                            <TextInput
                                ref={component => this.searchInput = component}
                                keyboardType="email-address"
                                style={styles.input}
                                autoCorrect={true}
                                autoCapitalize="none"
                                placeholderTextColor='#a8aAeC'
                                placeholder={"Search "+title}
                                onSubmitEditing={() => {}}
                                onChangeText={query => this.setState({query})}
                            />

                        </View>
                    </View>
                </Card>

                <ListView dataSource={this.state.dataSource}
                          contentContainerStyle={[styles.horizontal,styles.spaceAround,styles.flexWrap]}


                          renderRow={(rowData) =>
                              <TouchableNativeFeedback onPress={() => navigate("singleProduct", {
                                  data: rowData
                              })}>
                                  <View style={[,{
                                      height: 220,
                                      width:180
                                  },

                                  ]}>
                                      <Card style={[styles.flex1]}>

                                          <View style={[styles.flex1]}>
                                              <Image  style={[{marginTop:16,marginBottom:8,width:132,height:132,resizeMode:Image.resizeMode.stretch}]}
                                                      source={rowData.photos[0].url}>

                                              </Image>
                                              <View style={[styles.spaceAround,styles.alignItemsCenter,{height:40}]}>
                                                  <View style={[]}>
                                                      <Text>{rowData.title}</Text>
                                                  </View>
                                                  <View style={[]}>
                                                      <Text>
                                                          {rowData.currency} {rowData.price}
                                                          </Text>
                                                  </View>
                                              </View>
                                          </View>

                                          {false&& <View>
                                      <View style={[styles.horizontal,styles.alignItemsCenter,styles.flexStart]}>
                                          <Icon size={14} name="update"  />
                                          <Text style={[{fontSize: 10,marginHorizontal:5}]}>{rowData.postedOn}</Text>

                                      </View>
                                      <View style={[styles.horizontal,styles.flex1,{margin:5}]}>

                                          <View ref="detail" style={[styles.flex8,]}>
                                              <View style={[styles.horizontal,]}>
                                                  <Text style={[{fontSize: 16,fontWeight:"bold"}]}>{rowData.title}</Text>
                                              </View>
                                              <View style={[styles.flex1,{marginVertical:5,overflow:"hidden",backgroundColor:"white"}]}>
                                                  <Text style={[{fontSize: 12,textAlign:"left"}]}>{rowData.description}</Text>
                                              </View>
                                              <View >
                                                  <Text style={[{fontSize: 14,fontWeight:"bold",color:"orange"}]}>{"Price "+rowData.price}</Text>
                                              </View>

                                          </View>
                                          <View ref="photo" style={[styles.flex4,styles.yellow,{elevation:2}]}>

                                          </View>
                                      </View>
                                      <View style={[styles.horizontal,styles.spaceAround,{elevation:5,backgroundColor:"lime"}]}>

                                          <TouchableNativeFeedback  title={"review "}
                                                  onPress={() => props.reviewProduct(rowData,navigate)}>
                                              <View>
                                                  <Text>
                                                      review
                                                  </Text>
                                              </View>
                                          </TouchableNativeFeedback>
                                          <TouchableNativeFeedback  title={"Bids "}
                                                  onPress={() => props.placeBid(rowData,navigate)}>
                                              <View>
                                                  <Text>
                                                      Bids
                                                  </Text>
                                              </View>
                                          </TouchableNativeFeedback>
                                          <TouchableNativeFeedback
                                                  onPress={() =>props.startChat(rowData,navigate)}>
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
                                                  onPress={() =>props.addProduct(rowData,navigate)}/>
                                          <Button title={"edit Product "}
                                                  onPress={() =>props.editProduct(rowData,navigate)}/>

                                      </View>}
                                      </Card>
                                  </View>
                              </TouchableNativeFeedback>}
                />


            </View>
        )
    }
    componentWillUpdate(){

    }
    openDrawer(){
        this.props.screenProps.drawer.openDrawer()
    }
}

class SingleProductView extends Component {
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return state.params.data.title
        },
        /*header: ({ state, setParams ,navigate}) => {
         let  right=(<Statuses navigate={navigate}/>
         );
         let  left=(<Menu navigate={navigate}/>
         );

         return { right ,left};
         },*/

    };

    render() {
        let navigate = this.props.navigation.navigate;
        let {data}=this.props.navigation.state.params;
        let props=this.props.screenProps;
        return (
            <View style={[styles.flex1]}>

                <Card ref="CTA" style={[styles.horizontal,styles.spaceAround]}>

                    <Button text={"Review "}
                            onPress={() => props.reviewProduct(data,navigate)}/>
                    <Button text={"Bids "}
                            onPress={() => props.placeBid(data,navigate)}/>
                    <Button text={"Chats "}
                            onPress={() =>props.startChat(data,navigate)}/>

                </Card>



                <ScrollView contentContainerStyle={[]}>
                    <View >
                    <Card ref="mainCard" style={[{height:360}]}>
                        <View style={[styles.flex8,{marginVertical:8}]}>
                        <ViewPagerAndroid
                            keyboardDismissMode='on-drag'
                            initialPage={0}
                            scrollEnabled={true}

                            style={{flex: 1}}
                            ref={(el) => this._viewPager = el}>
                            {this._renderImages().map((child, i) => (
                                <View
                                    key={"key" + i}
                                    testID={"test" + i}
                                    style={[styles.flex1,{backgroundColor:"rgb("+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+")"}]}>
                                    <Image  style={[styles.flex1,{width:null,height:null,resizeMode:Image.resizeMode.cover}]}
                                            source={data.photos[i].url}>
                                        <Text>{child.name}</Text>
                                    </Image>
                                </View>
                            ))}
                        </ViewPagerAndroid>
                        </View>
                        <View style={[styles.flex2,styles.horizontal,]}>
                            <View style={[styles.flex8,styles.centerJustified]}>
                                <View style={[styles.horizontal]}>
                                    <Text style={[colorStyle.paperGrey800,{fontSize:14,fontWeight:"bold"}]}>
                                        {data.title}
                                    </Text>
                                </View>

                            </View>
                            <View style={[styles.flex4,styles.centerJustified,styles.alignItemsCenter,{backgroundColor:colours.paperYellow400.color,borderRadius:8,margin:8}]}>
                                < View style={[styles.horizontal]}>
                                    <Text style={[colorStyle.paperBlue900,{fontSize:14,fontWeight:"bold",textAlign:"center"}]}>
                                        {data.currency} {data.price}

                                    </Text>
                                </View>
                            </View>

                        </View>

                    </Card>
                    <Card ref="description" style={[styles.flex1,{minHeight:50}]}>

                        <View style={[styles.flex1]}>
                            <Text style={[typographyStyle.paperFontTitle]}>
                                Description

                            </Text>
                            <Divider/>
                            <Text style={[typographyStyle.paperFontBody1]}>
                                {data.description}

                            </Text>

                        </View>




                    </Card>
                    <Card ref="reviews" style={[{minHeight:50}]}>
                            <Text style={[typographyStyle.paperFontTitle]}>
                                Reviews
                            </Text>
                        <Divider/>
                        <Text style={[typographyStyle.paperFontBody1]}>
                            {data.description}

                        </Text>
                        <Text style={[typographyStyle.paperFontBody1]}>
                            {data.description}

                        </Text>
                        <Text style={[typographyStyle.paperFontBody1]}>
                            {data.description}

                        </Text>
                            <Divider/>
                        </Card>

                    </View>
                </ScrollView>






            </View>
        )
    }
    _renderImages(){
        let {data}=this.props.navigation.state.params
        if(data.hasOwnProperty("photos")){
            if(data.photos instanceof Array){
                return data.photos;
            }
        }
        return[
            "hello",
            "world",
            "mick",
            "mill",
            "youi",
            "alt"
        ]
    }
}

const productsStack = StackNavigator({
    allProducts: {screen: ProductsList},
    singleProduct: {screen: SingleProductView},
    // productReviews:{screen:Reviews},
    //productBids:{screen:Bids},
    // productChats:{screen:Chats},
    addProduct: {screen: ProductsList},
    editProduct: {screen: ProductsList}
}, {headerMode: "none"})

const mapDispatchToProps=(dispatch)=>{

    "use strict";
    return bindActionCreators(actions,dispatch)

}

const mapStateToProps=(state)=>{
    "use strict";
    return{
        products:state.products
    }

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

const products=connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(productsStack);
export default products;


