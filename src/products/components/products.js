/**
 * Created by ebundala on 3/11/2017.
 */
import React, {Component} from "react";
import { StyleSheet,
    Text, View, ListView,Image,ScrollView, TextInput,
     ViewPagerAndroid,
    TouchableNativeFeedback
} from "react-native";
import {Icon,Card ,Divider} from 'react-native-material-design';
import Button from 'apsl-react-native-button'
import Accordion from "react-native-accordion"
import {Statuses,Menu}  from "../../statuses/components/statuses"
import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"

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
                  <Accordion
                  header={
                      <View ref="description" style={[styles.flex1,{height:50}]}>

                      <View style={[styles.flex1,styles.horizontal]}>
                          <View style={[styles.centerJustified]}>
                              <Icon name="add" size={24}/>
                          </View>
                          <View style={[styles.centerJustified]}>
                              <Text style={[styles.title,{fontSize:12}]}>
                                  DESCRIPTION

                              </Text>
                          </View>


                      </View>

                  </View>
                  }
                  content={
                      <View>
                      <Divider/>
                      <Text style={[typographyStyle.paperFontBody1,{padding:8}]}>
                          {data.description}
                      </Text>
                  </View>
                  }
                  />
                        </Card>
                    <Card  >
                        <Accordion
                        header={
                            <View ref="reviews" style={[styles.flex1,{height:50}]}>
                            <View style={[styles.flex1,styles.horizontal]}>

                                <View style={[styles.centerJustified]}>
                                    <Text style={[styles.title,{fontSize:12}]}>
                                        REVIEWS

                                    </Text>
                                </View>

                                <View style={[styles.centerJustified]}>
                                    <Icon name="add" size={24}/>
                                </View>
                            </View>
                            </View>}
                       content={<View>
                        <Divider/>
                        <ListView dataSource={this.ds.cloneWithRows(reviews)}
                                  contentContainerStyle={[styles.spaceAround,styles.flexWrap]}
                                  scrollRenderAheadDistance={640}
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
                        </View>}
                         />




                        {false&&<Button raised={true} text={"Review "} overrides={{
                            textColor:colours.paperPinkA700.color,
                            backgroundColor:colours.paperDeepOrangeA700.color,
                           // rippleColor:colours.paperPinkA700.color
                        }}

                                onPress={() => {
                                    data.reviews=reviews;
                                    props.reviewProduct(data,navigate)}}/>}


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
}

export class CreateProduct extends Component{
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return "NEW PRODUCT"/*state.params.data.title*/
        },
        header: ({ state, setParams ,navigate}) => {
            //  let  right=(<Statuses navigate={navigate}/>);
            //let  left=(<Menu navigate={navigate}/>);
            let style={backgroundColor:colours.paperTeal500.color,}
            return { style};
        },

    };
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

        return(
        <View style={[styles.flex1]}>
            <TextInput
                ref={component => this.searchInput = component}
                keyboardType="default"
                numberOfLines = {4}
                autoCorrect={true}
                autoCapitalize="sentences"
                placeholderTextColor='#a8aAeC'
                placeholder={"Product title"}
                multline={true}
                onSubmitEditing={(query) => {
                    props.searchProducts(this.state.query,"",navigate)
                }}
                onChangeText={query => this.setState({query})}
            />

        </View>)
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



