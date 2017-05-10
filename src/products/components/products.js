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
    Navigator,
    WebView
} from "react-native";
import {Card} from 'react-native-material-design';
import {Toolbar, Divider, Icon, ActionButton,RippleFeedback} from 'react-native-material-ui';

import Button from 'apsl-react-native-button'
import StarRating from 'react-native-star-rating';
//import Accordion from "react-native-accordion"
//import {Statuses,Menu}  from "../../statuses/components/statuses"
import styles, {typographyStyle, colorStyle, colours} from "../../styles/styles"
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import ExNavigator from '@expo/react-native-navigator';
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
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                        onSubmitEditing: e => {
                            if (this.state.query) {

                                props.searchProducts(this.state.query, title, navigate)
                            }

                        },
                        onChangeText: query => this.setState({query})
                    }
                    }
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


                                          {false && <View style={[styles.horizontal]}>


                                              <Button title={"add Product "}
                                                      onPress={() => props.addProduct(data, navigate)}/>
                                              <Button title={"edit Product "}
                                                      onPress={() => props.editProduct(data, navigate)}/>

                                          </View>}
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

    componentWillUpdate() {

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

let len=data.photos.length;
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
                                    {this._renderImages().map((child, i,photos) => (
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

          return Object.keys(data.photos).map(function(value, index) {
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

    /* getInitialState(){
     // return {preValue:false}
     },*/
    componentDidMount() {
        // get value from prop
        // if (typeof this.props.value !== 'undefined') {
        // this._setValue(this.props.value);
        //return;
        //  }
        // get value from store
        let formState = GiftedFormManager.stores[this.props.formName];
        if (typeof formState !== 'undefined') {
            if (typeof formState.values[this.props.name] !== 'undefined') {
                // console.log(this.props.name+" form "+formState.values[this.props.name])
                // console.log(formState)
                /*this.setState({
                 value: formState.values[this.props.name],

                 });*/
                //this._validate(formState.values[this.props.name]);
            }
        }
    },

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
            // this.onChange(nextProps.value);
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
      return {photos:[]}
     },
    componentWillMount(){

        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});

    },
    componentDidMount() {
        // get value from prop
        // if (typeof this.props.value !== 'undefined') {
        // this._setValue(this.props.value);
        //return;
        //  }
        // get value from store
        let formState = GiftedFormManager.stores[this.props.formName];
        if (typeof formState !== 'undefined') {
            if (typeof formState.values[this.props.name] !== 'undefined') {
                // console.log(this.props.name+" form "+formState.values[this.props.name])
                // console.log(formState)
                /*this.setState({
                 value: formState.values[this.props.name],

                 });*/
                //this._validate(formState.values[this.props.name]);
            }
        }
    },

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
            // this.onChange(nextProps.value);
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
            <View style={[{height:500}]}>

                <View style={[styles.flex1]}>
                <ListView dataSource={this.ds.cloneWithRows(this.state.photos)}
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
                                                     source={{uri:photo.uri}}>

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
                                                          {photo.width+"x"+photo.height}
                                                      </Text>
                                                  </View>
                                              </View>
                                          </View>
                                      </Card>
                                  </View>
                              }
                />

                    <ActionButton style={{zIndex:9}}

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
            mediaType:"photo",
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
                let photos=this.state.photos;

                photos.push(response);
                this._onChange(photos);
                this.setState({
                    photos
                });

            }
        });
    }


});


const COMPONENT_NAMES = ['Title', 'LeftButton', 'RightButton'];
const navStatePresentedIndex = function(navState) {
    if (navState.presentedIndex !== undefined) {
        return navState.presentedIndex;
    }
    // TODO: rename `observedTopOfStack` to `presentedIndex` in `NavigatorIOS`
    return navState.observedTopOfStack;
};
class NavigationBar extends Navigator.NavigationBar {

