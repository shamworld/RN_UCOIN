import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    RefreshControl,
    ActivityIndicator
}from 'react-native';
import React, { Component } from 'react';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
const {width,height}=Dimensions.get('window');
import Msg from '../../Compent/LoadingMsg';

export default class TradingRightView extends Component{

    render(){
        return(
            <View style={stypes.contain}>
            <Text style={{color:'white'}}>女神</Text>
            </View>
        )
    }
}


const stypes=StyleSheet.create({
    contain:{
        width:width/2.0,
        backgroundColor:'rgb(27,38,45)',
    }
})