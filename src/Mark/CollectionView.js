import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,

}from 'react-native';
import React, { Component } from 'react';


const {width,height}=Dimensions.get('window');
export default class CollectionView extends Component{

    constructor(props){
        super(props);
        
    }
    static navigationOptions = {
        title:'收藏',
    }
    render(){

        return (
            <View style = {stypes.contains}>
               
            </View>
        );
    }

}

const stypes = StyleSheet.create({
    contains:{
        height:height,
        backgroundColor:'rgb(27,38,45)',
        flex:1
    }
});