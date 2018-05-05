
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
    Platform,
    Alert,
} from 'react-native';

import Msg from '../../Compent/LoadingMsg';
import ProtectView from './ProtectView';
import globar from '../../Compent/Globar';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';

const {width,height}=Dimensions.get('window');
export default class RegisterView extends Component{

    constructor(props){
        super(props);
        this.state = ({
            emailText:'',
            inviteCodeText:'',
            passWold:'',
            surePassWord:'',
            isRec:false,
            msg:'',
        });
    }

    static navigationOptions = {
        title:'注册',
    }

    privacyProtectionClick(){
        
        this.props.navigation.navigate('ProtectView');
    }

    registerClick(){
        Keyboard.dismiss()
        let err='';
        if(this.state.emailText === ''){
            err = '请输入邮箱';
        }else if(!globar.emailRegular.test(this.state.emailText)){
            err = '邮箱格式不正确';
        }else if(this.state.passWold === ''){
            err = '请输入密码';
        }else if(this.state.surePassWord === ''){
            err = '请输入确认密码';
        }else if(this.state.surePassWord !== this.state.passWold){
            err = '两次输入密码不一致';
        }else if(!this.state.isRec){
            err = '请勾选U-COIN协议';
        }

        if(err !== ''){
            this.setState({msg:err},()=>{
                this.Msg.show();
            })

            return ;
        }
        this.requestRegister();
        
    }
    requestRegister(){
        let params={
            email:this.state.emailText,
            password:this.state.passWold,
            password_confirmation:this.state.surePassWord,
            pid:this.state.pid
        }

        Request.post(Config.api.homeList+'v2/email/register',params,false).then((data)=>{
            if(data.code==0){
                this.props.navigation.navigate('ResetSucessView',{'isRec':true,'email':this.state.emailText});   
            }else if (data.code==9001){

            }else{
                this.setState({msg:data.msg},()=>{
                    this.Msg.show();
                });
            }
        },(err)=>{
            console.log('错误信息'+err);
            alert(err);
        });
        
    }
    gotoLoginClick(){
        Keyboard.dismiss()
        this.props.navigation.goBack();
    }
    hideKeyBoard(){
        Keyboard.dismiss();
    }
    render(){
        return (
            <View style={stypes.contians}>
                <TouchableOpacity activeOpacity={1} onPress={() => {Keyboard.dismiss()}}>
                    <TextInput 
                        value = {this.state.emailText}
                        placeholder = '邮箱'
                        onChangeText = {(text) => this.setState({emailText:text})}
                        placeholderTextColor = 'rgb(153,153,153)'
                        style = {stypes.email}
                        blurOnSubmit={true}
                    />
                    <TextInput 
                        value = {this.state.inviteCodeText}
                        placeholder = '邀请码(选填)'
                        onChangeText = {(text) => this.setState({inviteCodeText:text})}
                        placeholderTextColor = 'rgb(153,153,153)'
                        style = {stypes.email}
                        blurOnSubmit={true}
                    />
                    <TextInput 
                        value = {this.state.passWold}
                        placeholder = '登录密码'
                        onChangeText = {(text) => this.setState({passWold:text})}
                        placeholderTextColor = 'rgb(153,153,153)'
                        style = {stypes.email}
                        blurOnSubmit={true}
                    />
                    <TextInput 
                        value = {this.state.surePassWord}
                        placeholder = '确认密码'
                        onChangeText = {(text) => this.setState({surePassWord:text})}
                        placeholderTextColor = 'rgb(153,153,153)'
                        style = {stypes.email}
                        blurOnSubmit={true}
                    />

                    <View style={{marginLeft:20,marginRight:20,height:20,flexDirection:'row',marginTop:15}}>
                        <TouchableOpacity activeOpacity = {1} onPress = {()=>this.setState({isRec:!this.state.isRec})}>
                            <Image source={this.state.isRec?require('../../Images/图标/对勾.png'):null} style={stypes.hookIcon}/>
                        </TouchableOpacity>
                        <Text style = {{fontSize:12,color:'rgb(196,199,201)',height:20,lineHeight:20,textAlign:'right',marginLeft:5}}>已阅读并同意U-COIN</Text>
                        <TouchableOpacity activeOpacity = {1} onPress = {() =>this.privacyProtectionClick() }>
                            <Text style = {{fontSize:12,color:'rgb(255,182,0)',height:20,lineHeight:20,textAlign:'left'}}> 服务条款 免责声明 隐私保护</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress = {() => this.registerClick()} activeOpacity = {1}>
                    <Text style={stypes.register}>注册</Text>
                    </TouchableOpacity>
                
                    <View style={{flexDirection:'row',marginTop:50,height:20}}>
                        <Text style={{fontSize:16,color:'rgb(196,199,201)',height:20,lineHeight:20,textAlign:'right',marginLeft:width/2.0-70}}>已有账户,</Text>
                        <TouchableOpacity onPress = {() => this.gotoLoginClick()} activeOpacity = {1}>
                            
                            <Text style = {{fontSize:16,color:'rgb(255,182,0)',height:20,lineHeight:20,textAlign:'left'}}>立即登录</Text>
                        </TouchableOpacity>
                    </View>
                    </TouchableOpacity>

                
                <Msg ref = {(Msg) => this.Msg = Msg} title = {this.state.msg}/>
            </View>
        )
    }


}

const stypes = StyleSheet.create({
    contians:{
        height:height,
        backgroundColor:'rgb(27,39,45)',
        flex:1,
    },
    email:{
        marginTop:10,
        marginLeft:20,
        marginRight:20,
        height:35,
        borderBottomWidth:1,
        borderBottomColor:'#fff',  
        textAlign:'left',
        fontSize:14,
        color:'#fff'
    },
    hookIcon:{
        width:15,
        height:15,
        marginTop:1.5,
        borderWidth:1,
        borderColor:'#fff',
    },
    register:{
        marginTop:40,
        marginLeft:20,
        marginRight:20,
        height:35,
        textAlign:'center',
        color:'rgb(255,182,0)',
        borderColor:'rgb(255,182,0)',
        borderWidth:1,
        lineHeight:35,
    }

});







