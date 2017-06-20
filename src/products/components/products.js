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
    Picker
} from "react-native";
import {Card} from 'react-native-material-design';
import {Toolbar, Divider, Icon, ActionButton, RippleFeedback} from 'react-native-material-ui';
//import  {Navigator} from 'react-native-depricated-custom-component'
import Button from 'apsl-react-native-button'
import StarRating from 'react-native-star-rating';
//import Accordion from "react-native-accordion"
//import {Statuses,Menu}  from "../../statuses/components/statuses"
import styles, {typographyStyle, colorStyle, colours} from "../../styles/styles"
//import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
//import ExNavigator from '@expo/react-native-navigator';
import Firestack from 'react-native-firestack'
import {shortenText} from '../../utils/utils'
import {DB} from "../../utils/database"

import {uiTheme} from "../../app"
let moment = require('moment');
let ctx;
const firestack = new Firestack();


export class ProductsList extends Component {


    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        this.state = {
            query: null,
            subCategory: "All",
            products: []
        }

    }

    render() {
        ctx = this;
        let {navigate, goBack} = this.props.navigation;
        let {category,}=this.props.navigation.state.params;
        let props = this.props.screenProps;
        // let {products}=this.props.screenProps
        if (category.subCategories instanceof Array) {
            if (category.subCategories[0] !== "All")
                category.subCategories.unshift("All")
        }

        return (
            <View style={[styles.flex1]}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        goBack();
                    }}
                    centerElement={category.categoryName}
                    searchable={{
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

                <Picker
                    selectedValue={this.state.subCategory}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({subCategory: itemValue})
                        this.filterChanged(itemValue);

                    }}>

                    {category.subCategories.map((item, i) => {
                        return <Picker.Item key={item} label={item} value={item}/>

                    })}

                </Picker>
                {this.state.error && <View>
                    <Text >
                        {this.state.error}
                    </Text>

                </View>}
                <ListView dataSource={this.ds.cloneWithRows(this.state.products)}
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
                                                      <Text numberOfLines={1} style={[styles.productTitle]}>
                                                          {data.name}
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
                    <View style={[styles.horizontal]}>

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

            </View>
        )
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
        DB.getProducts(category.categoryName).then((products) => {
            //console.log(products)
            //dispatch({type: PRODUCTS_ACTIONS.GET, data: products});
            // navigate("products", {category})
            if (products.length === 0) {

                that.setState({error: "Nothing was found at " + this.state.subCategory+" ,"+category.categoryName})

            } else {

                that.setState({products: products})
            }

        }).catch((e) => {
            //alert("error occured");
            that.setState({error: e.message})
            console.log(e)
        })


        //alert(this.state.subCategory+" "+category.categoryName)
    }

    openDrawer() {
        this.props.screenProps.drawer.openDrawer()
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

        let len = data.photos.length;
        for (let i = 0; i < 9; i++) {
            reviews.push({
                reviewerName: "Elias Bundala",
                rating: Math.random() * 5,
                body: "hello this is a terible product dont buy it an way too expensive",
                reviewerAvator: data.photos[0].downloadUrl
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
                                            style={[styles.flex1, {backgroundColor: colours.paperTeal50.color}]}>
                                            <Image style={[styles.flex1, {
                                                width: null,
                                                height: null,
                                                resizeMode: Image.resizeMode.cover
                                            }]}
                                                   source={{uri: child.downloadUrl}}>
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
                                            {data.name}
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
                                    {data.description}
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
        ctx = this;
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


let WidgetMixin = require('react-native-gifted-form/mixins/WidgetMixin.js');


const MultOptionWidget = React.createClass({
    mixins: [WidgetMixin],

    getDefaultProps() {

        return ({
            // onChange: null,
            type: 'MultOptionWidget',

        });
    },

    /*getInitialState(){
     return {value:{false}
     },*/
    componentDidMount() {
        // get value from prop
        if (typeof this.props.value !== 'undefined') {
            this._setValue(this.props.value);
            return;
        }
        // get value from store
        let formState = GiftedFormManager.stores[this.props.formName];
        if (typeof formState !== 'undefined') {
            if (typeof formState.values[this.props.name] !== 'undefined') {
                console.log(this.props.name + " form " + formState.values[this.props.name])
                // console.log(formState)
                this.setState({
                    value: formState.values[this.props.name],

                });
                this._validate(formState.values[this.props.name]);
            }
        }
    },

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
            this.onChange(nextProps.value);
        }
    },
    setValue(value) {
        this.setState({
            value: value,
        });
        GiftedFormManager.updateValue(this.props.formName, this.props.name, value);
    },

    onChange(value, onChangeText = true) {
        if (onChangeText === true) {
            //should maintain similar API to core TextInput component
            this.props.onChangeText && this.props.onChangeText(value);
        }

        this.setValue(value);
        this._validate(value);

        this.props.onValueChange && this.props.onValueChange();
        // @todo modal widgets validation - the modalwidget row should inform about validation status
    },


    _renderCheckmark() {
        //console.log(this.state.value)
        if (this.state.value === true) {
            return (
                <Image
                    style={this.getStyle('checkmark')}
                    resizeMode={Image.resizeMode.contain}
                    source={require('react-native-gifted-form/icons/check.png')}
                />
            );
        }
        return null;
    },

    _onClose() {

        if (this.props.multiple === false) {
            this.props.unSelectAll();
            this._onChange(true);

            if (typeof this.props.onSelect === 'function') {
                // console.log('onSelect');
                this.props.onSelect(this.props.value);
            }

            if (typeof this.props.onClose === 'function') {
                this.props.onClose(this.props.title, this.props.navigator);
            }
        } else {
            this.onChange(!!this.state.value);


        }
    },

    render() {

        return (
            <View style={this.getStyle('rowContainer')}>
                <TouchableHighlight
                    onPress={this._onClose}
                    underlayColor={this.getStyle('underlayColor').pop()}
                    {...this.props} // mainly for underlayColor
                >
                    <View style={this.getStyle('row')}>
                        {this._renderImage()}
                        <Text numberOfLines={1} style={this.getStyle('switchTitle')}>
                            {this.props.title}
                        </Text>
                        {this._renderCheckmark()}
                    </View>
                </TouchableHighlight>
            </View>
        );
    },

    defaultStyles: {
        rowImage: {
            height: 20,
            width: 20,
            marginLeft: 10,
        },
        checkmark: {
            width: 23,
            marginRight: 10,
            marginLeft: 10,
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
        underlayColor: '#c7c7cc',
        switchTitle: {
            fontSize: 15,
            color: '#000',
            flex: 0.7,
            paddingLeft: 10,
        },
    },
});

let ImagePicker = require('react-native-image-picker');
const PhotoPickerWidget = React.createClass({
    mixins: [WidgetMixin],

    getDefaultProps() {

        return ({
            // onChange: null,
            type: 'PhotoPickerWidget',

        });
    },

    getInitialState(){
        return {value: []}
    },
    componentWillMount(){

        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});

    },
    componentDidMount() {
        // get value from prop
        if (typeof this.props.value !== 'undefined') {
            this._setValue(this.props.value);
            return;
        }
        // get value from store
        let formState = GiftedFormManager.stores[this.props.formName];
        if (typeof formState !== 'undefined') {
            if (typeof formState.values[this.props.name] !== 'undefined') {
                console.log(this.props.name + " form " + formState.values[this.props.name])
                // console.log(formState)
                this.setState({
                    value: formState.values[this.props.name],
                });
                this._validate(formState.values[this.props.name]);
            }
        }
    },

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
            this.onChange(nextProps.value);
        }
    },
    setValue(value) {

        GiftedFormManager.updateValue(this.props.formName, this.props.name, value);
    },

    onChange(value, onChangeText = true) {
        if (onChangeText === true) {
            //should maintain similar API to core TextInput component
            this.props.onChangeText && this.props.onChangeText(value);
        }

        this.setValue(value);
        this._validate(value);

        this.props.onValueChange && this.props.onValueChange();
        // @todo modal widgets validation - the modalwidget row should inform about validation status
    },

    _onClose() {

        this._onChange(this.state.photos);

        if (typeof this.props.onSelect === 'function') {
            // console.log('onSelect');
            this.props.onSelect(this.props.value);
        }

        if (typeof this.props.onClose === 'function') {
            this.props.onClose(this.props.title, this.props.navigator);
        }


    },

    render() {

        return (
            <View style={[{height: 500}]}>

                <View style={[styles.flex1]}>
                    <ListView dataSource={this.ds.cloneWithRows(this.state.value)}
                              contentContainerStyle={[styles.horizontal, styles.spaceAround, styles.flexWrap]}

                              enableEmptySections={true}
                              renderRow={(photo) =>
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
                                                     source={{uri: photo.uri}}>

                                              </Image>
                                              <View style={[styles.spaceAround, styles.alignItemsCenter, {height: 40}]}>
                                                  <View
                                                      style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                      <Text style={[styles.productTitle]}>
                                                          {shortenText(photo.fileName)}
                                                      </Text>
                                                  </View>
                                                  <View
                                                      style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                      <Text style={[styles.currency]}>

                                                      </Text>
                                                      <Text style={[styles.price]}>
                                                          {photo.width + "x" + photo.height}
                                                      </Text>
                                                  </View>
                                              </View>
                                          </View>
                                      </Card>
                                  </View>
                              }
                    />

                    <ActionButton style={{zIndex: 9}}

                                  icon="add"
                                  onPress={(text) => {

                                      this.openPicker();


                                  }}
                    />
                </View>
            </View>
        );
    },
    openPicker(){

        let options = {
            title: 'Select product photos',
            mediaType: "photo",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Alert.alert(response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                //let source = { uri: response.uri };

                // You can also display the image using data:
                // response = {...response,data: 'data:image/jpeg;base64,'+response.data };
                let value = this.state.value;

                value.push(response);
                this._onChange(value);
                this.setState({
                    value
                });

            }
        });
    }


});




