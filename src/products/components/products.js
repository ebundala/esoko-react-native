/**
 * Created by ebundala on 3/11/2017.
 */
import React, {Component} from "react";
import {
    Text, View, Button, ListView,

    TouchableNativeFeedback
} from "react-native";
import {StackNavigator} from "react-navigation";
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import Reviews from "../../reviews/components/reviews";
import Bids from "../../bids/components/bids"
import Chats from "../../chats/components/chats"
import styles from "../../styles/styles"
import * as actions from  "../products.actions"
class ProductsList extends Component {
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return state.params.title
        }
        /*header: ({ state, setParams ,navigate}) => {
         let  right=(<Statuses navigate={navigate}/>
         );
         let  left=(<Menu navigate={navigate}/>
         );

         return { right ,left};
         },*/

    };

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        let {title}=this.props.navigation.state.params;

        let {products}=this.props.screenProps;
        this.state = {
            dataSource: this.ds.cloneWithRows(products)
        }

    }

    render() {
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

                                      height: 100,
                                      marginVertical: 8,
                                      borderRadius: 8,
                                      elevation: 2,
                                      // backgroundColor:"blue"
                                  },
                                      //styles.yellow,
                                      styles.alignItemsCenter,
                                      styles.centerJustified
                                  ]}>
                                      <Text style={[{width: 100, fontSize: 12, textAlign: "center"}]}>{rowData.title}</Text>
                                      <View style={[styles.horizontal]}>

                                          <Button title={"review "}
                                                  onPress={() => props.reviewProduct(rowData,navigate)}/>
                                          <Button title={"Bids "}
                                                  onPress={() => props.placeBid(rowData,navigate)}/>
                                          <Button title={"Chats "}
                                                  onPress={() =>props.startChat(rowData,navigate)}/>


                                      </View>
                                      <View style={[styles.horizontal]}>


                                          <Button title={"add Product "}
                                                  onPress={() =>props.addProduct(rowData,navigate)}/>
                                          <Button title={"edit Product "}
                                                  onPress={() =>props.editProduct(rowData,navigate)}/>

                                      </View>
                                  </View>
                              </TouchableNativeFeedback>



                          }
                />


            </View>
        )
    }
    componentWillUpdate(){

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
        let {data}=this.props.navigation.state.params
        let props=this.props.screenProps;
        return (
            <View style={{flex: 1, justifyContent: "space-around"}}>
                <Text>singleView</Text>
                <Button title={"review "}
                        onPress={() => props.reviewProduct(data,navigate)}/>
                <Button title={"Bids "}
                        onPress={() => props.placeBid(data,navigate)}/>
                <Button title={"Chats "}
                        onPress={() =>props.startChat(data,navigate)}/>

            </View>
        )
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


