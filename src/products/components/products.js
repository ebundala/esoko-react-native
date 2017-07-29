/**
 * Created by ebundala on 3/11/2017.
 */
import React, {Component, PropTypes} from "react";
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    TextInput,
    TouchableHighlight,
    PixelRatio,
    Alert,
    ViewPagerAndroid,
    TouchableNativeFeedback,
    WebView,
    Picker,
    Animated,Dimensions
} from "react-native";
import {Card} from 'react-native-material-design';
import {Toolbar, Divider, Icon, ActionButton, RippleFeedback} from 'react-native-material-ui';
import Button from 'apsl-react-native-button'
import StarRating from 'react-native-star-rating';
import { SearchBar } from 'react-native-elements'
//import Accordion from "react-native-accordion"
//import {Statuses,Menu}  from "../../statuses/components/statuses"
import styles, {typographyStyle, colorStyle, colours} from "../../styles/styles"
//import CollapsingHeaderWithScroll from './CollapsingHeaderWithScroll';
import Interactable from 'react-native-interactable';

import Firestack from 'react-native-firestack'
import {shortenText} from '../../utils/utils'
import {DB} from "../../utils/database"

import {uiTheme} from "../../app"
let moment = require('moment');
//let ctx;
const firestack = new Firestack();
const Screen = {
    height: Dimensions.get('window').height - 75
};

