/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    Button,
    ListView,
    TouchableNativeFeedback,
    Image
} from 'react-native';
import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"



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
        this.ds = new ListView.DataSource({rowHasChanged:(x,y)=>x!==y})

        }
    render(){
        let navigate=this.props.navigation.navigate;
        let {product,reviews}=this.props.navigation.state.params;


        let title=product.title;
        return(
            <View style={{flex:1}}>
           <ListView dataSource={this.ds.cloneWithRows(reviews||[])}
                     renderRow={(review)=><TouchableNativeFeedback title={"Review "+title+" "} onPress={()=>navigate("singleReview",{data:review})}>

                         <View style={[styles.horizontal,{paddingTop:8}]}>
                             <View style={[styles.flex2]}>
                                 <Image  style={[{width:50,height:50,borderRadius:50,resizeMode:Image.resizeMode.cover}]}
                                         source={{uri:review.reviewerAvator}}>

                                 </Image>
                             </View>

                             <View style={[styles.flex8]}>
                                 <View style={[styles.horizontal,]}>
                                     <Text style={[styles.productTitle]}>
                                         {review.reviewerName}
                                     </Text>
                                 </View>
                                 <View style={[styles.horizontal,]}>
                                     <Text style={[]}>
                                         {review.rating}
                                     </Text>
                                 </View>
                                 <View style={[]}>
                                     <Text style={[]}>
                                         {review.body}
                                     </Text>
                                 </View>
                             </View>
                         </View>


                     </TouchableNativeFeedback>}
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