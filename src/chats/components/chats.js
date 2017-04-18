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

import { GiftedChat } from 'react-native-gifted-chat';
import styles,{typographyStyle,colorStyle,colours} from "../../styles/styles"

export class ChatsList extends Component{
    static navigationOptions = {
        title: 'Chats',
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
        this.ds =new ListView.DataSource({rowHasChanged:(x,y)=>x!==y})


    }

    render(){
        let navigate=this.props.navigation.navigate;
        let {chats}=this.props.navigation.state.params

        return(
            <View style={{flex:1}}>
                <ListView dataSource={this.ds.cloneWithRows(chats)}
                          contentContainerStyle={[styles.spaceAround,styles.flexWrap]}
                          scrollRenderAheadDistance={640}
                          enableEmptySections={true}
                          renderRow={(chat) =>
                              <Card>
                                  <TouchableNativeFeedback onPress={() => navigate("singleChat", {data: chat})}>


                                      <View style={[styles.horizontal, {paddingTop: 8}]}>
                                          <View style={[styles.flex2]}>
                                              <Image style={[{
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
                                              <View style={[styles.horizontal,]}>
                                                  <Text style={[]}>
                                                      {new Date(chat.time).getFullYear()}
                                                  </Text>
                                              </View>
                                              <View style={[]}>
                                                  <Text style={[]}>
                                                      {chat.body}
                                                  </Text>
                                              </View>
                                          </View>
                                      </View>

                                  </TouchableNativeFeedback>

                              </Card>


                          }
                />

            </View>
        )
    }
}

export class SingleChatView extends Component{
    static navigationOptions = {
        title: ({ state, setParams ,navigate}) => {
            return state.params.data.userName
        },
        /*header: ({ state, setParams ,navigate}) => {
         let  right=(<Statuses navigate={navigate}/>
         );
         let  left=(<Menu navigate={navigate}/>
         );

         return { right ,left};
         },*/

    };
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


        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: 2,
                    name: 'React',
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                }}
            />
        );
    }
}
