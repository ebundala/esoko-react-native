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
import {Icon,Divider} from 'react-native-material-design';
import StarRating from 'react-native-star-rating';

import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import ExNavigator from '@expo/react-native-navigator';
import {shortenText} from '../../utils/utils'
let moment = require('moment');
let WidgetMixin = require('react-native-gifted-form/mixins/WidgetMixin.js');

const RatingWidget = React.createClass({
    mixins: [WidgetMixin],

    getDefaultProps() {
        return {
            inline: true,
            // @todo type avec suffix Widget pour all
            type: 'RatingWidget',

        }
    },

    getInitialState() {
        return {

            value:0,
        }
    },

    _renderTitle() {
        if (this.props.title !== '') {
            return (
                <Text
                    numberOfLines={1}
                    style={this.getStyle(['ratingInputTitleInline'])}
                >
                    {this.props.title}
                </Text>
            );
        }
        return (
            <View style={this.getStyle(['spacer'])}/>
        );
    },

    _renderRow() {

        if (this.props.inline === false) {
            return (
                <View style={this.getStyle(['rowContainer'])}>
                    <View style={this.getStyle(['titleContainer'])}>
                        {this._renderImage()}
                        <Text numberOfLines={1} style={this.getStyle(['ratingInputTitle'])}>{this.props.title}</Text>
                    </View>

                    <TextInput
                        ref='input'
                        style={this.getStyle(['ratingInput'])}

                        {...this.props}

                        onFocus={this.onFocus}
                        onBlur={this.onBlur}


                        onChangeText={this._onChange}
                        value={this.state.value}
                    />
                    {this._renderValidationError()}
                    {this._renderUnderline()}
                </View>
            );
        }
        return (
            <View style={this.getStyle(['rowContainer'])}>
                <View style={this.getStyle(['row'])}>
                    {this._renderImage()}
                    {this._renderTitle()}

                    <StarRating
                        {...this.props}
                        rating={this.state.value}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                </View>
                {this._renderValidationError()}
                {this._renderUnderline()}
            </View>
        );

    },


    onStarRatingPress(rating) {
        let oldVal = this.state.value;
        let newVal = rating;
        if (newVal !== oldVal) {
            this.setState({
                value: rating
            });
            this._onChange(newVal);
        }

    },


    _renderUnderline() {
        if (this.props.underlined === true) {
            if (this.state.focused === false) {
                return (
                    <View
                        style={this.getStyle(['underline', 'underlineIdle'])}
                    />
                );
            }
            return (
                <View
                    style={this.getStyle(['underline', 'underlineFocused'])}
                />
            );
        }
        return null;
    },

    render() {
        return this._renderRow();
    },

    defaultStyles: {
        rowImage: {
            height: 20,
            width: 20,
            marginLeft: 10,
        },
        underline: {
            marginRight: 10,
            marginLeft: 10,
        },
        underlineIdle: {
            borderBottomWidth: 2,
            borderColor: '#c8c7cc',
        },
        underlineFocused: {
            borderBottomWidth: 2,
            borderColor: '#3498db',
        },
        spacer: {
            width: 10,
        },
        rowContainer: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1 / PixelRatio.get(),
            borderColor: '#c8c7cc',
        },
        row: {
            flexDirection: 'row',
            height: 44,
            alignItems: 'center',
        },
        titleContainer: {
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            // selfAlign: 'center',
            // backgroundColor: '#ff0000',
        },
        ratingInputInline: {
            fontSize: 15,
            flex: 1,
            height: 40,// @todo should be changed if underlined
            marginTop: 2,
        },
        ratingInputTitleInline: {
            width: 110,
            fontSize: 15,
            color: '#000',
            paddingLeft: 10,
        },
        ratingInputTitle: {
            fontSize: 13,
            color: '#333',
            paddingLeft: 10,
            flex: 1
        },
        ratingInput: {
            fontSize: 15,
            flex: 1,
            height: 40,
            marginLeft: 40,
        },
    },
});

export class ReviewsList extends Component{
    static navigationOptions = {
        title:({ state, setParams ,navigate}) => {
            return  state.params.product.title+' Reviews'
        },
        header: ({ state, setParams ,navigate}) => {
         //let  right=(<Statuses navigate={navigate}/>);
         //let  left=(<Menu navigate={navigate}/>);
            let style=styles.navBarBackground
         return { style};
         },

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
           <ListView
               renderSeparator={()=><Divider/>}
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
    static navigationOptions = {
        title: ({ state, setParams ,navigate}) => {
            return state.params.title
        },
        header: ({ state, setParams ,navigate}) => {
        // let  right=(<Statuses navigate={navigate}/>);
        // let  left=(<Menu navigate={navigate}/>);
            let style=styles.navBarBackground;
         return { style};
         },

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

        let {navigate,goBack} = this.props.navigation;
        let {product}=this.props.navigation.state.params;
        let props=this.props.screenProps;
        let {user}=this.props.screenProps;
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
                                <RatingWidget
                                    title='Rate this'
                                    name='rating'
                                    starSize={24}
                                    starStyle={{marginHorizontal:5}}
                                    starColor={colours.paperOrange500.color}
                                    disabled={false}
                                    maxStars={5}

                                />
                                <GiftedForm.TextAreaWidget
                                    name='review'
                                    autoFocus={false}
                                    placeholder='What do you think about this item'
                                />

                                <GiftedForm.SeparatorWidget  />



                                <GiftedForm.SubmitWidget
                                    title='Submit'
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
                                    title='By submitting a review, you agree to the Terms of Service and Privacy Policy.'
                                />

                                <GiftedForm.HiddenWidget name='userID' value={user.UID} />
                                <GiftedForm.HiddenWidget name='productID' value={product.productID} />
                                <GiftedForm.HiddenWidget name='userName' value={user.displayName} />
                                <GiftedForm.HiddenWidget name='reviewerAvator' value={user.photoUrl} />

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
                        return 'Rate '+shortenText(product.title);
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

            <ExNavigator
                initialRoute={routes.getHomeRoute()}
                sceneStyle={{ paddingTop: 56 }}
                navigationBarStyle={[styles.navBarBackground]}
                titleStyle={[{color:colours.paperGrey900.color,marginTop:16,fontWeight:"bold"}]}
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