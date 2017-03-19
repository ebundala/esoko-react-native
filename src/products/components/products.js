/**
 * Created by ebundala on 3/11/2017.
 */
import React, {Component} from "react";
import {Text, View, Button, ListView} from "react-native";
import {StackNavigator} from "react-navigation";
import Reviews from "../../reviews/components/reviews";
import Bids from "../../bids/components/bids"
import Chats from "../../chats/components/chats"

class ProductsList extends Component{
    static navigationOptions = {
        title: ({ state, setParams ,navigate}) => {
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
    constructor(props){
        super(props)
        const ds= new ListView.DataSource({rowHasChanged:(x,y)=>x!==y});
        this.state={
            dataSource:ds.cloneWithRows(["one","two","three","four"])
        }
    }
    render(){
        let navigate=this.props.navigation.navigate;
        let {title}=this.props.navigation.state.params;
        return(
            <View style={{flex:1}}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={(rowData)=>
                              <View>
                              <Button title={title+" "+rowData} onPress={()=>navigate("singleProduct",{title:title+" "+rowData,data:rowData})}/>

                              <Button title={"review "+title} onPress={()=>navigate("reviews",{title:title,reviews:["one","two","three"]})}/>
                                  <Button title={"Bids "+title} onPress={()=>navigate("bids",{title:title,reviews:["one","two","three"]})}/>
                                  <Button title={"Chats "+title} onPress={()=>navigate("chats",{title:title,reviews:["one","two","three"]})}/>
                                  <Button title={"add Product "+title} onPress={()=>navigate("addProduct",{title:title,reviews:["one","two","three"]})}/>
                                  <Button title={"edit Product "+title} onPress={()=>navigate("aditProduct",{title:title,reviews:["one","two","three"]})}/>

                              </View>
                                  }
                />




            </View>
        )
    }
}

class SingleProductView extends Component{
    static navigationOptions = {
        title: ({ state, setParams ,navigate}) => {
            return state.params.title
        },
        /*header: ({ state, setParams ,navigate}) => {
         let  right=(<Statuses navigate={navigate}/>
         );
         let  left=(<Menu navigate={navigate}/>
         );

         return { right ,left};
         },*/

    };
    render(){
        let navigate=this.props.navigation.navigate;
        let {data,title}=this.props.navigation.state.params
        return(
            <View style={{flex:1,justifyContent:"space-around"}}>
                <Text>singleView</Text>
                <Button title={"review "+title} onPress={()=>navigate("reviews",{title:title,reviews:["one","two","three"]})}/>
                <Button title={"Bids "+title} onPress={()=>navigate("bids",{title:title,reviews:["one","two","three"]})}/>
                <Button title={"Chats "+title} onPress={()=>navigate("chats",{title:title,reviews:["one","two","three"]})}/>
                <Button title={"add Product "+title} onPress={()=>navigate("addProduct",{title:"addProduct",reviews:["one","two","three"]})}/>
                <Button title={"edit Product "+title} onPress={()=>navigate("aditProduct",{title:"aditProduct",reviews:["one","two","three"]})}/>

            </View>
        )
    }
}

const products=StackNavigator({
    allProducts:{screen:ProductsList}  ,
    singleProduct:{screen:SingleProductView},
   // productReviews:{screen:Reviews},
    //productBids:{screen:Bids},
   // productChats:{screen:Chats},
    addProduct:{screen:ProductsList},
    aditProduct:{screen:ProductsList}
},{headerMode:"none"})

export default products;