    render() {

        var navBarStyle = {
            height: this.props.navigationStyles.General.TotalNavHeight,
        };
        var navState = this.props.navState;
        var components = navState.routeStack.map((route, index) =>
            COMPONENT_NAMES.map(componentName =>
                this._getComponent(componentName, route, index)
            )
        );
        let{routeStack,presentedIndex}= this.props.navState;
        let {toolbarProps}=this.props;
        let route=routeStack[presentedIndex];
        return (


                <View  style={[navBarStyle, this.props.style,{top:0,left:0,right:0,position:"absolute"}]}>
                    <Toolbar
                        leftElement={this._getComponent("LeftButton", route, presentedIndex)}
                        rightElement={this._getComponent("RightButton", route, presentedIndex)}
                        centerElement={this._getComponent("Title", route, presentedIndex)}


                    />
                </View>

        );

    }
    _getComponent = (/*string*/componentName, /*object*/route, /*number*/index) => /*?Object*/ {
        if (this._descriptors[componentName].includes(route)) {
            return this._descriptors[componentName].get(route);
        }

        var rendered = null;

        var content = this.props.routeMapper[componentName](
            this.props.navState.routeStack[index],
            this.props.navigator,
            index,
            this.props.navState
        );
        if (!content) {
            return null;
        }

        var componentIsActive = index === navStatePresentedIndex(this.props.navState);
        var initialStage = componentIsActive ?
            this.props.navigationStyles.Stages.Center :
            this.props.navigationStyles.Stages.Left;
        rendered = (
            <View
                ref={(ref) => {
                    this._components[componentName] = this._components[componentName].set(route, ref);
                }}
                pointerEventsj={componentIsActive ? 'box-none' : 'none'}
                styleh={initialStage[componentName]}>
                {content}
            </View>
        );

       this._descriptors[componentName] = this._descriptors[componentName].set(route, rendered);
        return rendered;
    };

}



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

                                      userID: "",
                                     userName: 'Anonymous user',

                                    name: 'hp nm',
                                     brand: 'onk',
                                     model: 'vbklo',
                                     manufacturer: 'jkgkl',
                                     price: "4567778",
                                     currency: [ 'TZS' ],
                                     acceptedPaymentMethod: [ 'OnDelivery', 'TigoPesa' ],
                                     quantity: '1',
                                     category: [ 'electronics' ],
                                     itemCondition: [ 'New' ],
                                     availability: [ 'InStock' ],
                                     areaServed: [ 'MAIN', 'SMC' ],
                                     availableDeliveryMethod: [ 'pickUp', 'Shipping' ],
                                    description: "React testJS code runs inside this Chrome tab.Press CtrlJ to open Developer Tools. Enable Pause On Caught Exceptions for a better debugging experience.Status: Debugger session",
                                    warranty:"runs inside this Chrome tab.Press CtrlJ to open Developer",

                                }}


                                validatorsg={{


                                    //  userID: 789098090,
                                    // userName: 'Anonymous user',
                                    // reviewerAvator: 1,
                                    /*name: 'hp',
                                     brand: 'on',
                                     model: 'vb',
                                     manufacturer: 'gh',
                                     price: '258',
                                     currency: [ 'TZS' ],
                                     acceptedPaymentMethod: [ 'OnDelivery', 'TigoPesa' ],
                                     quantity: '789',
                                     category: [ 'electronics' ],
                                     itemCondition: [ 'New' ],
                                     availability: [ 'InStock' ],
                                     areaServed: [ 'MAIN', 'SMC' ],
                                     availableDeliveryMethod: [ 'pickUp', 'Shipping' ],
                                     description: 'fggfhgf',
                                     warranty: 'gfhgfhgfh',*/

                                    name: {
                                        title: 'Product',
                                        validate: [{
                                            validator: 'isLength',
                                            arguments: [3, 50],
                                            message: '{TITLE} name must be between {ARGS[0]} and {ARGS[1]} characters'
                                        }]
                                    },
                                    brand: {
                                        title: 'Brand',
                                        validate: [{
                                            validator: 'isLength',
                                            arguments: [2, 16],
                                            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                                        }, {
                                            validator: 'matches',
                                            arguments: /^[a-zA-Z0-9]*$/,
                                            message: '{TITLE} can contains only alphanumeric characters'
                                        }]
                                    },
                                    model: {
                                        title: 'Model',
                                        validate: [{
                                            validator: 'isLength',
                                            arguments: [2, 16],
                                            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                                        }, {
                                            validator: 'matches',
                                            arguments: /^[a-zA-Z0-9]*$/,
                                            message: '{TITLE} can contains only alphanumeric characters'
                                        }]
                                    },
                                    manufacturer: {
                                        title: 'Manufacturer',
                                        validate: [{
                                            validator: 'isLength',
                                            arguments: [0, 16],
                                            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                                        }, {
                                            validator: 'matches',
                                            arguments: /^[a-zA-Z0-9]*$/,
                                            message: '{TITLE} can contains only alphanumeric characters'
                                        }]
                                    },
                                    /*price: {
                                     title: 'Price',
                                     validate: [{
                                     //validation: "isInt",
                                     arguments: [100, 100000000],
                                     message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]}'
                                     }]
                                     },*/
                                    currency: {
                                        title: 'Currency',
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
                                    acceptedPaymentMethod: {
                                        title: 'Payment Methods',
                                        validate: [{
                                            validator: (...args) => {
                                                if (args[0] === undefined) {
                                                    return false;
                                                }
                                                return true;
                                            }
                                        }]
                                    },
                                    /*  quantityg: {
                                     title: 'Quantityg',
                                     validate: [{
                                     validator: 'isInt',
                                     arguments: [1, 100],
                                     message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                                     }]
                                     },*/
                                    itemCondition: {
                                        title: 'Condition',
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
                                    category: {
                                        title: 'Category',
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
                                    areaServed: {
                                        title: 'Availability',
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
                                    availableDeliveryMethod: {
                                        title: 'Availability',
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
                                    /*descriptionf: {
                                     title: 'Availabilityg',
                                     validate: [{
                                     validator: 'isLength',
                                     arguments: [0, 150],
                                     message: '{TITLE} name must be between {ARGS[0]} and {ARGS[1]} characters'
                                     }],
                                     },
                                     warrantyg: {
                                     title: 'Warrantyb',
                                     validate: [{
                                     validator: 'isLengthb',
                                     arguments: [0, 150],
                                     message: '{TITLE} name must be between {ARGS[0]} and {ARGS[1]} characters'
                                     }],

                                     },*/

                                }}

                            >


                                <GiftedForm.TextInputWidget
                                    name='name' // mandatory
                                    title='Product'

                                    placeholderTextColor={colours.paperGrey500.color}
                                    underlineColorAndroid="transparent"
                                    placeholder='HP pavilion notebook'
                                    clearButtonMode='while-editing'
                                />
                                <GiftedForm.TextInputWidget
                                    name='brand'
                                    title='Brand'
                                    placeholderTextColor={colours.paperGrey500.color}
                                    underlineColorAndroid="transparent"
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
                                    placeholderTextColor={colours.paperGrey500.color}
                                    underlineColorAndroid="transparent"

                                    clearButtonMode='while-editing'


                                />
                                <GiftedForm.TextInputWidget
                                    name='manufacturer' // mandatory
                                    title='Manufacturer'
                                    placeholder='HP'
                                    clearButtonMode='while-editing'
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor={colours.paperGrey500.color}

                                />

                                <GiftedForm.SeparatorWidget />

                                <GiftedForm.ModalWidget
                                    title='Price'
                                    displayValue='price'
                                    name='price'
                                    cancelable={true}

                                >

                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.TextInputWidget
                                        name='price' // mandatory
                                        title='Price per Item'
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor={colours.paperGrey500.color}
                                        placeholder='price of single unit'
                                        autoFocus={true}
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
                                    name='currency'
                                    cancelable={true}
                                >
                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.SelectWidget name='currency' title='Currency' multiple={false}>
                                        <GiftedForm.OptionWidget title="Tanzania Shilling's" value="TZS"/>
                                        <GiftedForm.OptionWidget title="US Dollar's" value="USD"/>
                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Payment Methods'
                                    displayValue='acceptedPaymentMethod'
                                    name='acceptedPaymentMethod'
                                    cancelable={true}
                                >

                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.SelectWidget name='acceptedPaymentMethod' title='Payment Methods'
                                                             multiple={true}>
                                        <MultOptionWidget title="On Delivery" value="OnDelivery"/>
                                        <MultOptionWidget title="Tigo Pesa" value="TigoPesa"/>


                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Quantity'
                                    name='quantity'
                                    displayValue='quantity'
                                    cancelable={true}
                                >
                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.TextInputWidget
                                        name='quantity' // mandatory
                                        title='Quantity'
                                        underlineColorAndroid="transparent"

                                        placeholder='item quantity'

                                        keyboardType="numeric"

                                        placeholderTextColor={colours.paperGrey500.color}
                                        autoFocus={true}
                                        clearButtonMode='while-editing'
                                        returnKeyLabel="done"
                                        onSubmitEditing={(e) => {
                                            //navigator.pop();
                                        }}
                                    />


                                </GiftedForm.ModalWidget>

                                <GiftedForm.SeparatorWidget />

                                <GiftedForm.ModalWidget
                                    title='Category'
                                    name='category'
                                    displayValue='category'
                                    cancelable={true}
                                >
                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.SelectWidget name='category' title='Category' multiple={false}>
                                        {this.categories().map((child, i) => {
                                            //alert(child)
                                            return (<GiftedForm.OptionWidget key={i} title={child} value={child}/>)
                                        })}


                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Condition'
                                    name='itemCondition'
                                    cancelable={true}
                                    displayValue='itemCondition'>
                                    <GiftedForm.SeparatorWidget />

                                    <GiftedForm.SelectWidget name='itemCondition' title='Item Condition'
                                                             multiple={false}>

                                        <GiftedForm.OptionWidget title='Brand New' value='New'/>
                                        <GiftedForm.OptionWidget title='Refurbished' value='Refurbished'/>
                                        <GiftedForm.OptionWidget title='Used' value='used'/>

                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Availability'
                                    name='availability'
                                    cancelable={true}
                                    displayValue='availability'>
                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.SelectWidget name='availability' title='Availability' multiple={false}>

                                        <GiftedForm.OptionWidget title="In Stock" value="InStock"/>
                                        <GiftedForm.OptionWidget title="Out Of Stock" value="OutOfStock"/>
                                        <GiftedForm.OptionWidget title="Sold Out" value="SoldOut"/>
                                        <GiftedForm.OptionWidget title="Pre Order" value="PreOrder"/>


                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Area Served'
                                    name='areaServed'
                                    cancelable={true}
                                    displayValue='areaServed'


                                    scrollEnabled={true} // true by default
                                >

                                    <GiftedForm.SelectWidget name='areaServed' title='Area Served' multiple={true}>
                                        <MultOptionWidget title="Main Campus" value="MAIN"/>
                                        <MultOptionWidget title="Mazimbu Campus" value="SMC"/>

                                    </GiftedForm.SelectWidget>

                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Delivery Methods'
                                    name='availableDeliveryMethod'
                                    cancelable={true}
                                    displayValue='availableDeliveryMethod'>
                                    <GiftedForm.SeparatorWidget />


                                    <GiftedForm.SelectWidget name='availableDeliveryMethod' title='Delivery Methods'
                                                             multiple={true}>
                                        <MultOptionWidget title="Pick up" value="pickUp"/>
                                        <MultOptionWidget title="Postal Shipping" value="Shipping"/>

                                    </GiftedForm.SelectWidget>


                                </GiftedForm.ModalWidget>

                                <GiftedForm.SeparatorWidget />

                                <GiftedForm.ModalWidget
                                    title='Description'
                                    cancelable={true}
                                    displayValue='description'
                                    name='description'


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
                                    name='warranty'
                                    cancelable={true}
                                    displayValue='warranty'>
                                    <GiftedForm.SeparatorWidget />
                                    <GiftedForm.TextAreaWidget
                                        name='warranty'
                                        autoFocus={true}
                                        placeholder='Any product warranty'
                                    />


                                </GiftedForm.ModalWidget>
                                <GiftedForm.ModalWidget
                                    title='Photos'
                                    name='photos'
                                    cancelable={true}
                                    displayValue='photos'>

                                    <PhotoPickerWidget  title='Photos' name='photos' />


                                </GiftedForm.ModalWidget>
                                <GiftedForm.SeparatorWidget />

                                <GiftedForm.SubmitWidget
                                    title='post'
                                    widgetStyles={{
                                        submitButton: {
                                            backgroundColor: "blue" //themes.mainColor,
                                        }
                                    }}

                                    onSubmit={this.onSubmit}

                                />
                                <GiftedForm.ValidationErrorWidget/>
                                <GiftedForm.NoticeWidget
                                    title='By posting, you agree to the Terms of Service and Privacy Policy.'
                                />


                                <GiftedForm.HiddenWidget name='userID' value={user.user.uid}/>

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
                                <RippleFeedback
                                    onPress={() => {
                                        goBack()
                                    }}
                                    >
                                    <View >

                                        <Icon color={colours.paperGrey50.color} style={{padding: 16}} size={24}
                                              name="arrow-back"/>
                                    </View>
                                </RippleFeedback>
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
                    },
                    onSubmit(isValid, values, validationResults, postSubmit = null, modalNavigator = null){
                            if (true)
                            {
                                const uploadFile = (files,uid,links,i,retry,resolve,reject) => {
                                    let len =files.length;
                                    if (i < len)
                                    {
                                        firestack.storage.uploadFile(`photos/${uid}/${files[i].fileName}`, files[i].path, {
                                            contentType: 'image/jpeg',
                                            contentEncoding: 'base64',
                                        }, (evt) => {
                                            console.log('progress  '+i, evt);
                                        }).then((res) => {
                                            console.log('The file has been uploaded '+i);
                                            i++;
                                            links.push(res);
                                            return  uploadFile(files, uid,links ,i,retry,resolve,reject)
                                        }).catch(err => {
                                            retry++;
                                            console.log('There was an error uploading the file', err);
                                            //Todo Retry here
                                            if(retry>5){
                                                i=i+2;
                                                return uploadFile(files, uid,links ,i,retry);
                                                //reject(err)
                                                //todo delete photos on failed
                                            }
                                            return uploadFile(files, uid,links ,i++,retry)
                                        })
                                    }else {
                                        resolve(links)
                                    }
                                }
                               const uploadFiles=(files,uid,i,retry)=>{

                                    return new Promise((resolve, reject) => {
                                        let links=[];


                                       if(files instanceof Array){
                                         uploadFile(files,uid,links,i,retry,resolve,reject)
                                       }
                                       else resolve([])
                                    })
                                }
                               const submitForm=(data)=>{
                                   let i=0,retry=0;
                                    return new Promise((resolve, reject) => {
                                        firestack.database.ref("products").push().then((res) => {
                                            let newPostKey = res.key;

                                           return firestack.ServerValue.then(map => {

                                            return uploadFiles(data.photos, newPostKey,i,retry).then((links) => {
                                               //Todo remove scheme after testing
                                                let scheme=    {
                                                    "acceptedPaymentMethod" : {
                                                        "OnDelivery" : true,
                                                        "TigoPesa" : true
                                                    },
                                                    "areaServed" : {
                                                        "MAIN" : true,
                                                        "SMC" : true
                                                    },
                                                    "availability" : "InStock",
                                                    "availableDeliveryMethod" : {
                                                        "Shipping" : true,
                                                        "pickUp" : true
                                                    },
                                                    "brand" : "onk",
                                                    "category" : "electronics",
                                                    "currency" : "TZS",
                                                    "description" : "kjkjfdjkfl jhsdkjhaskd",
                                                    "itemCondition" : "New",
                                                    "manufacturer" : "jkgkl",
                                                    "model" : "vbklo",
                                                    "name" : "hp nm",
                                                    "photos" : [ {
                                                        "bucket" : "esoko-fc718.appspot.com",
                                                        "downloadUrl" : "https://firebasestorage.googleapis.com/v0/b/esoko-fc718.appspot.com/o/photos%2F-KjeGCFaV9sDHtFCzmHq%2Fimage-ef001440-9b65-457b-86e5-28453294c7b9.jpg?alt=media&token=048431ba-702d-4a98-8622-b08cd8f1a51d",
                                                        "fullPath" : "photos/-KjeGCFaV9sDHtFCzmHq/image-ef001440-9b65-457b-86e5-28453294c7b9.jpg",
                                                        "metadata" : {
                                                            "cacheControl" : "",
                                                            "contentDisposition" : "inline; filename*=utf-8''image-ef001440-9b65-457b-86e5-28453294c7b9.jpg",
                                                            "contentType" : "image/jpeg"
                                                        },
                                                        "name" : "image-ef001440-9b65-457b-86e5-28453294c7b9.jpg"
                                                    }, {
                                                        "bucket" : "esoko-fc718.appspot.com",
                                                        "downloadUrl" : "https://firebasestorage.googleapis.com/v0/b/esoko-fc718.appspot.com/o/photos%2F-KjeGCFaV9sDHtFCzmHq%2Fimage-7c11b60b-2680-4981-8f02-ae703f635b03.jpg?alt=media&token=a33e7661-b5af-4bb7-8aee-648be08d8d4b",
                                                        "fullPath" : "photos/-KjeGCFaV9sDHtFCzmHq/image-7c11b60b-2680-4981-8f02-ae703f635b03.jpg",
                                                        "metadata" : {
                                                            "cacheControl" : "",
                                                            "contentDisposition" : "inline; filename*=utf-8''image-7c11b60b-2680-4981-8f02-ae703f635b03.jpg",
                                                            "contentType" : "image/jpeg"
                                                        },
                                                        "name" : "image-7c11b60b-2680-4981-8f02-ae703f635b03.jpg"
                                                    } ],
                                                    "price" : 258096,
                                                    "productID" : "-KjeGCFaV9sDHtFCzmHq",
                                                    "quantity" : 12,
                                                    "timestamp" : 1494284040119,
                                                    "userID" : "WuKkagJaoAbumfR0UZiKqCAoYlq1",
                                                    "userName" : "Anonymous user",
                                                    "warranty" : "sdxz  fdfgdgfd hgfhgh"
                                                }
                                                    data = {...scheme, timestamp: map.TIMESTAMP, productID: newPostKey,photos:links};

                                                    //console.log("data to be sent\n",data);

                                                    let updates = {};
                                                    updates['/products/' + newPostKey] = data;
                                                return firestack.database.ref().update(updates).then((resp) => {
                                                        resolve(data,resp)

                                                    }).catch((e) => {
                                                        reject(e)

                                                    })
                                                })
                                            })
                                        }).catch(reject)
                                    })
                                }







                                //console.log(values)

                                let   prod={
                                    userID: values.hasOwnProperty("userID")? values.userID:postSubmit(["it seams your not logged in"]),
                                   userName:values.hasOwnProperty("userName")? values.userName:postSubmit(["it seams your not logged in"]),
                                   name: values.hasOwnProperty("name")?values.name:postSubmit(["product name is required"]),
                                    brand: values.hasOwnProperty("brand")?values.brand:"",
                                    model:values.hasOwnProperty("model")?values.model:"",
                                    manufacturer:values.hasOwnProperty("manufacturer")?values.manufacturer:"",

                                    price:parseInt(values.price)?parseInt(values.price):postSubmit(["price is not valid"]),
                                   currency:values.hasOwnProperty("currency")?values.currency[0]:postSubmit(["currency is not valid"]),
                                   acceptedPaymentMethod:values.acceptedPaymentMethod instanceof Array?values.acceptedPaymentMethod.reduce(function(acc, cur, i) {
                                            acc[cur] = true;
                                            return acc;
                                        }, {}):null,
                                   quantity:parseInt(values.quantity)?parseInt(values.quantity):postSubmit(["quantity is not valid"]) ,
                                   category:values.hasOwnProperty("category")?values.category[0]:postSubmit(["category is required"]),
                                    itemCondition:values.hasOwnProperty("itemCondition")?values.itemCondition[0]:postSubmit(["Item condition is required"]),
                                   availability:values.hasOwnProperty("availability")?values.availability[0]:postSubmit(["Item Availability is required"]),
                                   areaServed:values.areaServed instanceof Array?values.areaServed.reduce(function(acc, cur, i) {
                                            acc[cur] = true;
                                            return acc;
                                        }, {}):null,
                                    availableDeliveryMethod:values.availableDeliveryMethod instanceof Array?values.availableDeliveryMethod.reduce(function(acc, cur, i) {
                                            acc[cur] = true;
                                            return acc;
                                        }, {}):null,
                                    description: values.hasOwnProperty("userID")? values.description:postSubmit(["it seams your not logged in"]),
                                    warranty: values.hasOwnProperty("userID")? values.warranty:postSubmit(["it seams your not logged in"]),


                                    photos:values.photos
                                };
                                //console.log(prod);
                                 submitForm(prod).then((data,res) => {
                                 //console.log("response from server\n",data,res);




                                     //GiftedFormManager.reset('newProduct');

                                     postSubmit();
                                 }).catch((e) =>{
                                 console.log(e);
                                 postSubmit(["error",e.message||"error occured"]);
                                 // GiftedFormManager.reset('newProduct')
                                 });


                                /* Implement the request to your server using values variable
                                 ** then you can do:
                                 ** postSubmit(); // disable the loader
                                 ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
                                 ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
                                 ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
                                 */
                                /*setTimeout(()=>{
                                    postSubmit(['error', 'invalid field detected']);
                                    // GiftedFormManager.reset('newProduct')
                                },9000);*/
                                //  return;
                            }
                       // GiftedFormManager.resetValues('newProduct');

                            postSubmit(['error', 'invalid field detected']);

                    },

                };
            }
        }

        return (

            <ExNavigator
                initialRoute={routes.getHomeRoute()}
                sceneStyle={{paddingTop: 56}}
                navigationBarStyle={{backgroundColor: primaryColor}}
                renderNavigationBarg={(props)=><NavigationBar
                    routeMapperg={{
                        LeftButton: (route, navigator, index, navState) =>
                        { return (<Text>Cancel</Text>); },
                        RightButton: (route, navigator, index, navState) =>
                        { return (<Text>Done</Text>); },
                        Title: (route, navigator, index, navState) =>
                        { return (<Text>{route.getTitle()}</Text>); },
                    }}


                />}
                titleStyle={[{color: colours.paperGrey50.color, marginTop: 16, fontWeight: "bold"}]}

                style={[styles.flex1]}
            />

        );
    }


    schema() {


        /* let prod={
         userID: 789098090,
         userName: 'Anonymous user',
         reviewerAvator: 1,
         name: 'hp',
         brand: 'on',
         model: 'vb',
         manufacturer: 'gh',
         price: '258',
         currency: [ 'TZS' ],
         acceptedPaymentMethod: [ 'OnDelivery', 'TigoPesa' ],
         quantity: '789',
         category: [ 'electronics' ],
         itemCondition: [ 'New' ],
         availability: [ 'InStock' ],
         areaServed: [ 'MAIN', 'SMC' ],
         availableDeliveryMethod: [ 'pickUp', 'Shipping' ],
         description: 'fggfhgf',
         warranty: 'gfhgfhgfh' }*/
        return {
            "type": "Product",
            "description": {"type": "description"},
            "name": {"type": "name"},
            "image": {"type": "image"},
            "itemCondition": {"type": "itemCondition"},
            "model": {"type": "model"},
            "category": {"type": "category"},
            "brand": {"type": "brand"},
            "color": {"type": "color"},
            "height": {"type": "height"},
            "width": {"type": "width"},
            "weight": {"type": "weight"},
            "sku": {"type": "sku"},
            "manufacturer": {"type": "manufacturer"},

            "offers": {
                "type": "Offer",
                "availability": "InStock",
                "price": {"type": "price"},
                "priceCurrency": {"type": "currency"},
                "acceptedPaymentMethod": {"type": "acceptedPaymentMethod"},
                "areaServed": {"type": "areaServed"},
                "availableDeliveryMethod": {"type": "availableDeliveryMethod"},
                "warranty": {"type": "warranty"}
            },
            "additionalProperty": {"type": "additionalProperty"}
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














