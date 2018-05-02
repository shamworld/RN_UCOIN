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
export default class CertificationErrorView extends Component{
    static navigationOptions = {
        title:'认证状态'
    }
    constructor(props){
        super(props);
        
    }
    sureBtnClick(){

    }
    render(){
        return(
            
            <View style={stypes.contairn}>
                <Text style={stypes.statusText}>您的认证信息有误</Text>
                <Text style={[stypes.statusText,{marginTop:5}]}>请填写正确的身份信息</Text>
                <Text style={[stypes.infoText,{marginTop:20,marginLeft:20}]}>基本认证信息</Text>
                <Text style={stypes.infoText}>认证类型：身份证</Text>
                <Text style={stypes.infoText}>姓名：贪吃的猫</Text>
                <Text style={stypes.infoText}>国籍：中国大陆</Text>
                <Text style={stypes.infoText}>证件号码：1********1</Text>
                <Text style={stypes.infoText}>驳回原因：这里是驳回原因</Text>
                <Text style={stypes.infoText}>驳回时间：2018-05-02</Text>
                <View style={{marginTop:20,height:35}}>
                    <TouchableOpacity activeOpacity = {1} onPress={()=>this.sureBtnClick()}>
                        <Text style={stypes.suerBtn}>提交</Text>
                    </TouchableOpacity>
                </View>
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
        fontSize:18,
        color:'red'
    },
    infoText:{
        color:'rgb(196,199,201)',
        fontSize:14,
        marginLeft:40,
        marginTop:5
    },
    suerBtn:{
        marginLeft:40,
        textAlign:'center',
        color:'rgb(255,182,0)',
        borderColor:'rgb(255,182,0)',
        borderWidth:1,
        lineHeight:35,
        width:100
    }

});