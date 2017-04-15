/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    Button,
    ListView
} from 'react-native';

import { StackNavigator } from 'react-navigation';



export class ReviewsList extends Component{
    static navigationOptions = {
        title:({ state, setParams ,navigate}) => {
            return  state.params.product.title+' Reviews'
        },
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
        const ds = new ListView.DataSource({rowHasChanged:(x,y)=>x!==y})
        let {reviews}=this.props.navigation.state.params;
        this.state={
            dataSource:ds.cloneWithRows(reviews)
        }
    }
    render(){
        let navigate=this.props.navigation.navigate;
        let {product}=this.props.navigation.state.params;
        //alert(product)
        let title=product.title;
        return(
            <View style={{flex:1,justifyContent:"space-around"}}>
           <ListView dataSource={this.state.dataSource}
          renderRow={(rowData)=><Button title={"Review "+title+" "+rowData} onPress={()=>navigate("singleReview",{title:title+" "+rowData})}/>}
          />


            </View>
        )
    }
}

export class SingleReviewView extends Component{
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
        let{title}=this.props.navigation.state.params
        return(
            <View style={{flex:1}}>
                <Text>{title}</Text>
            </View>
        )
    }
}

/*const reviews=StackNavigator({
    allReviews:{screen:AllReviews}  ,
    singleReview:{screen:SingleView}
},{headerMode:"none"});

export default reviews;*/