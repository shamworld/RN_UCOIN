import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    Switch,
    Alert

}from 'react-native';
import React, { Component } from 'react';

const {width,height}=Dimensions.get('window');
export default class RecordView extends Component{
    static navigationOptions = ({navigation})=>({
        title:'记录',

    })



    render(){
        return(
            <View style={stypes.contains}>
            </View>
        )
    }
}


const stypes = StyleSheet.create({
    contains:{
        height:height,
        backgroundColor:'rgb(27,38,45)',
        flex:1
    }
});