export class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        this.state = {
            canScroll: false,
            query: null,
            subCategory: "All",
            subCategories:[],
            products: []
        };
        this._deltaY = new Animated.Value(0);



    }
    filterChanged(subCategory) {
        let {category}=this.props.navigation.state.params;
        let that = this;
        DB.getProducts(null,subCategory).then((products) => {
            //console.log(products)
            //dispatch({type: PRODUCTS_ACTIONS.GET, data: products});
            // navigate("products", {category})
            if (products.length === 0) {

                that.setState({error: "Nothing was found at " + this.state.subCategory+" ,"+category.categoryName})

            } else {

                that.setState({products: products})
            }

        }).catch((e) => {

            that.setState({error: e.message})
            console.log(e)
        })

    }

    componentDidMount() {
        let {category}=this.props.navigation.state.params;
        let that = this;


        DB.query("SELECT c.term_taxonomy_id,t.term_id,t.name,t.slug,c.taxonomy,c.parent FROM "+DB.term_taxonomy+" c JOIN "+DB.terms+" t ON c.term_id=t.term_id WHERE c.parent="+category.term_id )
            .then((res)=>{

                this.setState({subCategories:res.rows.raw()});


                return   DB.query("SELECT c.term_taxonomy_id AS term_taxonomy,c.term_id AS term_id,c.taxonomy AS taxonomy,c.parent AS parent,t.name AS name,d.post_title as title FROM "+DB.term_taxonomy+" c JOIN ("+DB.term_taxonomy+"  p,"+DB.terms+"  t,"+DB.posts+" d,"+DB.term_relationships+" r) ON (p.term_id=c.parent AND c.term_id=t.term_id AND c.term_taxonomy_id=r.term_taxonomy_id AND d.ID=r.object_id) WHERE p.term_id="+category.term_id).then((products) => {
                    //let res=[];
                    if(products.rows.length){
                        for(let i=0;i<products.rows.length;i++){
                            console.log(products.rows.item(i));
                        }
                        ///that.setState({products: products.rows.raw()})
                    }

                    else{

                        that.setState({error:"Nothing was found at " + this.state.subCategory+" ,"+category.name})

                    }

                }).catch((e) => {
                    //alert("error occured");
                    that.setState({error: e.message});
                    console.log(e)
                })
            }).catch((e)=>{
            alert("error "+e.message);
        })



        //alert(this.state.subCategory+" "+category.categoryName)
    }

    openDrawer() {
        this.props.screenProps.drawer.openDrawer()
    }
    onSnap(event) {
        const { id } = event.nativeEvent;

        if (id === 'bottom') {
            this.setState({ canScroll: true });
            console.log('This implementation is still broken, in progress');
        }

    }
    onScroll(event) {

        const { contentOffset } = event.nativeEvent;
       // console.log(contentOffset);
        if (contentOffset.y === 0) {
            this.setState({ canScroll: false });
        }
    }
    render() {
        //ctx = this;
        let {navigate, goBack} = this.props.navigation;
        let {category,}=this.props.navigation.state.params;
        let props = this.props.screenProps;


        const {primaryColor,filterBackgroundColor,mainTextColor} = uiTheme.palette;
        return (
            <View style={[styles.flex1]}>
                <Toolbar style={{zIndex:9,elevation:5}}
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        goBack();
                    }}
                    centerElement={category.slug}
                    searchableh={{
                        autoFocus: true,
                        placeholder: 'Search',
                        onSubmitEditing: e => {
                            if (this.state.query) {

                                props.searchProducts(this.state.query, category.categoryName, navigate)
                            }

                        },
                        onChangeText: query => this.setState({query})
                    }
                    }
                />
                <Animated.View style={{zIndex:5,elevation:3,
                    transform: [
                        {
                            translateY: this._deltaY.interpolate({
                                inputRange: [-150, -150, 0, 0],
                                outputRange: [-150, -150, 0, 0]
                            })
                        },
                        {
                            scaleY: this._deltaY.interpolate({
                                inputRange: [-150, -150, 0, 0],
                                outputRange: [0.1, 0.1, 1, 1]
                            })
                        }
                    ]
                }}>
                <View style={{height:150,backgroundColor:filterBackgroundColor}}>


                    <SearchBar
                        round
                        lightTheme
                        onChangeText={()=>{}}
                        placeholder='Search...' />

                    <Card style={[styles.centerJustified,{height:36,backgroundColor:uiTheme.COLOR.teal300,borderColor:"transparent",borderRadius:5}]}>
                        <Picker mode="dropdown" style={{color:mainTextColor}}
                                selectedValue={this.state.subCategory}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({subCategory: itemValue});
                                    //this.filterChanged(itemValue);

                                }}>

                            {this.state.subCategories.map((item, i) => {
                                return <Picker.Item key={item.name} label={item.name} value={item.term_taxonomy_id}/>

                            })}

                        </Picker>
                    </Card>
                    {false&&<Card style={[styles.centerJustified,{height:36,backgroundColor:uiTheme.COLOR.teal300,borderColor:"transparent",borderRadius:5}]}>
                        <View style={[styles.horizontal]}>
                            <View style={[styles.flex9]}>


                                <TextInput
                                    ref={component => this.searchInput = component}
                                    keyboardType="web-search"
                                    style={[styles.input,{backgroundColor:uiTheme.COLOR.teal300,color:mainTextColor}]}
                                    autoCorrect={true}
                                    autoCapitalize="none"
                                    placeholderTextColor={mainTextColor}
                                    placeholder={"Search "}
                                    underlineColorAndroid={uiTheme.COLOR.teal500}
                                    onSubmitEditing={(e) => {
                                        if (this.state.query) {
                                            this.searchInput.blur();
                                            if (this.state.query) {

                                                props.searchProducts(this.state.query, category.categoryName, navigate)
                                            }
                                        }
                                        else
                                            this.searchInput.focus();
                                    }}
                                    onChangeText={query => this.setState({query})}
                                />

                            </View>
                            <TouchableNativeFeedback onPress={() => {
                                if (this.state.query) {
                                    this.searchInput.blur();


                                    props.searchProducts(this.state.query, category.categoryName, navigate)


                                }
                                else
                                    this.searchInput.focus();
                            }}>
                                <View
                                    style={[styles.flex1, styles.centerJustified, styles.alignItemsCenter]}>
                                    <Icon name="search" color={mainTextColor}/>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </Card>}
                    <View style={[styles.alignSelfEnd]}>
                        <Icon name="arrow-drop-up" color={mainTextColor}/>
                    </View>
                    {false&&<Text>
                        {this.state.error}
                    </Text>}

                </View>
                </Animated.View>
            <Interactable.View
                verticalOnly={true}
                snapPoints={[{y: 0}, {y: -150, id: 'bottom'}]}
                boundaries={{top: -150}}
                onSnap={this.onSnap.bind(this)}
                animatedValueY={this._deltaY}>
                    <ListView
                        bounces={false}
                        canCancelContentTouches={this.state.canScroll}
                        scrollEnabled={this.state.canScroll}
                        onScroll={this.onScroll.bind(this)}
                                      dataSource={this.ds.cloneWithRows(this.state.products)}
                                      contentContainerStyle={[{elevation:0},styles.horizontal, styles.spaceAround, styles.flexWrap]}
                                      scrollRenderAheadDistance={640}
                                      enableEmptySections={true}
                                      renderRow={(data) =>
                                          <TouchableNativeFeedback onPress={() => navigate("singleProduct", {
                                              data: data
                                          })}>
                                              <View style={[, {
                                                  height: 220,
                                                  width: 180
                                              },

                                              ]}>
                                                  <Card style={[styles.flex1]}>

                                                      <View style={[styles.flex1]}>
                                                          <Image style={[{
                                                              marginTop: 16, marginBottom: 8,
                                                              width: 132, height: 132,
                                                              resizeMode: Image.resizeMode.stretch,
                                                              backgroundColor: colours.paperGrey300.color
                                                          }]}
                                                                 source={{uri: "data.photos[0].downloadUrl"}}>

                                                          </Image>
                                                          <View style={[styles.spaceAround, styles.alignItemsCenter, {height: 40}]}>
                                                              <View
                                                                  style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                                  <Text numberOfLines={1} style={[styles.productTitle]}>
                                                                      {data.post_title}
                                                                  </Text>
                                                              </View>
                                                              <View
                                                                  style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                                  <Text numberOfLines={1} style={[styles.currency]}>
                                                                      {data.currency}
                                                                  </Text>
                                                                  <Text numberOfLines={1} style={[styles.price]}>
                                                                      {data.price}
                                                                  </Text>
                                                              </View>
                                                          </View>
                                                      </View>


                                                  </Card>
                                              </View>
                                          </TouchableNativeFeedback>}
                    />

                    {false && <Card style={[{
                        height: 50,
                        margin: 0,
                        elevation: 4,
                        borderRadius: 0,
                        //backgroundColor:colours.paperTeal500.color
                    }]}>
                        <View style={[styles.horizontal,{}]}>

                            <View style={[styles.flex9]}>


                                <TextInput
                                    ref={component => this.searchInput = component}
                                    keyboardType="web-search"
                                    style={styles.input}
                                    autoCorrect={true}
                                    autoCapitalize="none"
                                    placeholder={"Search " + title}
                                    placeholderTextColor={colours.paperGrey500.color}
                                    underlineColorAndroid="transparent"
                                    onSubmitEditing={(e) => {
                                        if (this.state.query) {
                                            this.searchInput.blur();
                                            props.searchProducts(this.state.query, title, navigate)
                                        }
                                        else
                                            this.searchInput.focus();
                                    }}
                                    onChangeText={query => this.setState({query})}
                                />

                            </View>
                            <TouchableNativeFeedback onPress={() => {
                                if (this.state.query) {
                                    this.searchInput.blur();
                                    props.searchProducts(this.state.query, title, navigate)
                                }
                                else
                                    this.searchInput.focus();
                            }}>
                                <View style={[styles.flex1, styles.centerJustified, styles.alignItemsCenter]}>
                                    <Icon name="search"/>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </Card>}

            </Interactable.View>

            </View>

        )
    }


}

