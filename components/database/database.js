import React, { Component } from 'react';
import {
    Text,
    View
    } from 'react-native';



export default class database  {
    constructor(props) {
        //super(props);
        this.state = {name: "database"};
    }
    render() {
        return (
            <View >
                <Text >
                {this.state.name}
                </Text>

            </View>
        );
    }

    create(value){
        this.setState({name:value})
    }
    destroy(value){

    }
}