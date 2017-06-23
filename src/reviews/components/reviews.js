/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    Button,
    ListView,
    PixelRatio,
    TouchableNativeFeedback,
    Image
} from 'react-native';
//import {Icon,Divider} from 'react-native-material-design';
import { Toolbar,Divider,Icon} from 'react-native-material-ui';
import {uiTheme} from  "../../app"
import StarRating from 'react-native-star-rating';

import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"
//import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
//import ExNavigator from '@expo/react-native-navigator';
import {shortenText} from '../../utils/utils'
let moment = require('moment');


export class ReviewsList extends Component{

    constructor(props){
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged:(x,y)=>x!==y})

        }
    render(){
        let {navigate,goBack}=this.props.navigation;
        let {product,reviews}=this.props.navigation.state.params;



        return(
            <View style={{flex:1}}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={()=>{
                        goBack();
                    }}
                    centerElement={product.title}
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                    }}
                />
           <ListView
               renderSeparator={(i,j)=><Divider key={j+"divider"+i}/>}
               dataSource={this.ds.cloneWithRows(reviews||[])}
                     renderRow={(review)=><TouchableNativeFeedback  onPress={()=>navigate("singleReview",{data:review})}>

                         <View style={[styles.horizontal, {paddingTop: 8}]}>
                             <View style={[styles.flex2,styles.alignItemsCenter]}>
                                 <Image style={[{
                                     width: 50,
                                     height: 50,
                                     borderRadius: 50,
                                     resizeMode: Image.resizeMode.cover

                                 }]}
                                        source={{uri: review.reviewerAvator}}>

                                 </Image>
                             </View>

                             <View style={[styles.flex8]}>
                                 <View style={[styles.horizontal,]}>
                                     <Text style={[styles.productTitle]}>
                                         {review.reviewerName}
                                     </Text>
                                 </View>
                                 <View style={[styles.horizontal,]}>
                                     <StarRating
                                         starSize={15}
                                         starColor={colours.paperOrange500.color}
                                         disabled={true}
                                         maxStars={5}

                                         rating={review.rating}
                                         selectedStar={(rating) => this.onStarRatingPress(rating)}
                                     />

                                 </View>
                                 <View style={[]}>
                                     <Text style={[]}>
                                         {shortenText(review.body, 160)}
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

    render(){
        let{title}=this.props.navigation.state.params
        let {navigate,goBack}=this.props.navigation;
        return(
            <View style={{flex:1}}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={()=>{
                        goBack();
                    }}
                    centerElement={title}

                />
                <Text>{title}</Text>
            </View>
        )
    }
}

export class CreateReview extends Component{

    constructor(props){
        super(props)

        /*this.state={
            product:{
                uid:null,
                title:null,
                discription:null,
                price:null,
                sellerID:"xxxxx",
            }
        }*/
    }
    render(){

        let {navigate,goBack} = this.props.navigation;
        let {product}=this.props.navigation.state.params;
        let props=this.props.screenProps;
        let {user}=this.props.screenProps;
        const { primaryColor } = uiTheme.palette;
        let routes = {
            getHomeRoute() {
                return {
                    // Return a React component class for the scene. It receives a prop
                    // called `navigator` that you can use to push on more routes.

                    renderScene(navigator) {


                        return (

                           <View></View>

                        );
                    },

                    // When this scene receives focus, you can run some code. We're just
                    // proxying the `didfocus` event that Navigator emits, so refer to
                    // Navigator's source code for the semantics.
                  /*  onDidFocus(event) {
                        console.log('Home Scene received focus.');
                    },*/

                    // Return a string to display in the title section of the navigation bar.
                    // This route's title is displayed next to the back button when you push
                    // a new route on top of this one.
                    getTitle() {
                        return 'Rate '+shortenText(product.name);
                    },


                    renderLeftButton() {
                        return (
                            <View style={styles.horizontal}>
                                <TouchableNativeFeedback
                                    onPress={()=>{goBack()}}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View >

                                        <Icon color={colours.paperGrey900.color} style={{padding: 16}} size={24} name="arrow-back"/>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        );
                    },

                    categories() {
                        return [
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
                };
            }
        }

        return (
            <View>

            </View>

            

        );
    }
    schema(){
        return{
            "type": "Product",
            "description": {"type":"description"},
            "name": {"type":"name"},
            "image": {"type":"image"},
            "itemCondition":{"type":"itemCondition"},
            "model":{"type":"model"},
            "category":{"type":"category"},
            "brand":{"type":"brand"},
            "color":{"type":"color"},
            "height":{"type":"height"},
            "width":{"type":"width"},
            "weight":{"type":"weight"},
            "sku":{"type":"sku"},
            "manufacturer":{"type":"manufacturer"},

            "offers": {
                "type": "Offer",
                "availability": "InStock",
                "price": {"type":"price"},
                "priceCurrency": {"type":"currency"},
                "acceptedPaymentMethod":{"type":"acceptedPaymentMethod"},
                "areaServed":{"type":"areaServed"},
                "availableDeliveryMethod":{"type":"availableDeliveryMethod"},
                "warranty":{"type":"warranty"}
            },
            "additionalProperty":{"type":"additionalProperty"}
            /*
             "aggregateRating": {
             "type": "AggregateRating",
             "ratingValue": "3.5",
             "reviewCount": "11"
             },

             "review": [
             {
             "@type": "Review",
             "author": "Ellie",
             "datePublished": "2011-04-01",
             "description": "The lamp burned out and now I have to replace it.",
             "name": "Not a happy camper",
             "reviewRating": {
             "@type": "Rating",
             "bestRating": "5",
             "ratingValue": "1",
             "worstRating": "1"
             }
             },
             {
             "@type": "Review",
             "author": "Lucas",
             "datePublished": "2011-03-25",
             "description": "Great microwave for the price. It is small and fits in my apartment.",
             "name": "Value purchase",
             "reviewRating": {
             "@type": "Rating",
             "bestRating": "5",
             "ratingValue": "4",
             "worstRating": "1"
             }
             }
             ]*/
        }
    }



}