/**
 * Created by ebundala on 3/11/2017.
 */
import React, {Component} from "react";
import {Text, View, Button, ListView} from "react-native";
import {StackNavigator} from "react-navigation";
import Reviews from "../../reviews/components/reviews";

class AllView extends Component{
    static navigationOptions = {
        title: 'Products',
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
        return(
            <View style={{flex:1}}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={(rowDate)=><Button title={rowDate} onPress={()=>navigate("singleProduct",{title:rowDate,data:rowDate})}/>}
                />




            </View>
        )
    }
}

class SingleView extends Component{
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
        let {data}=this.props.navigation.state.params
        return(
            <View style={{flex:1}}>
                <Text>singleView</Text>
                <Button title={"review "+data} onPress={()=>navigate("reviews",{title:data,reviews:["one","two","three"]})}/>

            </View>
        )
    }
}

const products=StackNavigator({
    allProducts:{screen:AllView}  ,
    singleProduct:{screen:SingleView},
    reviews:{screen:Reviews}
},{headerMode:"none"})

export default products;