import {ProductForm, EbModalInput, EbOptionInput, EbTextInput} from "../../forms/productForm"
export class CreateProduct extends Component {


    constructor(props) {
        super(props)
        //let {user}=this.props.screenProps;
        this.state = {
            product: {
                uid: null,
                title: null,
                discription: null,
                price: null,
                sellerID: "xxxxx",
            }
        }
    }

    render() {

        let {navigate, goBack} = this.props.navigation;
        let title = "New item";
        let {user}=this.props.screenProps;
        const {primaryColor} = uiTheme.palette;
        
		

        return (
            <View style={[styles.flex1]}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        goBack();
                    }}
                    centerElement={title}


                />
                <Card style={{flex: 1}}>
                    <ProductForm formName="productForm" title={title}>
                        <EbTextInput field="name" title={"Product name"}
                                     validator={{
                                         errorMessage: "[TITLE] must be args[0] to args[1] characters",
                                         validator: "isLength",
                                         args: [5, 32]

                                     }}/>
                        <EbTextInput field="model" title={"Model name"}
                                     validator={{
                                         errorMessage: "[TITLE] must be args[0] to args[1] characters",
                                         validator: "isLength",
                                         args: [2, 10]

                                     }}

                        />
                        <EbTextInput field="manufacturer" title={"manufacturer"}

                                     validator={{
                                         errorMessage: "[TITLE] must be args[0] to args[1] characters",
                                         validator: "isLength",
                                         args: [2, 10]

                                     }}
                        />
                    </ProductForm>
                </Card>
            </View>)
                
    }





}















