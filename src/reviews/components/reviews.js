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
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import ExNavigator from '@expo/react-native-navigator';
let moment = require('moment');


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

export class CreateReview extends Component{
    static navigationOptions = {
        /* title: ({state, setParams, navigate}) => {
         return "NEW PRODUCT"||state.params.title
         },*/
        header: ({ state, setParams ,navigate}) => {
            //  let  right=(<Statuses navigate={navigate}/>);
            //let  left=(<Menu navigate={navigate}/>);
            let style={backgroundColor:colours.paperTeal500.color,height:0};
            return {style};
        },
        headerVisible: false,

    };

    //static router = MyRouter;
    constructor(props){
        super(props)
        let {user}=this.props.screenProps;
        this.state={
            product:{
                uid:null,
                title:null,
                discription:null,
                price:null,
                sellerID:"xxxxx",
            }
        }
    }
    render(){

        let navigate = this.props.navigation.navigate;
        //let {data}=this.props.navigation.state.params;
        let props=this.props.screenProps;

        let routes = {
            getHomeRoute() {
                return {
                    // Return a React component class for the scene. It receives a prop
                    // called `navigator` that you can use to push on more routes.

                    renderScene(navigator) {


                        return (

                            <GiftedForm
                                formName='newReview' // GiftedForm instances that use the same name will also share the same states

                                openModal={(route) => {
                                    // console.log(route.getTitle())
                                    navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
                                }}

                                clearOnClose={false} // delete the values of the form when unmounted

                                defaults={{

                                    /* "description": "",
                                     "name": "",
                                     "image":[],
                                     "itemCondition":"",
                                     "model":"",
                                     "category":"",
                                     "brand":"",
                                     "color":"",
                                     "height":"",
                                     "width":"",
                                     "weight":"",
                                     "sku":"",
                                     "manufacturer":"",

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
                                     "additionalProperty":{"type":"additionalProperty"}*/
                                }}
                            >

                                <GiftedForm.SeparatorWidget  />
                                <GiftedForm.SelectWidget name='rating' title='Star Rating' multiple={false}>
                                    <GiftedForm.OptionWidget  title="5 Stars" value="5">

                                    </GiftedForm.OptionWidget>
                                    <GiftedForm.OptionWidget  title="4 Stars" value="4"/>
                                    <GiftedForm.OptionWidget  title="3 Stars" value="3"/>
                                    <GiftedForm.OptionWidget  title="2 Stars" value="2"/>
                                    <GiftedForm.OptionWidget  title="1 Stars" value="1"/>
                                </GiftedForm.SelectWidget>
                                <GiftedForm.SeparatorWidget  />

                                <GiftedForm.ModalWidget
                                    title='Review'
                                    displayValue='review'
                                    scrollEnabled={true} // true by default
                                >

                                <GiftedForm.TextAreaWidget
                                    name='review'
                                    autoFocus={true}
                                    placeholder='what do you think about this item'
                                />
                                </GiftedForm.ModalWidget>
                                <GiftedForm.SeparatorWidget />

                                <GiftedForm.SubmitWidget
                                    title='post'
                                    widgetStyles={{
                                        submitButton: {
                                            backgroundColor:"blue" //themes.mainColor,
                                        }
                                    }}
                                    onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                                        if (isValid === true) {

                                            console.log(values);
                                            // prepare object
                                            //values.gender = values.gender[0];
                                            // values.birthday = moment(values.birthday).format('YYYY-MM-DD');

                                            /* Implement the request to your server using values variable
                                             ** then you can do:
                                             ** postSubmit(); // disable the loader
                                             ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
                                             ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
                                             ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
                                             */
                                        }
                                    }}

                                />

                                <GiftedForm.NoticeWidget
                                    title='By posting, you agree to the Terms of Service and Privacy Policy.'
                                />

                                <GiftedForm.HiddenWidget name='userID' value={"xxxx"} />
                                <GiftedForm.HiddenWidget name='productID' value={"xxxx"} />
                                <GiftedForm.HiddenWidget name='userName' value={"xxxx"} />

                            </GiftedForm>

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
                        return 'Review product';
                    },


                    /*renderLeftButton() {
                        return (
                            <View></View>
                        );
                    },*/

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

            <ExNavigator
                initialRoute={routes.getHomeRoute()}
                sceneStyle={{ paddingTop: 56 }}
                style={[styles.flex1]}
            />

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