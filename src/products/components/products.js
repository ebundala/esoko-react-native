/**
 * Created by ebundala on 3/11/2017.
 */
import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    TextInput,
   //PixelRatio,
    ViewPagerAndroid,
    TouchableNativeFeedback
} from "react-native";
import {Icon,Card ,Divider} from 'react-native-material-design';
import Button from 'apsl-react-native-button'
import StarRating from 'react-native-star-rating';
//import Accordion from "react-native-accordion"
//import {Statuses,Menu}  from "../../statuses/components/statuses"
import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import ExNavigator from '@expo/react-native-navigator';
import {shortenText} from '../../utils/utils'
let moment = require('moment');
let ctx;
export class ProductsList extends Component {
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return state.params.title
        },
        header: ({ state, setParams ,navigate}) => {
           // let  right=(<Statuses navigate={navigate}/>);
            //let  left=(<Menu  onPress={()=>ctx.openDrawer()}/>);
            let style=styles.navBarBackground
            return {style};
        },

    };

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        this.state={query:null}

    }

    render() {
        ctx=this;
        let navigate = this.props.navigation.navigate;
        let {title,products}=this.props.navigation.state.params;
        let props=this.props.screenProps;
       // let {products}=this.props.screenProps
        return (
            <View style={[styles.flex1]}>
                <Card style={[{height:50,
                    margin:0,
                    elevation:4,
                    borderRadius:0,
                    //backgroundColor:colours.paperTeal500.color
                }]} >
                    <View style={[styles.horizontal]}>

                        <View style={[styles.flex9]}>


                            <TextInput
                                ref={component => this.searchInput = component}
                                keyboardType="web-search"
                                style={styles.input}
                                autoCorrect={true}
                                autoCapitalize="none"
                                placeholder={"Search "+title}
                                placeholderTextColor={colours.paperGrey500.color}

                                onSubmitEditing={(e) => {
                                    if(this.state.query) {
                                        this.searchInput.blur();
                                        props.searchProducts(this.state.query, title, navigate)
                                    }
                                    else
                                        this.searchInput.focus();
                                }}
                                onChangeText={query => this.setState({query})}
                            />

                        </View>
                        <TouchableNativeFeedback onPress={()=>{
                            if(this.state.query) {
                                this.searchInput.blur();
                                props.searchProducts(this.state.query, title, navigate)
                            }
                            else
                                this.searchInput.focus();
                        }}>
                            <View style={[styles.flex1,styles.centerJustified,styles.alignItemsCenter]}>
                                <Icon name="search" />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </Card>
                <Divider style={{marginHorizontal:0}}/>
                <ListView dataSource={this.ds.cloneWithRows(products)}
                          contentContainerStyle={[styles.horizontal,styles.spaceAround,styles.flexWrap]}
                          scrollRenderAheadDistance={640}
                           enableEmptySections={true}
                          renderRow={(data) =>
                              <TouchableNativeFeedback onPress={() => navigate("singleProduct", {
                                  data: data
                              })}>
                                  <View style={[,{
                                      height: 220,
                                      width:180
                                  },

                                  ]}>
                                      <Card style={[styles.flex1]}>

                                          <View style={[styles.flex1]}>
                                              <Image  style={[{marginTop:16,marginBottom:8,
                                                  width:132,height:132,
                                                  resizeMode:Image.resizeMode.stretch,
                                                  backgroundColor:colours.paperGrey300.color
                                              }]}
                                                      source={{uri:data.photos[0].url}}>

                                              </Image>
                                              <View style={[styles.spaceAround,styles.alignItemsCenter,{height:40}]}>
                                                  <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                      <Text style={[styles.productTitle]}>
                                                          {shortenText(data.title)}
                                                      </Text>
                                                  </View>
                                                  <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                      <Text style={[styles.currency]}>
                                                          {data.currency}
                                                      </Text>
                                                      <Text style={[styles.price]}>
                                                          {data.price}
                                                      </Text>
                                                  </View>
                                              </View>
                                          </View>



                                          {false&&<View style={[styles.horizontal]}>


                                              <Button title={"add Product "}
                                                      onPress={() =>props.addProduct(data,navigate)}/>
                                              <Button title={"edit Product "}
                                                      onPress={() =>props.editProduct(data,navigate)}/>

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

export class SingleProductView extends Component {
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return state.params.data.title
        },
        header: ({ state, setParams ,navigate}) => {
       //  let  right=(<Statuses navigate={navigate}/>);
         //let  left=(<Menu navigate={navigate}/>);
let style=styles.navBarBackground
         return { style};
         },

    };
    constructor(){
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        this.state={starCount:5}
    }

    render() {
        let navigate = this.props.navigation.navigate;
        let {data}=this.props.navigation.state.params;
        let props=this.props.screenProps;
        let reviews=[];


        for(let i=0;i<9;i++){
        reviews.push({
            reviewerName:"Elias Bundala",
            rating:Math.random()*5,
            body:"hello this is a terible product dont buy it an way too expensive",
            reviewerAvator:data.photos[Math.floor(Math.random()*5)].url
        })
        }



        return (
            <View style={[styles.flex1]}>

                <Card ref="CTA" style={[
                    styles.horizontal,
                    styles.spaceBetween,
                    {
                        margin:0,
                        elevation:4,
                        borderRadius:0,
                        //backgroundColor:colours.paperTeal500.color
                    }]}>

                    <View style={[styles.flex2]}>
                        <Button style={{
                           // textColor: colours.paperGrey50.color,
                           // backgroundColor: colours.paperGrey700.color,
                            //rippleColor: colours.paperPinkA700.color
                            margin:8,
                            borderRadius:34,
                            height:34
                        }}
                                onPress={() => props.startChat(data, navigate)}>
                            <Text>{"MESSAGE SELLER"}</Text>
                        </Button>
                    </View>
                    <View style={[styles.flex2]}>
                        <Button   style={{
                           // textColor: colours.paperGrey50.color,
                            //backgroundColor: colours.paperDeepOrange300.color,
                            //rippleColor: colours.paperPinkA700.color

                            margin:8,
                            borderRadius:34,
                            height:34
                        }}
                                onPress={() => props.placeBid(data, navigate)}>
                            <Text>{"PLACE BID"}</Text>
                        </Button>
                    </View>

                </Card>


   <Divider style={{marginHorizontal:0}}/>
                <ScrollView >
                    <View >
                    <Card ref="mainCard" style={[{height:360}]}>
                        <View style={[styles.flex8,{marginVertical:16}]}>
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
                                    style={[styles.flex1,{backgroundColor:colours.paperTeal50.color}]}>
                                    <Image  style={[styles.flex1,{width:null,height:null,resizeMode:Image.resizeMode.cover}]}
                                            source={{uri:data.photos[i].url}}>
                                        <Text style={[{position:"absolute",bottom:8,left:8}]}>{i+1+"/"+data.photos.length}</Text>
                                    </Image>
                                </View>
                            ))}
                        </ViewPagerAndroid>
                        </View>
                        <View style={[styles.flex2,styles.horizontal,]}>
                            <View style={[styles.flex8,styles.centerJustified]}>
                                <View style={[styles.horizontal]}>
                                    <Text style={[colorStyle.paperGrey900,{fontSize:14,fontWeight:"500"}]}>
                                        {data.title}
                                    </Text>
                                </View>

                            </View>
                            <View style={[styles.flex4,styles.centerJustified,styles.alignItemsCenter,{margin:8}]}>
                                < View style={[styles.horizontal]}>
                                    <Text style={[colorStyle.paperGrey900,{fontSize:14,fontWeight:"500",textAlign:"center"}]}>
                                        {data.currency} {data.price}

                                    </Text>
                                </View>
                            </View>

                        </View>

                    </Card>
                        <Card>


                      <View ref="description" style={[styles.flex1,{height:50}]}>

                      <View style={[styles.flex1,styles.horizontal]}>

                          <View style={[styles.centerJustified]}>
                              <Text style={[styles.title,{fontSize:12}]}>
                                  DESCRIPTION

                              </Text>
                          </View>


                      </View>

                  </View>


                      <View>
                      <Divider/>
                      <Text style={[typographyStyle.paperFontBody1,{padding:8}]}>
                          {data.description}
                      </Text>
                  </View>

                        </Card>
                    <Card  >


                        <View ref="reviews" style={[styles.flex1,{height:50}]}>
                            <View style={[styles.flex1,styles.horizontal]}>

                                <View style={[styles.centerJustified]}>
                                    <Text style={[styles.title,{fontSize:12}]}>
                                        REVIEWS

                                    </Text>
                                </View>


                            </View>
                            </View>
                        <View style={[styles.horizontal,styles.alignItemsCenter]}>

                            <StarRating
                                starSize={20}
                                starColor={colours.paperOrange500.color}
                                disabled={true}
                                maxStars={5}

                                rating={3.3}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                            <Text style={[styles.productTitle]}>86789</Text>


                        </View>
                           <View style={[{paddingVertical:8}]}>

                           <Button  onPress={() => {
                                       data.reviews=reviews;
                                       props.reviewProduct(data,navigate)}}>
                               <Text>{"Rate this"}</Text>
                           </Button>

                               <ListView dataSource={this.ds.cloneWithRows(this.renderReview(reviews))}
                                  contentContainerStyle={[styles.spaceAround,styles.flexWrap]}

                                  enableEmptySections={true}
                                  renderRow={(review) =>

                                      <TouchableNativeFeedback title={"Review"} onPress={()=>navigate("singleReview",{data:review})}>


                                                  <View style={[styles.horizontal,{paddingTop:8}]}>
                                                      <View style={[styles.flex2]}>
                                                      <Image  style={[{backgroundColor:colours.paperGrey200.color,width:50,height:50,borderRadius:50,resizeMode:Image.resizeMode.cover}]}
                                                              source={{uri:review.reviewerAvator}}>

                                                      </Image>
                                                      </View>

                                                      <View style={[styles.flex8]}>
                                                          <View style={[styles.horizontal,]}>
                                                              <Text style={[styles.productTitle]}>
                                                                  {review.reviewerName}
                                                              </Text>
                                                          </View>
                                                          <View style={[styles.horizontal,{width:90}]}>
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
                                                                  {review.body}
                                                              </Text>
                                                          </View>
                                                      </View>
                                                  </View>

                                      </TouchableNativeFeedback>




                                      }
                        />
                        </View>




                        <Button onPress={() => {
                                    data.reviews=reviews;
                                    props.allReviews(data,navigate)}}>
                            <Text>{"ALL REVIEWS"}</Text>
                        </Button>


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
      return[]
    }
    renderReview(reviews){
        let rev=[];
        if(reviews instanceof Array){

        if(reviews.length>3)
        {
        for(let i=0;i<3;i++){
            rev.push(reviews[i])
        }

        }else {
        return reviews;
        }
        }

        return rev
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
}


export class searchResultsProductsList extends Component {
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return state.params.title
        },
        header: ({ state, setParams ,navigate}) => {
            // let  right=(<Statuses navigate={navigate}/>);
            //let  left=(<Menu  onPress={()=>ctx.openDrawer()}/>);
            let style=styles.navBarBackground;
            return {style};
        },

    };

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        this.state={query:null}

    }

    render() {
        ctx=this;
        let navigate = this.props.navigation.navigate;
        let {title,products}=this.props.navigation.state.params;
        let props=this.props.screenProps;
        // let {products}=this.props.screenProps
        return (
            <View style={[styles.flex1]}>
                {false&&<Card style={[{height:50,
                    margin:0,
                    elevation:4,
                    borderRadius:0,
                    //backgroundColor:colours.paperTeal500.color
                }]} >
                    <View style={[styles.horizontal]}>

                        <View style={[styles.flex9]}>


                            <TextInput
                                ref={component => this.searchInput = component}
                                keyboardType="web-search"
                                style={styles.input}
                                autoCorrect={true}
                                autoCapitalize="none"
                                placeholder={"Search "+title}
                                placeholderTextColor={colours.paperGrey500.color}

                                onSubmitEditing={(query) => {
                                    if(query) {
                                        this.searchInput.blur();
                                        props.searchProducts(query, title, navigate)
                                    }
                                    else
                                        this.searchInput.focus();
                                }}
                                onChangeText={query => this.setState({query})}
                            />

                        </View>
                        <TouchableNativeFeedback onPress={()=>{
                            if(this.state.query) {
                                this.searchInput.blur();
                                props.searchProducts(this.state.query, title, navigate)
                            }
                            else
                                this.searchInput.focus();
                        }}>
                            <View style={[styles.flex1,styles.centerJustified,styles.alignItemsCenter]}>
                                <Icon name="search" />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </Card>}
                <Divider style={{marginHorizontal:0}}/>
                <ListView dataSource={this.ds.cloneWithRows(products)}
                          contentContainerStyle={[styles.horizontal,styles.spaceAround,styles.flexWrap]}
                          scrollRenderAheadDistance={640}
                          enableEmptySections={true}
                          renderRow={(data) =>
                              <TouchableNativeFeedback onPress={() => navigate("singleProduct", {
                                  data: data
                              })}>
                                  <View style={[,{
                                      height: 220,
                                      width:180
                                  },

                                  ]}>
                                      <Card style={[styles.flex1]}>

                                          <View style={[styles.flex1]}>
                                              <Image  style={[{marginTop:16,marginBottom:8,
                                                  width:132,height:132,
                                                  resizeMode:Image.resizeMode.stretch,
                                                  backgroundColor:colours.paperGrey300.color
                                              }]}
                                                      source={{uri:data.photos[0].url}}>

                                              </Image>
                                              <View style={[styles.spaceAround,styles.alignItemsCenter,{height:40}]}>
                                                  <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                      <Text style={[styles.productTitle]}>
                                                          {shortenText(data.title)}
                                                      </Text>
                                                  </View>
                                                  <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                      <Text style={[styles.currency]}>
                                                          {data.currency}
                                                      </Text>
                                                      <Text style={[styles.price]}>
                                                          {data.price}
                                                      </Text>
                                                  </View>
                                              </View>
                                          </View>



                                          {false&&<View style={[styles.horizontal]}>


                                              <Button title={"add Product "}
                                                      onPress={() =>props.addProduct(data,navigate)}/>
                                              <Button title={"edit Product "}
                                                      onPress={() =>props.editProduct(data,navigate)}/>

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












export class CreateProduct extends Component{
    static navigationOptions = {
       /* title: ({state, setParams, navigate}) => {
            return "NEW PRODUCT"||state.params.title
        },*/
        header: ({ state, setParams ,navigate}) => {
            //  let  right=(<Statuses navigate={navigate}/>);
            //let  left=(<Menu navigate={navigate}/>);
            let style={height:0};
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

        let {navigate,goBack} = this.props.navigation;

        let {user}=this.props.screenProps;

        let routes = {
            getHomeRoute() {
                return {
                    // Return a React component class for the scene. It receives a prop
                    // called `navigator` that you can use to push on more routes.

                    renderScene(navigator) {


                        return (

                            <GiftedForm
                                formName='newProduct' // GiftedForm instances that use the same name will also share the same states

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
                                <GiftedForm.TextInputWidget
                                    name='name' // mandatory
                                    title='Product'



                                    placeholder='HP pavilion notebook'
                                    clearButtonMode='while-editing'
                                />
                                <GiftedForm.TextInputWidget
                                    name='brand'
                                    title='Brand'


                                    placeholder='HP'
                                    clearButtonMode='while-editing'

                                    onTextInputFocus={(currentText = '') => {
                                        if (!currentText) {
                                            let brand = GiftedFormManager.getValue('newProduct', 'brand');
                                            if (brand) {
                                                return brand.replace(/[^a-zA-Z0-9-_]/g, '');
                                            }
                                        }
                                        return currentText;
                                    }}
                                />
                                <GiftedForm.TextInputWidget
                                    name='model' // mandatory
                                    title='Model'

                                    placeholder='DV6'


                                    clearButtonMode='while-editing'


                                />
                                <GiftedForm.TextInputWidget
                                    name='manufacturer' // mandatory
                                    title='Manufacturer'
                                    placeholder='HP'
                                    clearButtonMode='while-editing'


                                />

                                <GiftedForm.SeparatorWidget />

                                <GiftedForm.ModalWidget
                                    title='Price'
                                    displayValue='price'
                                    cancelable={true}

                                >

                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.TextInputWidget
                                        name='price' // mandatory
                                        title='Price per Item'

                                        placeholder='price of single unit'

                                        keyboardType="numeric"
                                        returnKeyLabel="done"
                                        clearButtonMode='while-editing'

                                        onSubmitEditing={(e) => {
                                            navigator.pop();
                                        }}

                                    />


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Currency'
                                    displayValue='currency'
                                    cancelable={true}
                                >
                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.SelectWidget name='currency' title='Currency' multiple={false}>
                                        <GiftedForm.OptionWidget  title="Tanzania Shilling's" value="TZS"/>
                                        <GiftedForm.OptionWidget  title="US Dollar's" value="USD"/>
                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Payment Methods'
                                    displayValue='acceptedPaymentMethod'
                                    cancelable={true}
                                >

                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.SelectWidget name='acceptedPaymentMethod' title='Payment Methods' multiple={false}>
                                        <GiftedForm.OptionWidget  title="On Delivery" value="OnDelivery"/>
                                        <GiftedForm.OptionWidget  title="Tigo Pesa" value="TigoPesa"/>


                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Quantity'
                                    displayValue='quantity'
                                    cancelable={true}
                                >
                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.TextInputWidget
                                        name='quantity' // mandatory
                                        title='Quantity'

                                        placeholder='item quantity'

                                        keyboardType="numeric"


                                        clearButtonMode='while-editing'
                                        returnKeyLabel="done"
                                        onSubmitEditing={(e) => {
                                            navigator.pop();
                                        }}
                                    />


                                </GiftedForm.ModalWidget>

                                <GiftedForm.SeparatorWidget />

                                <GiftedForm.ModalWidget
                                    title='Category'
                                    displayValue='category'
                                    cancelable={true}
                                >
                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.SelectWidget name='category' title='Category' multiple={false}>
                                        {this.categories().map((child, i)=>{
                                            //alert(child)
                                            return(<GiftedForm.OptionWidget key={i} title={child} value={child}/>)})}


                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Condition'
                                    cancelable={true}
                                    displayValue='itemCondition'>
                                    <GiftedForm.SeparatorWidget />

                                    <GiftedForm.SelectWidget name='itemCondition' title='Item Condition' multiple={false}>

                                        <GiftedForm.OptionWidget  title='Brand New' value='New'/>
                                        <GiftedForm.OptionWidget  title='Refurbished' value='Refurbished'/>
                                        <GiftedForm.OptionWidget  title='Used' value='used'/>

                                    </GiftedForm.SelectWidget>



                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Availability'
                                    cancelable={true}
                                    displayValue='availability'>
                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.SelectWidget name='availability' title='Availability' multiple={false}>

                                        <GiftedForm.OptionWidget  title="In Stock" value="InStock"/>
                                        <GiftedForm.OptionWidget  title="Out Of Stock" value="OutOfStock"/>
                                        <GiftedForm.OptionWidget  title="Sold Out" value="SoldOut"/>
                                        <GiftedForm.OptionWidget  title="Pre Order" value="PreOrder"/>


                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Area Served'
                                    cancelable={true}
                                    displayValue='areaServed'



                                    scrollEnabled={true} // true by default
                                >

                                    <GiftedForm.SelectWidget name='areaServed' title='Area Served' multiple={false}>
                                        <GiftedForm.OptionWidget  title="Main Campus" value="MAIN"/>
                                        <GiftedForm.OptionWidget  title="Mazimbu Campus" value="SMC"/>

                                    </GiftedForm.SelectWidget>

                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Delivery Methods'
                                    cancelable={true}
                                    displayValue='availableDeliveryMethod'>
                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.SelectWidget name='availableDeliveryMethod' title='Delivery Methods' multiple={false}>
                                        <GiftedForm.OptionWidget  title="Pick up" value="pickUp"/>
                                        <GiftedForm.OptionWidget  title="Postal Shipping" value="Shipping"/>

                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>

                                <GiftedForm.SeparatorWidget />

                                <GiftedForm.ModalWidget
                                    title='Description'
                                    cancelable={true}
                                    displayValue='description'



                                    scrollEnabled={true} // true by default
                                >

                                    <GiftedForm.SeparatorWidget/>
                                    <GiftedForm.TextAreaWidget
                                        name='description'
                                        autoFocus={true}
                                        placeholder='Short description of the product'
                                    />
                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Warranty'
                                    cancelable={true}
                                    displayValue='warranty'>
                                    <GiftedForm.SeparatorWidget />
                                    <GiftedForm.TextAreaWidget
                                        name='warranty'
                                        autoFocus={true}
                                        placeholder='Any product warranty'
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

                                <GiftedForm.HiddenWidget name='userID' value={user.UID} />
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
                        return 'New item';
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
        sceneStyle={{ paddingTop:56 }}
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














