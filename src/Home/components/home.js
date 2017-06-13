/**
 * Created by ebundala on 3/11/2017.
 */
import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableNativeFeedback,
    ScrollView,
    TextInput,
    ListView,
    Image,
    ViewPagerAndroid,

} from 'react-native';
import {Card, Divider} from 'react-native-material-design';
import {Toolbar, Icon, BottomNavigation} from 'react-native-material-ui';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from  "../../products/products.actions"
import {Statuses}  from "../../statuses/components/statuses"
import {CategoryView} from "../../navigationView/components/navigationView"

import styles, {typographyStyle, colorStyle, colours} from "../../styles/styles"
let ctx;
class homeComponent extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
        this.state = {query: null, active: 'Home'}
    }

    openDrawer() {
        this.props.screenProps.drawer.openDrawer()
    }

    render() {
        ctx = this;
        let {navigate}=this.props.navigation;

        return (


            <View style={[styles.flex1]}>
                <Toolbar
                    leftElement="menu"
                    onLeftElementPress={() => {
                        this.openDrawer();
                    }}
                    centerElement={this.state.active}
                    rightElement={<Statuses
                        color={colours.paperGrey50.color} navigate={navigate}/>
                    }
                />
                <View style={[styles.flex1]}>

                    <ViewPagerAndroid
                        initialPage={0}
                        keyboardDismissMode='on-drag'
                        scrollEnabled={true}
                        onPageSelected={(e) => {

                            switch (e.nativeEvent.position) {

                                case 1:
                                    this.setState({active: 'Categories'})
                                    break;
                                case 2:
                                    this.setState({active: 'All'})
                                    break;
                                case 3:
                                    this.setState({active: 'Favorite'})
                                    break;
                                case 0:
                                default:
                                    this.setState({active: 'Home'})

                            }
                        }}
                        style={{flex: 1}}
                        ref={(el) => this._Pager = el}>
                        {this._renderScenes().map((child, i) => (
                            <View
                                key={"key" + i}
                                testID={"test" + i}
                                style={{flex: 1}}>
                                {child}
                            </View>
                        ))}

                    </ViewPagerAndroid>

                </View>


                <BottomNavigation active={this.state.active} hidden={false} style={{container: styles.spaceBetween}}>
                    <BottomNavigation.Action
                        style={{container: styles.flex1}}
                        key="Home"
                        icon="home"
                        label="home"
                        onPress={() => {
                            this.setState({active: 'Home'})

                            this._Pager.setPage(0)
                        }
                        }
                    />
                    <BottomNavigation.Action
                        style={{container: styles.flex1}}
                        key="Categories"
                        icon="location-on"
                        label="categories"
                        onPress={() => {
                            this.setState({active: 'Categories'})
                            this._Pager.setPage(1)

                        }}
                    />
                    <BottomNavigation.Action
                        style={{container: styles.flex1}}
                        key="All"
                        icon="bookmark-border"
                        label="all"
                        onPress={() => {
                            this.setState({active: 'All'})
                            this._Pager.setPage(2)

                        }}
                    />
                    <BottomNavigation.Action
                        style={{container: styles.flex1}}
                        key="Favorite"
                        icon="favorite"
                        label="favorite"
                        onPress={() => {
                            this.setState({active: 'Favorites'});
                            this._Pager.setPage(3)

                        }}
                    />
                </BottomNavigation>
            </View>


        )
    }

    componentDidMount() {

        //this._setPage(1);
        //this._setPage(0);
    }

    _renderScenes() {
        let {navigate}=this.props.navigation;
        let {queryProducts, searchProducts, products, popular, newest, cheapest}=this.props;

        return [
            <ScrollView contentContainerStyle={[]}>
                <View style={[{height: 160, marginHorizontal: 0, padding: 0, elevation: 5}]}>
                    <Image style={[styles.flex1, {resizeMode: Image.resizeMode.cover, margin: 0}]}
                           source={require("../../pngs/background.png")}>

                    </Image>
                </View>
                <View style={[{marginVertical: 8}]}>
                    <Card style={[{height: 50}]}>
                        <View style={[styles.horizontal]}>
                            <View style={[styles.flex9]}>


                                <TextInput
                                    ref={component => this.searchInput = component}
                                    keyboardType="web-search"
                                    style={styles.input}
                                    autoCorrect={true}
                                    autoCapitalize="none"
                                    placeholderTextColor={colours.paperGrey500.color}
                                    placeholder={"Search "}
                                    underlineColorAndroid="transparent"
                                    onSubmitEditing={(e) => {
                                        if (this.state.query) {
                                            this.searchInput.blur();
                                            searchProducts(this.state.query, "all", navigate)
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
                                    searchProducts(this.state.query, "all", navigate)

                                }
                                else
                                    this.searchInput.focus();
                            }}>
                                <View
                                    style={[styles.flex1, styles.centerJustified, styles.alignItemsCenter]}>
                                    <Icon name="search"/>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </Card>
                    <View style={[{marginVertical: 16}]}>
                        <Divider style={{marginHorizontal: 140, height: 2}}/>
                        <View
                            style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified, {padding: 8}]}>
                            <Text style={[styles.title]}>POPULAR PRODUCTS</Text>
                        </View>
                        <Divider style={{marginHorizontal: 140, height: 2}}/>
                    </View>
                    <ListView dataSource={this.ds.cloneWithRows(popular)}
                              contentContainerStyle={[styles.horizontal, styles.spaceAround, styles.flexWrap]}
                              scrollRenderAheadDistanceh={640}
                              enableEmptySections={true}
                              horizontal={true}
                              renderRow={(data) =>
                                  <TouchableNativeFeedback onPress={() => {

                                      navigate("singleProduct", {
                                          data: data
                                      })
                                  }}>
                                      <View style={[, {
                                          height: 220,
                                          width: 180
                                      },

                                      ]}>
                                          <Card style={[styles.flex1]}>

                                              <View style={[styles.flex1]}>
                                                  <Image style={[{
                                                      marginTop: 16
                                                      , marginBottom: 8,
                                                      width: 132,
                                                      height: 132,
                                                      resizeMode: Image.resizeMode.stretch,
                                                      backgroundColor: colours.paperGrey300.color
                                                  }]}
                                                         source={{uri: data.photos[0].downloadUrl}}>

                                                  </Image>
                                                  <View
                                                      style={[styles.spaceAround, styles.alignItemsCenter, {height: 40}]}>
                                                      <View
                                                          style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                          <Text style={[styles.productTitle]}>
                                                              {data.name}
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
                    <View style={[{marginVertical: 16}]}>
                        <Divider style={{marginHorizontal: 140, height: 2}}/>
                        <View
                            style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified, {padding: 8}]}>
                            <Text style={[styles.title]}>NEWEST PRODUCTS</Text>
                        </View>
                        <Divider style={{marginHorizontal: 140, height: 2}}/>
                    </View>
                    <ListView dataSource={this.ds.cloneWithRows(newest)}
                              contentContainerStyle={[styles.horizontal, styles.spaceAround, styles.flexWrap]}
                              scrollRenderAheadDistance={640}
                              enableEmptySections={true}
                              horizontal={true}
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
                                                      marginTop: 16,
                                                      marginBottom: 8, width: 132, height: 132,
                                                      resizeMode: Image.resizeMode.stretch,
                                                      backgroundColor: colours.paperGrey300.color
                                                  }]}
                                                         source={{uri: data.photos[0].downloadUrl}}>

                                                  </Image>
                                                  <View
                                                      style={[styles.spaceAround, styles.alignItemsCenter, {height: 40}]}>
                                                      <View
                                                          style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                          <Text style={[styles.productTitle]}>
                                                              {data.name}
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
                    <View style={[{marginVertical: 16}]}>
                        <Divider style={{marginHorizontal: 140, height: 2}}/>
                        <View
                            style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified, {padding: 8}]}>
                            <Text style={[styles.title]}>CHEAPEST PRODUCTS</Text>
                        </View>
                        <Divider style={{marginHorizontal: 140, height: 2}}/>
                    </View>
                    <ListView dataSource={this.ds.cloneWithRows(cheapest)}
                              contentContainerStyle={[styles.horizontal, styles.spaceAround, styles.flexWrap]}
                              scrollRenderAheadDistance={640}
                              enableEmptySections={true}
                              horizontal={true}
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
                                                      marginTop: 16,
                                                      marginBottom: 8, width: 132, height: 132,
                                                      resizeMode: Image.resizeMode.stretch,
                                                      backgroundColor: colours.paperGrey300.color
                                                  }]}
                                                         source={{uri: data.photos[0].downloadUrl}}>

                                                  </Image>
                                                  <View
                                                      style={[styles.spaceAround, styles.alignItemsCenter, {height: 40}]}>
                                                      <View
                                                          style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                          <Text style={[styles.productTitle]}>
                                                              {data.name}
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
            </ScrollView>,
            <CategoryView navigate={navigate}/>,
            <Text>all</Text>,
            <Text>favorite</Text>

        ]
    }

    _setPage = (index) => {

        /* let index = 0;
         switch (name) {
         case "Home":
         index = 0;

         break;
         case "IntroTwo":
         index = 1;
         break;
         case "Oauth":
         index = 2;
         break;
         case "app":
         index = 3;
         break
         default:
         // alert(name)
         index = null
         }*/
        if (this._Pager && index !== null) {
            if (this._Pager.props.animationEnabled !== false) {
                this._Pager.setPage(index);
            } else {
                this._Pager.setPageWithoutAnimation(index);
            }
        }
    }
}


const mapStateToProps = (state) => {
    "use strict";
    return {
        popular: state.products,
        cheapest: state.products,
        newest: state.products


    }
}


const mapDispatchToProps = (dispatch) => {
    "use strict";
    return bindActionCreators(actions, dispatch)
}
const mergeProps = (stateProps, dispatchProp, ownProps) => {

    return {
        ...ownProps,
        screenProps: {
            ...ownProps.screenProps,
            ...stateProps,
            ...dispatchProp,

        }
    }
}


export default home = connect(mapStateToProps, mapDispatchToProps)(homeComponent)