export class SingleProductView extends Component {

    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        this.state = {starCount: 5}
    }

    render() {
        let {navigate, goBack} = this.props.navigation;
        let {data}=this.props.navigation.state.params;
        let props = this.props.screenProps;
        let reviews = [];

        let len = 5//data.photos.length;
        for (let i = 0; i < 9; i++) {
            reviews.push({
                reviewerName: "Elias Bundala",
                rating: Math.random() * 5,
                body: "hello this is a terible product dont buy it an way too expensive",
                reviewerAvator: "data.photos[0].downloadUrl"
            })
        }


        return (
            <View style={[styles.flex1]}>

                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        goBack();
                    }}
                    centerElement={data.name}

                />


                <ScrollView >
                    <View >
                        <Card ref="mainCard" style={[{height: 360}]}>
                            <View style={[styles.flex8, {marginVertical: 16}]}>
                                <ViewPagerAndroid
                                    keyboardDismissMode='on-drag'
                                    initialPage={0}
                                    scrollEnabled={true}

                                    style={{flex: 1}}
                                    ref={(el) => this._viewPager = el}>
                                    {this._renderImages().map((child, i, photos) => (
                                        <View
                                            key={"key" + i}
                                            testID={"test" + i}
                                            style={[styles.flex1, {backgroundColor: colours.paperGrey500.color}]}>
                                            <Image style={[styles.flex1, {
                                                backgroundColor: colours.paperGrey200.color,
                                                width: null,
                                                height: null,
                                                resizeMode: Image.resizeMode.cover
                                            }]}
                                                   source={{uri: "child.downloadUrl"}}>
                                                <Text style={[{
                                                    position: "absolute",
                                                    bottom: 8,
                                                    left: 8
                                                }]}>{i + 1 + "/" + photos.length}</Text>
                                            </Image>
                                        </View>
                                    ))}
                                </ViewPagerAndroid>
                            </View>
                            <View style={[styles.flex2, styles.horizontal,]}>
                                <View style={[styles.flex8, styles.centerJustified]}>
                                    <View style={[styles.horizontal]}>
                                        <Text style={[colorStyle.paperGrey900, {fontSize: 14, fontWeight: "500"}]}>
                                            {data.post_title}
                                        </Text>
                                    </View>

                                </View>
                                <View
                                    style={[styles.flex4, styles.centerJustified, styles.alignItemsCenter, {margin: 8}]}>
                                    < View style={[styles.horizontal]}>
                                        <Text style={[colorStyle.paperGrey900, {
                                            fontSize: 14,
                                            fontWeight: "500",
                                            textAlign: "center"
                                        }]}>
                                            {data.currency} {data.price}

                                        </Text>
                                    </View>
                                </View>

                            </View>

                        </Card>
                        <Card>


                            <View ref="description" style={[styles.flex1, {height: 50}]}>

                                <View style={[styles.flex1, styles.horizontal]}>

                                    <View style={[styles.centerJustified]}>
                                        <Text style={[styles.title, {fontSize: 12}]}>
                                            DESCRIPTION

                                        </Text>
                                    </View>


                                </View>

                            </View>


                            <View>
                                <Divider/>
                                <Text style={[typographyStyle.paperFontBody1, {padding: 8}]}>
                                    {data.post_content}
                                </Text>
                            </View>

                        </Card>
                        <Card  >


                            <View ref="reviews" style={[styles.flex1, {height: 50}]}>
                                <View style={[styles.flex1, styles.horizontal]}>

                                    <View style={[styles.centerJustified]}>
                                        <Text style={[styles.title, {fontSize: 12}]}>
                                            REVIEWS

                                        </Text>
                                    </View>


                                </View>
                            </View>
                            <View style={[styles.horizontal, styles.alignItemsCenter]}>

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
                            <View style={[{paddingVertical: 8}]}>

                                <Button onPress={() => {
                                    data.reviews = reviews;
                                    props.reviewProduct(data, navigate)
                                }}>
                                    <Text>{"Rate this"}</Text>
                                </Button>

                                <ListView dataSource={this.ds.cloneWithRows(this.renderReview(reviews))}
                                          contentContainerStyle={[styles.spaceAround, styles.flexWrap]}

                                          enableEmptySections={true}
                                          renderRow={(review) =>

                                              <TouchableNativeFeedback title={"Review"}
                                                                       onPress={() => navigate("singleReview", {data: review})}>


                                                  <View style={[styles.horizontal, {paddingTop: 8}]}>
                                                      <View style={[styles.flex2]}>
                                                          <Image style={[{
                                                              backgroundColor: colours.paperGrey200.color,
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
                                                          <View style={[styles.horizontal, {width: 90}]}>
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
                                data.reviews = reviews;
                                props.allReviews(data, navigate)
                            }}>
                                <Text>{"ALL REVIEWS"}</Text>
                            </Button>


                            <View style={{paddingBottom: 50, paddingTop: 16}}>
                            </View>
                        </Card>

                    </View>
                </ScrollView>


                <ActionButton
                    actions={[
                        {
                            icon: 'gavel',
                            label: "Place bid",
                            name: "bid"
                        },
                        {
                            icon: 'sms',
                            label: "Message seller",
                            name: "chat"
                        },
                        {
                            icon: 'add-shopping-cart',
                            label: "Add to cart",
                            name: "favorite"
                        }]}
                    icon="shopping-cart"
                    transition="speedDial"
                    onPress={(text) => {
                        switch (text) {
                            case "chat":
                                setTimeout(() => {
                                    props.startChat(data, navigate);
                                }, 16)
                                break;
                            case"bid":
                                setTimeout(() => {
                                    props.placeBid(data, navigate);
                                }, 16)
                                break;
                            case"favorite":
                                break;
                        }


                    }}
                />


            </View>
        )
    }

    _renderImages() {
        let {data}=this.props.navigation.state.params
        if (data.hasOwnProperty("photos")) {
            if (data.photos instanceof Array) {
                return data.photos;
            }

            return Object.keys(data.photos).map(function (value, index) {
                return data.photos[value];
            });
        }
        return []
    }

    renderReview(reviews) {
        let rev = [];
        if (reviews instanceof Array) {

            if (reviews.length > 3) {
                for (let i = 0; i < 3; i++) {
                    rev.push(reviews[i])
                }

            } else {
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

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        this.state = {query: null}

    }

    render() {
       // ctx = this;
        let {navigate, goBack} = this.props.navigation;
        let {title, products}=this.props.navigation.state.params;
        let props = this.props.screenProps;
        // let {products}=this.props.screenProps
        return (
            <View style={[styles.flex1]}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        goBack();
                    }}
                    centerElement={title}


                />
                <ListView dataSource={this.ds.cloneWithRows(products)}
                          contentContainerStyle={[styles.horizontal, styles.spaceAround, styles.flexWrap]}
                          scrollRenderAheadDistance={640}
                          enableEmptySections={true}
                          renderRow={(data) =>
                              <TouchableNativeFeedback onPress={() => navigate("singleProduct", {
                                  data: data
                              })}>
                                  <View style={[, {
                                      height: 220,
                                      width: 180
                                  },

                                  ]}>
                                      <Card style={[styles.flex1]}>

                                          <View style={[styles.flex1]}>
                                              <Image style={[{
                                                  marginTop: 16, marginBottom: 8,
                                                  width: 132, height: 132,
                                                  resizeMode: Image.resizeMode.stretch,
                                                  backgroundColor: colours.paperGrey300.color
                                              }]}
                                                     source={{uri: data.photos[0].downloadUrl}}>

                                              </Image>
                                              <View style={[styles.spaceAround, styles.alignItemsCenter, {height: 40}]}>
                                                  <View
                                                      style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                      <Text style={[styles.productTitle]}>
                                                          {shortenText(data.name)}
                                                      </Text>
                                                  </View>
                                                  <View
                                                      style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                      <Text style={[styles.currency]}>
                                                          {data.currency}
                                                      </Text>
                                                      <Text style={[styles.price]}>
                                                          {data.price}
                                                      </Text>
                                                  </View>
                                              </View>
                                          </View>


                                      </Card>
                                  </View>
                              </TouchableNativeFeedback>}
                />


            </View>
        )
    }

    componentWillUpdate() {

    }

    openDrawer() {
        this.props.screenProps.drawer.openDrawer()
    }
}







