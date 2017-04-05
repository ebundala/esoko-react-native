/**
 * Created by ebundala on 3/11/2017.
 */
import React, {Component} from "react";
import {
    Text, View, Button, ListView,Image,ScrollView,
ViewPagerAndroid,
    TouchableNativeFeedback
} from "react-native";
import {Icon,Card } from 'react-native-material-design';
import {StackNavigator} from "react-navigation";
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Statuses,Menu}  from "../../statuses/components/statuses"
import Reviews from "../../reviews/components/reviews";
import Bids from "../../bids/components/bids"
import Chats from "../../chats/components/chats"
import styles from "../../styles/styles"
import * as actions from  "../products.actions"
let ctx;
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
            <View style={{flex: 1}}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={(rowData) =>

                              <TouchableNativeFeedback onPress={() => navigate("singleProduct", {
                                  data: rowData
                              })}>
                                  <View style={[{

                                      height: 160,
                                      marginVertical: 4,
                                      marginHorizontal:8,

                                     // borderRadius: 8,
                                      elevation: 1,
                                      backgroundColor:"white"

                                  },
                                      //styles.yellow,
                                      //styles.alignItemsStart,
                                      //styles.centerJustified
                                      //styles.alignItemsStretch
                                  ]}>
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
                                      {false&&<View style={[styles.horizontal]}>


                                          <Button title={"add Product "}
                                                  onPress={() =>props.addProduct(rowData,navigate)}/>
                                          <Button title={"edit Product "}
                                                  onPress={() =>props.editProduct(rowData,navigate)}/>

                                      </View>}
                                  </View>
                              </TouchableNativeFeedback>



                          }
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
                <View style={[styles.horizontal,styles.spaceAround,{marginVertical:8}]}>

                    <Button title={"review "}
                            onPress={() => props.reviewProduct(data,navigate)}/>
                    <Button title={"Bids "}
                            onPress={() => props.placeBid(data,navigate)}/>
                    <Button title={"Chats "}
                            onPress={() =>props.startChat(data,navigate)}/>

                </View>

                <ScrollView contentContainerStyle={[styles.flex1]}>

                    <Card style={[styles.flex8,]}>
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
                                    style={[styles.flex1,{
                                        backgroundColor:"rgb("+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+")"}]}>
                                    <Image style={[styles.flex1,{width:null,height:null}]} source={{uri:child.url}}>
                                        <Text>{child.name}</Text>
                                    </Image>
                                </View>
                            ))}
                        </ViewPagerAndroid>
                        </View>
                        <View style={[styles.flex2,styles.horizontal,]}>
                            <View style={[styles.flex8,styles.centerJustified]}>
                                <View style={[styles.horizontal]}>
                                    <Text style={[{fontSize:14,fontWeight:"bold",color:"black"}]}>
                                        {data.title}
                                    </Text>
                                </View>

                            </View>
                            <View style={[styles.flex4,styles.centerJustified,styles.alignItemsCenter,{backgroundColor:"silver",borderRadius:8,margin:8}]}>
                                < View style={[styles.horizontal,]}>
                                    <Text style={[{fontSize:14,color:"white",fontWeight:"bold",textAlign:"center"}]}>
                                        {"TZS "+data.price}

                                    </Text>
                                </View>
                            </View>

                        </View>

                    </Card>
                    {true&&<Card style={[styles.flex3,{marginHorizontal:5}]}>

                        <View style={[styles.flex1,{marginVertical:20}]}>
                            <Text style={[{fontSize:16}]}>
                                {data.description}

                            </Text>
                        </View>




                    </Card>}
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


