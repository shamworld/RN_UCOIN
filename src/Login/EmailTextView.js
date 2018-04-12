import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    StyleSheet,
    TextInput,
    Keyboard,
} from 'react-native';

import Msg from '../../Compent/LoadingMsg';

const {width,height}=Dimensions.get('window');
export default class EmailTextView extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        header:null,
    }
    
    emailCodeClick(){
        alert('邮箱验证码');
    }

    render(){

        var emailStr=this.props.navigation.state.params.email;
        return(
            <View style={stypes.contian}>
                <Text style={stypes.headerText}>邮箱验证</Text>
                <Image source={require('../../Images/图标/mailverify.png')} style={stypes.imageIcon} resizeMode='center'/>
                <Text style = {stypes.validationText}>验证您的邮箱</Text>
                <Text style={stypes.contentText} numberOfLines = {2}>激活邮件已发送至{emailStr},请登录您的邮箱进行激活,该链接15分钟内有效</Text>
                <TouchableOpacity activeOpacity = {1} onPress = {() => this.emailCodeClick()}>
                    <Text style={stypes.emailCodeText}>邮箱验证码</Text>
                </TouchableOpacity>
                <View style={{height:1,marginLeft:50,marginRight:50,backgroundColor:'#fff'}}></View>
            </View>
        )
    }

}


const stypes=StyleSheet.create({

    contian:{
        flex:1,
        height:height,
        backgroundColor:'rgb(27,39,45)',
    },
    headerText:{
        marginTop:20,
        height:44,
        lineHeight:44,
        textAlign:'center',
        width:width,
        color:'rgb(196,199,201)'
    },
    imageIcon:{
        marginTop:64,
        marginLeft:width/2.0-45,
        width:90,
        height:75,
    },
    validationText:{
        marginTop:5,
        marginLeft:0,
        marginRight:0,
        textAlign:'center',
        height:20,
        lineHeight:20,
        color:'#fff',
        fontSize:14
    },
    contentText:{
        marginTop:40,
        marginLeft:25,
        marginRight:25,
        textAlign:'center',
        color:'#fff',
        fontSize:14,
    },
    emailCodeText:{
        marginTop:50,
        marginLeft:50,
        marginRight:50,
        height:35,
        borderBottomWidth:1,
        borderBottomColor:'#fff',
        lineHeight:35,
        textAlign:'center',
        color:'#fff'
    }
});