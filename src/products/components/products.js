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
   // Navigator,
    ViewPagerAndroid,
    TouchableNativeFeedback
} from "react-native";
import {Icon,Card ,Divider} from 'react-native-material-design';
import Button from 'apsl-react-native-button'
import Accordion from "react-native-accordion"
import {Statuses,Menu}  from "../../statuses/components/statuses"
import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import ExNavigator from '@expo/react-native-navigator';
let moment = require('moment');
let ctx;
export class ProductsList extends Component {
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return state.params.title
        },
        header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu  onPress={()=>ctx.openDrawer()}/>
            );
            let style={backgroundColor:colours.paperTeal600.color,}
            return {style};
        },

    };

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        //let {title}=this.props.navigation.state.params;

        /*let {products}=this.props.screenProps;
        this.state = {
            dataSource: this.ds.cloneWithRows(products)
        }*/

    }

    render() {
        ctx=this;
        let navigate = this.props.navigation.navigate;
        let {title,products}=this.props.navigation.state.params;
        let props=this.props.screenProps;
       // let {products}=this.props.screenProps
        return (
            <View style={[styles.flex1]}>
                <Card style={[{height:50}]} >
                    <View style={[styles.horizontal]}>
                    <View style={[styles.flex1,styles.centerJustified,styles.alignItemsCenter]}>
                        <Icon name="search" />
                    </View>

                        <View style={[styles.flex9]}>


                            <TextInput
                                ref={component => this.searchInput = component}
                                keyboardType="web-search"
                                style={styles.input}
                                autoCorrect={true}
                                autoCapitalize="none"
                                placeholderTextColor='#a8aAeC'
                                placeholder={"Search "+title}
                                onSubmitEditing={(query) => {
                                    props.searchProducts(this.state.query,title,navigate)
                                }}
                                onChangeText={query => this.setState({query})}
                            />

                        </View>
                    </View>
                </Card>

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
                                              <Image  style={[{marginTop:16,marginBottom:8,width:132,height:132,resizeMode:Image.resizeMode.stretch}]}
                                                      source={{uri:data.photos[0].url}}>

                                              </Image>
                                              <View style={[styles.spaceAround,styles.alignItemsCenter,{height:40}]}>
                                                  <View style={[styles.horizontal,styles.alignItemsCenter,styles.centerJustified]}>
                                                      <Text style={[styles.productTitle]}>
                                                          {data.title}
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

                                          {false&& <View>
                                              <View style={[styles.horizontal,styles.alignItemsCenter,styles.flexStart]}>
                                                  <Icon size={14} name="update"  />
                                                  <Text style={[{fontSize: 10,marginHorizontal:5}]}>{data.postedOn}</Text>

                                              </View>
                                              <View style={[styles.horizontal,styles.flex1,{margin:5}]}>

                                                  <View ref="detail" style={[styles.flex8,]}>
                                                      <View style={[styles.horizontal,]}>
                                                          <Text style={[{fontSize: 16,fontWeight:"bold"}]}>{data.title}</Text>
                                                      </View>
                                                      <View style={[styles.flex1,{marginVertical:5,overflow:"hidden",backgroundColor:"white"}]}>
                                                          <Text style={[{fontSize: 12,textAlign:"left"}]}>{data.description}</Text>
                                                      </View>
                                                      <View >
                                                          <Text style={[{fontSize: 14,fontWeight:"bold",color:"orange"}]}>{"Price "+data.price}</Text>
                                                      </View>

                                                  </View>
                                                  <View ref="photo" style={[styles.flex4,styles.yellow,{elevation:2}]}>

                                                  </View>
                                              </View>
                                              <View style={[styles.horizontal,styles.spaceAround,{elevation:5,backgroundColor:"lime"}]}>

                                                  <TouchableNativeFeedback  title={"review "}
                                                                            onPress={() => props.reviewProduct(data,navigate)}>
                                                      <View>
                                                          <Text>
                                                              review
                                                          </Text>
                                                      </View>
                                                  </TouchableNativeFeedback>
                                                  <TouchableNativeFeedback  title={"Bids "}
                                                                            onPress={() => props.placeBid(data,navigate)}>
                                                      <View>
                                                          <Text>
                                                              Bids
                                                          </Text>
                                                      </View>
                                                  </TouchableNativeFeedback>
                                                  <TouchableNativeFeedback
                                                      onPress={() =>props.startChat(data,navigate)}>
                                                      <View>
                                                          <Text>
                                                              Chats
                                                          </Text>
                                                      </View>
                                                  </TouchableNativeFeedback>


                                              </View>
                                          </View>}

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
let style={backgroundColor:colours.paperTeal500.color,}
         return { style};
         },

    };
    constructor(){
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});

    }

    render() {
        let navigate = this.props.navigation.navigate;
        let {data}=this.props.navigation.state.params;
        let props=this.props.screenProps;
        let reviews=[];


        for(let i=0;i<9;i++){
        reviews.push({
            reviewerName:"Elias Bundala",
            rating:5,
            body:"hello this is a terible product dont buy it an way too expensive",
            reviewerAvator:data.photos[Math.floor(Math.random()*5)].url
        })
        }



        return (
            <View style={[styles.flex1]}>

                <View ref="CTA" style={[styles.horizontal,styles.spaceBetween,{margin:0,elevation:0,backgroundColor:"transparent"}]}>

                    <View style={[styles.flex2]}>
                        <Button style={{
                           // textColor: colours.paperGrey50.color,
                           // backgroundColor: colours.paperGrey700.color,
                            //rippleColor: colours.paperPinkA700.color
                            margin:8,
                            borderRadius:50
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
                            borderRadius:50
                        }}
                                onPress={() => props.placeBid(data, navigate)}>
                            <Text>{"PLACE YOUR BID"}</Text>
                        </Button>
                    </View>

                </View>



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
                          {false&&<View style={[styles.centerJustified]}>
                              <Icon name="add" size={24}/>
                          </View>}
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
        return[
            "hello",
            "world",
            "mick",
            "mill",
            "youi",
            "alt"
        ]
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
}






const MyRouter = {
    getStateForAction: (action, state) => {


    },
    getActionForPathAndParams: (path, params) => null,
    getPathAndParamsForState: (state) => null,
    getComponentForState: (state) => {},
    getComponentForRouteName: (routeName) => {},
};







export class CreateProduct extends Component{
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
                        let form=(<View>
                                <GiftedForm
                                    formName='signupForm' // GiftedForm instances that use the same name will also share the same states

                                    openModal={(route) => {
                                        // console.log(route.getTitle())
                                        navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
                                    }}

                                    clearOnClose={false} // delete the values of the form when unmounted

                                    defaults={{
                                        /*
                                         username: 'Farid',
                                         'gender{M}': true,
                                         password: 'abcdefg',
                                         country: 'FR',
                                         birthday: new Date(((new Date()).getFullYear() - 18)+''),
                                         */
                                    }}

                                    validators={{
                                        fullName: {
                                            title: 'Full name',
                                            validate: [{
                                                validator: 'isLength',
                                                arguments: [1, 23],
                                                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                                            }]
                                        },
                                        username: {
                                            title: 'Username',
                                            validate: [{
                                                validator: 'isLength',
                                                arguments: [3, 16],
                                                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                                            },{
                                                validator: 'matches',
                                                arguments: /^[a-zA-Z0-9]*$/,
                                                message: '{TITLE} can contains only alphanumeric characters'
                                            }]
                                        },
                                        password: {
                                            title: 'Password',
                                            validate: [{
                                                validator: 'isLength',
                                                arguments: [6, 16],
                                                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                                            }]
                                        },
                                        emailAddress: {
                                            title: 'Email address',
                                            validate: [{
                                                validator: 'isLength',
                                                arguments: [6, 255],
                                            },{
                                                validator: 'isEmail',
                                            }]
                                        },
                                        bio: {
                                            title: 'Biography',
                                            validate: [{
                                                validator: 'isLength',
                                                arguments: [0, 512],
                                                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                                            }]
                                        },
                                        gender: {
                                            title: 'Gender',
                                            validate: [{
                                                validator: (...args) => {
                                                    if (args[0] === undefined) {
                                                        return false;
                                                    }
                                                    return true;
                                                },
                                                message: '{TITLE} is required',
                                            }]
                                        },
                                        birthday: {
                                            title: 'Birthday',
                                            validate: [{
                                                validator: 'isBefore',
                                                arguments:[moment().utc().subtract(18, 'years').format('YYYY-MM-DD')],
                                                message: 'You must be at least 18 years old'
                                            }, {
                                                validator: 'isAfter',
                                                arguments:[moment().utc().subtract(100, 'years').format('YYYY-MM-DD')],
                                                message: '{TITLE} is not valid'
                                            }]
                                        },
                                        country: {
                                            title: 'Country',
                                            validate: [{
                                                validator: 'isLength',
                                                arguments: [2],
                                                message: '{TITLE} is required'
                                            }]
                                        },
                                    }}
                                >

                                    <GiftedForm.SeparatorWidget />
                                    <GiftedForm.TextInputWidget
                                        name='fullName' // mandatory
                                        title='Full name'



                                        placeholder='Marco Polo'
                                        clearButtonMode='while-editing'
                                    />


                                    <GiftedForm.TextInputWidget
                                        name='username'
                                        title='Username'


                                        placeholder='MarcoPolo'
                                        clearButtonMode='while-editing'

                                        onTextInputFocus={(currentText = '') => {
                                            if (!currentText) {
                                                let fullName = GiftedFormManager.getValue('signupForm', 'fullName');
                                                if (fullName) {
                                                    return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
                                                }
                                            }
                                            return currentText;
                                        }}
                                    />

                                    <GiftedForm.TextInputWidget
                                        name='password' // mandatory
                                        title='Password'

                                        placeholder='******'


                                        clearButtonMode='while-editing'
                                        secureTextEntry={true}

                                    />

                                    <GiftedForm.TextInputWidget
                                        name='emailAddress' // mandatory
                                        title='Email address'
                                        placeholder='example@nomads.ly'

                                        keyboardType='email-address'

                                        clearButtonMode='while-editing'


                                    />

                                    <GiftedForm.SeparatorWidget />

                                    <GiftedForm.ModalWidget
                                        title='Gender'
                                        displayValue='gender'

                                    >
                                        <GiftedForm.SeparatorWidget />

                                        <GiftedForm.SelectWidget name='gender' title='Gender' multiple={false}>
                                            <GiftedForm.OptionWidget  title='Female' value='F'/>
                                            <GiftedForm.OptionWidget  title='Male' value='M'/>
                                        </GiftedForm.SelectWidget>



                                    </GiftedForm.ModalWidget>

                                    <GiftedForm.ModalWidget
                                        title='Birthday'
                                        displayValue='birthday'


                                        scrollEnabled={false}
                                    >
                                        <GiftedForm.SeparatorWidget/>

                                    </GiftedForm.ModalWidget>
                                    <GiftedForm.ModalWidget
                                        title='Country'
                                        displayValue='country'

                                        scrollEnabled={false}

                                    >
                                        <GiftedForm.SeparatorWidget />
                                        <GiftedForm.SelectCountryWidget
                                            code='alpha2'
                                            name='country'
                                            title='Country'
                                            autoFocus={true}
                                        />
                                    </GiftedForm.ModalWidget>


                                    <GiftedForm.ModalWidget
                                        title='Biography'
                                        displayValue='bio'



                                        scrollEnabled={true} // true by default
                                    >
                                        <GiftedForm.SeparatorWidget/>
                                        <GiftedForm.TextAreaWidget
                                            name='bio'

                                            autoFocus={true}

                                            placeholder='Something interesting about yourself'
                                        />
                                    </GiftedForm.ModalWidget>



                                    <GiftedForm.SubmitWidget
                                        title='Sign up'
                                        widgetStyles={{
                                            submitButton: {
                                                backgroundColor:"red" //themes.mainColor,
                                            }
                                        }}
                                        onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                                            if (isValid === true) {
                                                // prepare object
                                                values.gender = values.gender[0];
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
                                        title='By signing up, you agree to the Terms of Service and Privacy Policity.'
                                    />

                                    <GiftedForm.HiddenWidget name='tos' value={true} />

                                </GiftedForm>
                            </View>);

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
                                <View style={[{marginTop:50}]}/>
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
                                    title='Category'
                                    displayValue='category'>
                                    <GiftedForm.SeparatorWidget />
                                    <View style={[{marginTop:50}]}/>

                                    <GiftedForm.SelectWidget name='category' title='Category' multiple={false}>
                                        {this.categories().map((child, i)=>{
                                            //alert(child)
                                            return(<GiftedForm.OptionWidget key={i} title={child} value={child}/>)})}


                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Condition'
                                    displayValue='itemCondition'>
                                    <GiftedForm.SeparatorWidget />
                                    <View style={[{marginTop:50}]}/>
                                    <GiftedForm.SelectWidget name='itemCondition' title='Item Condition' multiple={false}>

                                        <GiftedForm.OptionWidget  title='Brand New' value='New'/>
                                        <GiftedForm.OptionWidget  title='Refurbished' value='Refurbished'/>
                                        <GiftedForm.OptionWidget  title='Used' value='used'/>

                                    </GiftedForm.SelectWidget>



                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Availability'
                                    displayValue='availability'>
                                    <GiftedForm.SeparatorWidget />
                                    <View style={[{marginTop:50}]}/>

                                    <GiftedForm.SelectWidget name='availability' title='Availability' multiple={false}>

                                         <GiftedForm.OptionWidget  title="In Stock" value="InStock"/>
                                        <GiftedForm.OptionWidget  title="Out Of Stock" value="OutOfStock"/>
                                        <GiftedForm.OptionWidget  title="Sold Out" value="SoldOut"/>
                                        <GiftedForm.OptionWidget  title="Pre Order" value="PreOrder"/>


                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Area Served'
                                    displayValue='areaServed'



                                    scrollEnabled={true} // true by default
                                >
                                    <View style={[{marginTop:50}]}/>
                                    <GiftedForm.SelectWidget name='areaServed' title='Area Served' multiple={false}>
                                        <GiftedForm.OptionWidget  title="Main Campus" value="MAIN"/>
                                        <GiftedForm.OptionWidget  title="Mazimbu Campus" value="SMC"/>

                                    </GiftedForm.SelectWidget>

                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Delivery Methods'
                                    displayValue='availableDeliveryMethod'>
                                    <GiftedForm.SeparatorWidget />
                                    <View style={[{marginTop:50}]}/>

                                    <GiftedForm.SelectWidget name='availableDeliveryMethod' title='Delivery Methods' multiple={false}>
                                        <GiftedForm.OptionWidget  title="Pick up" value="pickUp"/>
                                        <GiftedForm.OptionWidget  title="Postal Shipping" value="Shipping"/>

                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.SeparatorWidget />
                                <GiftedForm.ModalWidget
                                    title='Price'
                                    displayValue='price'>
                                    <GiftedForm.SeparatorWidget />
                                    <View style={[{marginTop:50}]}/>

                                    <GiftedForm.TextInputWidget
                                        name='price' // mandatory
                                        title='Price per Item'

                                        placeholder='price of single unit'

                                        keyboardType='numeric'

                                        clearButtonMode='while-editing'


                                    />


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Currency'
                                    displayValue='currency'>
                                    <GiftedForm.SeparatorWidget />
                                    <View style={[{marginTop:50}]}/>

                                    <GiftedForm.SelectWidget name='currency' title='Currency' multiple={false}>
                                        <GiftedForm.OptionWidget  title="Tanzania Shilling's" value="TZS"/>
                                        <GiftedForm.OptionWidget  title="US Dollar's" value="USD"/>
                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Payment Methods'
                                    displayValue='acceptedPaymentMethod'>
                                    <GiftedForm.SeparatorWidget />
                                    <View style={[{marginTop:50}]}/>

                                    <GiftedForm.SelectWidget name='acceptedPaymentMethod' title='Payment Methods' multiple={false}>
                                        <GiftedForm.OptionWidget  title="On Delivery" value="OnDelivery"/>
                                        <GiftedForm.OptionWidget  title="Tigo Pesa" value="TigoPesa"/>


                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.SeparatorWidget />

                                <GiftedForm.ModalWidget
                                    title='Description'
                                    displayValue='description'



                                    scrollEnabled={true} // true by default
                                >
                                    <View style={[{marginTop:50}]}/>
                                    <GiftedForm.SeparatorWidget/>
                                    <GiftedForm.TextAreaWidget
                                        name='description'
                                        autoFocus={true}
                                        placeholder='Short description of the product'
                                    />
                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Warranty'
                                    displayValue='warranty'>
                                    <GiftedForm.SeparatorWidget />
                                    <View style={[{marginTop:50}]}/>

                                    <GiftedForm.SeparatorWidget/>
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
                                            backgroundColor:"red" //themes.mainColor,
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

                            </GiftedForm>

                        );
                    },

                    // When this scene receives focus, you can run some code. We're just
                    // proxying the `didfocus` event that Navigator emits, so refer to
                    // Navigator's source code for the semantics.
                    onDidFocus(event) {
                        console.log('Home Scene received focus.');
                    },

                    // Return a string to display in the title section of the navigation bar.
                    // This route's title is displayed next to the back button when you push
                    // a new route on top of this one.
                    getTitle() {
                        return 'New product';
                    },


                    renderLeftButton() {
                        return (
                            <View></View>
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




