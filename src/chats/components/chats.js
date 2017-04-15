/**
 * Created by ebundala on 3/11/2017.
 */

//TODO add bot assistant to help shoppers find what they look for in chat
import React, { Component } from 'react';

import {
    Text,
    View,
    Button,
    ListView
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';


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
        const ds =new ListView.DataSource({rowHasChanged:(x,y)=>x!==y})
        let {chats}=this.props.navigation.state.params
        this.state={
            dataSource:ds.cloneWithRows(chats)
        }
    }

    render(){
        let navigate=this.props.navigation.navigate;
        return(
            <View style={{flex:1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=><Button title={rowData} onPress={()=>navigate("singleChat",{title:rowData,data:rowData})}/>}
                />
            </View>
        )
    }
}

export class SingleChat extends Component{
    static navigationOptions = {
        title: ({ state, setParams ,navigate}) => {
            return state.params.title
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
                    text: 'Hello '+data,
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
/*

const chats=StackNavigator({
    allChats:{screen:AllView}  ,
    singleChat:{screen:SingleView}
},{headerMode:"none"})

export default chats;*/
