import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image
}from 'react-native';
import React, { Component } from 'react';

const {width,height}=Dimensions.get('window');
export default class SystemView extends Component{


    render(){

        return (
            <View style={stypes.contairn}>
                <TouchableOpacity activeOpacity={1}>
                    <Image source={require('../../Images/图标/manager.png')} style={stypes.headImage}/>
                </TouchableOpacity>
                <View style={{marginTop:10,flexDirection:'row',marginLeft:20,height:60,marginRight:20}}>
                    <Image source={require('../../Images/图标/我的图标.png')} style={{marginTop:10,width:40,height:40}}/>
                    <Text style={stypes.contentText}>UID:001</Text>
                </View>
                <View style={stypes.lineView}></View>
            </View>
        );
    }

}


const stypes=StyleSheet.create({
    contairn:{
        flex:1,
        backgroundColor:'rgb(27,38,45)',
    },
    headImage:{
        marginLeft:20,
        marginTop:10,
        marginRight:20,
        height:100,
        width:width-40

    },
    contentView:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:60,
        marginLeft:20,
        marginRight:20
    },
    contentText:{
        fontSize:14,
        color:'rgb(196,199,207)',
        lineHeight:60,
        height:60
    },
    lineView:{
        marginLeft:20,
        marginRight:20,
        height:1,
        backgroundColor:'rgb(196,199,207)',
    }
});