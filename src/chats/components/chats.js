/**
 * Created by ebundala on 3/11/2017.
 */

//TODO add bot assistant to help shoppers find what they look for in chat
import React, { Component } from 'react';
import {IMAGES} from "../../products/products.actions"
import {
    Text,
    View,
    ListView,
    TouchableNativeFeedback,
    Image
} from 'react-native';
import {Icon,Card ,Button,Divider} from 'react-native-material-design';
import { Toolbar} from 'react-native-material-ui';
import { GiftedChat } from 'react-native-gifted-chat';
import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"
import {shortenText} from "../../utils/utils"
let moment = require('moment');

export class ChatsList extends Component{


    constructor(props){
        super(props)
        this.ds =new ListView.DataSource({rowHasChanged:(x,y)=>x!==y})


    }

    render(){
        let {navigate,goBack}=this.props.navigation;
        let {chats}=this.props.navigation.state.params;

        return(
            <View style={[styles.flex1,{backgroundColor:"white"}]}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={()=>{
                        goBack();
                    }}
                    centerElement="Messages"
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                    }}
                />
                <ListView dataSource={this.ds.cloneWithRows(chats)}
                          renderSeparator={(i,j)=><Divider key={j+"divider"+i}/>}
                          enableEmptySections={true}
                          renderRow={(chat,sectionID, rowID, highlightRow) =>
                              <View key={rowID}>
                                  <TouchableNativeFeedback onPress={() => navigate("singleChat", {data: chat})}>


                                      <View style={[styles.horizontal, {paddingTop: 8}]}>
                                          <View style={[styles.flex2,styles.alignItemsCenter]}>
                                              <Image style={[{
                                                 // tintColor:colours.paperGrey200.color,
                                                  width: 50,
                                                  height: 50,
                                                  borderRadius: 50,
                                                  resizeMode: Image.resizeMode.cover
                                              }]}
                                                     source={{uri: chat.userAvator}}>

                                              </Image>
                                          </View>

                                          <View style={[styles.flex8]}>
                                              <View style={[styles.horizontal,]}>
                                                  <Text style={[styles.productTitle]}>
                                                      {chat.userName}
                                                  </Text>
                                              </View>

                                              <View >
                                                  <Text style={[{paddingVertical:4}]}>
                                                      {shortenText(chat.body,50)}
                                                  </Text>
                                              </View>
                                              <View style={[styles.horizontal,]}>
                                                  <Text style={[{fontSize:10,paddingVertical:4}]}>
                                                      {moment(chat.time).format('YYYY MM DD')}
                                                  </Text>
                                              </View>
                                          </View>
                                      </View>

                                  </TouchableNativeFeedback>

                              </View>


                          }
                />

            </View>
        )
    }
}

export class SingleChatView extends Component{

    constructor(props) {
        super(props);
        this.state = {messages: []};
        this.onSend = this.onSend.bind(this);
    }
    componentDidMount() {
        let{data}=this.props.navigation.state.params;
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello '+data.userName,
                    createdAt: new Date(Date.UTC(2016, 7, 25, 17, 20, 0)),
                    user: {
                        _id: 1,
                        name: 'React',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
                {
                    _id:2 ,
                    text: 'Hello developer',
                    createdAt: new Date(Date.UTC(2016, 7, 24, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
                {
                    _id: 3,
                    text: 'Hello developer',
                    createdAt: new Date(Date.UTC(2016, 7, 26, 17, 20, 0)),
                    user: {
                        _id: 1,
                        name: 'React',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
                {
                    _id: 4,
                    text: 'Hello developer',
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
                {
                    _id: 5,
                    text: 'Hello developer geeks',
                    createdAt: new Date(Date.UTC(2016, 7, 31, 17, 20, 0)),
                    user: {
                        _id: 1,
                        name: 'Redux',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
            ],
        });
    }
    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }
    render() {

        let {navigate,goBack}=this.props.navigation;
        let title=this.props.navigation.state.params.data.userName;
        return (
        <View style={[styles.flex1]}>
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={()=>{
                    goBack();
                }}
                centerElement={title}

            />
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: 2,
                    name: 'React',
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                }}
            />
        </View>
        );
    }
}
