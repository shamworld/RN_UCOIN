import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    Keyboard,
    TextInput,
    ImageBackground,
    ScrollView
}from 'react-native';
import React, { Component } from 'react';
import Msg from '../../Compent/LoadingMsg';

const {width,height}=Dimensions.get('window');
export default class CertificationSucView extends Component{
    static navigationOptions = {
        title:'认证状态'
    }
    constructor(props){
        super(props);
        
    }
    render(){
        let {statues}=this.props.navigation.state.params;
        return(
            
            <View style={stypes.contairn}>
                <Text style={[stypes.statusText,statues==0?{color:'rgb(255,182,0)'}:{color:'rgb(85,255,0)'}]}>{statues==0?'认证中...':'已认证'}</Text>
                <Text style={[stypes.infoText,{marginTop:20,marginLeft:20}]}>基本认证信息</Text>
                <Text style={stypes.infoText}>认证类型：身份证</Text>
                <Text style={stypes.infoText}>账户：3120</Text>
                <Text style={stypes.infoText}>姓名：贪吃的猫</Text>
                <Text style={stypes.infoText}>生日：2018-05-02</Text>
                <Text style={stypes.infoText}>国籍：中国大陆</Text>
                <Text style={stypes.infoText}>证件号码：1********1</Text>
            </View>
        )
    }

}


const stypes=StyleSheet.create({
    contairn:{
        flex:1,
        backgroundColor:'rgb(27,38,45)',
    },
    statusText:{
        marginLeft:20,
        marginTop:20,
        fontSize:18
    },
    infoText:{
        color:'rgb(196,199,201)',
        fontSize:14,
        marginLeft:40,
        marginTop:5
    }

});