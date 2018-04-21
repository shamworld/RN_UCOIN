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
import TradingLeftView from './TradingLeftView';
import TradingRightView from './TradingRightView';
import Msg from '../../Compent/LoadingMsg';



const {width,height}=Dimensions.get('window');
export default class TradingContent extends Component{

    render(){
        return(
            <View style={stypes.contain}>
                <TradingLeftView style={{width:width/2.0}}/>
                <TradingRightView style={{width:width/2.0}}/>
            </View>
        )
    }
}


const stypes=StyleSheet.create({
    contain:{
        flexDirection:'row',
        backgroundColor:'rgb(27,38,45)',
    },
    
})