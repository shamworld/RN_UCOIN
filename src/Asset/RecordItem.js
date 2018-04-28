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
export default class RecordItem extends Component{

    render(){
        let {number,coin_name,created_at,address,id,status}=this.props.data;
        return(
            <View style={stypes.contains}>
                <View style={stypes.contentView}>
                    <Text style={[stypes.contentText,{marginLeft:10,marginTop:10}]}>{number+coin_name}</Text>
                    <Text style={[stypes.contentText,{marginRight:10,marginTop:10}]}>{status==0?'处理中':'成功'}</Text>
                </View>
                <Text style={[stypes.contentText,{marginLeft:10,marginTop:5,fontSize:12}]}>{created_at}</Text>
                <View style={{flexDirection:'row',marginTop:25}}>
                    <Text style={[stypes.contentText,{marginLeft:10}]}>地址：</Text>
                    <Text style={[stypes.contentText,{height:55,width:width-90}]}>{address}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <Text style={[stypes.contentText,{marginLeft:10,marginTop:5}]}>订单号：</Text>
                    <Text style={[stypes.contentText,{marginTop:5}]}>{id}</Text>
                </View>
            </View>
        )
    }

}


const stypes=StyleSheet.create({
    contains:{
        height:160,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        borderRadius:5,
        backgroundColor:'rgb(38,54,64)'
    },
    contentView:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    contentText:{
        color:'white',
        fontSize:14,

    }
});