import {ProductForm} from "../../forms/productForm"
//import dataScheme from "../../utils/dataSchema";
export class CreateProduct extends Component {
    constructor(props) {
        super(props);
        let {user}=this.props.screenProps;
        this.state = {
            options:{},
            ready:false
        }
    }

  getFields() {

      return [
          {
              ID: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "hidden",
                  order: 0,
                  label: "ID",

                  props:{
                      placeholder: "",
                      isRequired:false,
                      isMeta:false

                  },

              }
          },
          {
              post_author: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "filePicker",
                  order: 7,
                  label: "Photos",
                  placeholder: "",
                  props: {

                  }
              }
          },
          {
              post_date: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "modal",
                  order: 0,
                  label: "Date",
                  placeholder: "",
                  props: {
                      fields:[
                          {
                              post_authorr: {
                                  validator: {
                                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                                      validator: "isLength",
                                      args: [2, 32]

                                  },
                                  widget: "text",
                                  order: 7,
                                  label: "Author",
                                  placeholder: "",
                                  props: {
                                      value:"hello world",
                                      isRequired:true,
                                      isMeta:true,
                                  }
                              }
                          },
                          {
                              post_authorry: {
                                  validator: {
                                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                                      validator: "isLength",
                                      args: [2, 32]

                                  },
                                  widget: "text",
                                  order: 0,
                                  label: "Description",
                                  placeholder: "",
                                  props: {
                                      value:"hello world",
                                      isRequired:true,
                                      isMeta:true,
                                      vertical: true,
                                      lines: 5,
                                  }
                              }
                          }
                      ]}
              }
          },
          // post_date_gmt:"" ,
          {
              post_content: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "text",
                  order: -9,
                  label: "Description",


                  props: {
                      placeholder: "",
                      value:"hello world",
                      isRequired:true,
                      isMeta:true,
                      vertical: true,
                      lines: 5,
                  }
              }
          },
          {
              post_title: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "text",
                  order: 9,
                  label: "Title",

                  placeholder: "",
                  props: {
                      value:"hello world",
                      isRequired:false,
                      isMeta:true,
                      vertical: true,
                      lines: 1,
                  }
              }
          },
          // post_excerpt:"" ,
          {
              post_status: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: (value,a,b)=>{return !!value},
                      args: [2, 32]

                  },
                  widget: "picker",
                  order: 5,
                  label: "Status",
                  props: {
                      pickerProps:{},
                      value:"Draft",
                      items:[
                          {label:"Draft",value:"Draft"},
                          {label:"Published",value:"Published"},
                          {label:"Archived",value:"Archived"},
                          {label:"Deleted",value:"Deleted"},

                      ]
                  }
              }
          },
          {
              comment_status: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "hidden",
                  order: 0,
                  label: "Comment Enabled",
                  props: {
                      value:"hello world",
                      fields:[
                          {
                              post_photos: {
                                  validator: {
                                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                                      validator: "isLength",
                                      args: [2, 32]

                                  },
                                  widget: "filePicker",
                                  order: 7,
                                  label: "Value",
                                  placeholder: "",
                                  props: {}
                              }
                          },
                          {
                              post_photosM: {
                                  validator: {
                                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                                      validator: "isLength",
                                      args: [2, 32]

                                  },
                                  widget: "modal",
                                  order: 0,
                                  label: "Photos",
                                  placeholder: "",
                                  props: {

                                  }
                              }
                          }
                      ]
                  }
              }
          },
          //ping_status:"" ,
          //post_password:"" ,
          {
              post_name: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "hidden",
                  order: 0,
                  label: "Name",

                  props: {
                      value:"hello world",
                  }
              }
          },
          // to_ping:"" ,
          //pinged:"" ,
          {
              post_modified: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "hidden",
                  order: 0,
                  label: "Modified",
                  props: {
                      value:"hello world",
                  }
              }
          },
          // post_modified_gmt:"",
          // post_content_filtered:"",
          {
              post_parent: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "hidden",
                  label: "Parent",
                  order: 0,
                  props: {
                      value:"hello world",
                  }
              }
          },
          {
              guid: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "hidden",
                  label: "SKU",
                  order: 0,
                  props: {
                      value:"hello world",
                  }
              }
          },
          {
              menu_order: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "hidden",
                  label: "Order",
                  order: 0,
                  props: {}
              }
          },
          {
              post_type: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "filePicker",
                  label: "Type",
                  order: 0,
                  props: {
                      isRequired:true,
                      isMeta:false,
                  }
              }
          },
          {
              post_mime_type: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "hidden",
                  label: "Mime",
                  order: 0,
                  props: {}
              }
          },
          {
              comment_count: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "hidden",
                  label: "Count",
                  order: 0,
                  props: {}
              }
          },
          {
              app_id: {
                  validator: {
                      errorMessage: "[TITLE] must be args[0] to args[1] characters",
                      validator: "isLength",
                      args: [2, 32]

                  },
                  widget: "hidden",
                  label: "App id",
                  order: 0,
                  props: {}
              }
          }
      ];

     let metadata={
          description: String,
              price: {
          value:Number,
              unit:String},
          size: {
              value:Number,
                  unit:String
          },
          location: {
              region:  String,
                  street:String,
                  district: String,
                  ward: String
          },
          legal: {
              surveyed: Boolean,
                  planned:Boolean,
                  titleDeed:Boolean},
          rating: {
              value: Number,
                  count: Number
          },
          photos: Array,

              services: {
          water:Boolean,
              electricity:Boolean,
              roads:Boolean},
          seller: {
              name: String,
                  phones: String,
                  email: String,
                  address: String
          },
          createdAt:Date,
              editedAt:Date,
          expireAt:Date,
          sold:Boolean};


  }
  componentDidMount(){
      DB.query("SELECT c.term_taxonomy_id,t.term_id,t.name,t.slug,c.taxonomy,c.parent FROM "+DB.term_taxonomy+" c JOIN "+DB.terms+" t ON c.term_id=t.term_id WHERE c.taxonomy='location'" )
          .then((res)=>{

          let options=[],item;

          for(let i=0;i<res.rows.length;i++){
          item=res.rows.item(i);
          options.push({value:item.term_taxonomy_id,label:item.name});
          //debugger;

          }
          //console.log(options);
              this.setState({options:options,ready:true});


          }).catch((e)=>{
          alert("error "+e.message);
      })
  }
    render() {

        let { goBack} = this.props.navigation;
        let title = "New item";
        let {user}=this.props.screenProps;
       // const {primaryColor} = uiTheme.palette;



        return (
            <View style={[styles.flex1]}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        goBack();
                    }}
                    centerElement={title}


                />
                <ScrollView style={{flex: 1}}>
                    <Card style={{flex: 1}}>
                        {false&&<ProductForm formName="terms" title={title} fields={[


                            {

                                term_id:{
                                widget: "modal",
                                order: 0,
                                label: "term id",
                                props:{
                                    fields:[{
                                   slugv:{
                                       validator: {
                                           errorMessage: "[TITLE] must have atleast args[0] to args[1] values",
                                           validator: (arr)=>{  return arr instanceof Array?arr.length:!!arr},
                                           args: [1, 5]

                                       },
                                widget: "option",
                                order: 0,
                                label: "slug v",
                                props:{
                                    pickerProps: {
                                        options:{"i":"john","j":"vero"}
                                    },
                                    isRequired:true,
                                    isMeta:true
                                }
                            }

                                    }],
                                placeholder: "id",
                                isRequired:true,
                                isMeta:false

                                }
                            }},
                            {name:{
                                widget: "text",

                                order: 5,
                                label: "name",
                            props:{
                                placeholder: "name",
                                isRequired:false,
                                isMeta:false}
                            }},
                            { slug:{
                                widget: "text",
                                order: 0,
                                label: "slug",
                               props:{
                                placeholder: "slug",
                                isRequired:false,
                                isMeta:false
                                }
                            }},
                            {term_group:{
                                widget: "text",
                                order: 0,
                                label: "group",
                                props:{ placeholder: "group",
                                isRequired:false,
                                isMeta:false}
                            }}

                        ]}/>}
                    </Card>
                    <Card style={{flex: 1}}>
                        {this.state.ready&&<ProductForm formName="createForm" title={title} fields={[

                            {post_title:{
                                widget: "text",
                                order: 50,
                                label: "Title",
                                props:{
                                    placeholder: "Item title",
                                    isRequired:true,
                                    isMeta:false}
                            }},
                            {post_content:{
                                widget: "text",
                                order: 5,
                                label: "Description",
                                props:{
                                    lines:7,
                                    vertical:true,
                                    placeholder: "Item description",
                                    isRequired:true,
                                    isMeta:false}

                            }},
                            {post_type:{
                                widget: "hidden",
                                order: 0,
                                label: "Description",
                                props:{
                                    value:"product",
                                    isRequired:true,
                                    isMeta:false}

                            }},
                            {term_relationships:{
                                widget: "modal",
                                order: 6,
                                label: "Location",
                                props:{
                                    fields:[{
                                        term_relationships:{
                                        widget: "option",
                                        order: 5,
                                        label: "Location",
                                        props:{
                                            pickerProps:{
                                            options:this.state.options,
                                                multiple:true
                                            },
                                            isRequired:true,
                                            isMeta:false}

                                    }}]
                                    }


                            }},
                            {post_photos:{
                                widget: "filePicker",
                                order: 5,
                                label: "Photos",
                                props:{
                                    isRequired:true,
                                    isMeta:true
                                }
                            }},
                            {post_author:{
                                widget: "hidden",
                                order: 0,

                                props:{
                                    value:user,
                                    isRequired:true,
                                    isMeta:false
                                }
                            }},
                        ]}/>}
                    </Card>
                </ScrollView>
            </View>)

    }
}















