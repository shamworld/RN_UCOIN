import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    TextInput,
    Keyboard,
    Button,
    Alert,
    Platform

}from 'react-native';
import React, { Component } from 'react';
import Msg from '../../Compent/LoadingMsg';
// import Loading from '../../Compent/loadingNew';
import RegisterView from './RegisterView';
import ForgetPWDView from './ForgetPWDView';
import globar from '../../Compent/Globar';
import LoginMobileView from './LoginMobileView';
import LoginGoogleView from './LoginGoogleView';
import storage from '../../Compent/StorageUtil';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
import Load from '../../Compent/loading';
import AlertSelected from '../../Compent/DialogSelected';

const {width,height}=Dimensions.get('window');
const selectedArr = ["邮箱找回", "手机找回"];
var userPlaceHolder='uncoinex@qq.com';
export default class LoginView extends Component{
    constructor(props){
        super(props);
        this.state=({
            usreName:'',
            pwd:'',
            msg:'',
            login_key:'',
            loadingText:'',
            type:0
        });
    }
    
    static navigationOptions={
        header:null,
    }

    hideKeyBoard(){
        Keyboard.dismiss();
    }
    //登录
    loginClick(){
        Keyboard.dismiss();
        let err='';
        if(this.state.usreName === ''){
            err = '请输入邮箱';
        }else if(!globar.emailRegular.test(this.state.usreName)){
            err = '邮箱格式不正确';
        }else if(this.state.pwd === ''){
            err = '请输入密码';
        }

        if(err !== ''){
            this.setState({loadingText:err,type:3},() => {
                this.Load.show();
            });
            return ;
        }
        // this.LoginMobileView.show();
        
        this.requestLogin();


        // this.props.navigation.replace('MarkView');

    }

    requestLogin(){
        // this.setState({loadingText:'正在加载...',type:2},() => {
        //     this.Load.show();
        // });
        let params={
            login_field:this.state.usreName,
            password:this.state.pwd,
            client:Platform.OS == 'android'?'3':Platform.OS == 'ios'?'4':''
        }

        Request.post(Config.api.homeList+'v2/auth/login',params,false).then((data)=>{
            // this.Load.hide();
            console.log(data);
            if(data.code==0){
                console.log(data);
                  if(data.data.validate_type=='none'){
                    storage.save({
                        key:'userToken',
                        data:{
                            access_token:data.data.token.access_token,
                            token_type:data.data.token.token_type,
                            refresh_token:data.data.token.refresh_token
                        }
                    })
                    this.props.navigation.replace('MarkView');
                  }else if(data.data.validate_type=='google'){
                    this.setState({login_key:data.data.login_key},() => {
                        this.LoginGoogleView.show();
                    });
                    
                  }else if(data.data.validate_type=='mobile'){
                    
                    this.setState({login_key:data.data.login_key},() => {
                        this.LoginMobileView.show();
                    });
                    
                  }
            }else if (data.code==9001){

            }else{
                this.setState({loadingText:data.msg,type:3},()=>{
                    this.Load.show();
                });
            }
        },(err)=>{
            this.setState({loadingText:'服务器异常或网络错误',type:3},()=>{
                this.Load.show();
            });
        });
    }
    //忘记密码
    forgetPwd(){
        
        this.dialog.show("找回密码方式", selectedArr, '#333333', this.callbackSelected.bind(this));
    }
    // 回调
    callbackSelected(i){
        switch (i){
            case 0: // 邮箱
            this.props.navigation.navigate('ForgetPWDView',{'types':1});
                break;
            case 1: // 手机
            this.props.navigation.navigate('ForgetPWDView',{'types':2});
                break;
        }
    }
    //注册
    reginseClick(){
        this.props.navigation.navigate('RegisterView');
    }


    render(){

        return (
            <View style={stypes.contian}>
                <TouchableOpacity activeOpacity={1} onPress={()=>{this.hideKeyBoard()}}>
                    <View style={{flexDirection:'row',marginTop:64,marginLeft:70,width:width-140,height:120,alignItems: 'center'}} >
                        <Image style={stypes.imageHeader} resizeMode='center' source={require('../../Images/图标/logo.png')}/>
                        <Text style={stypes.loginText}>| 登录</Text>
                    </View>
                    <TextInput style={stypes.userText} value={this.state.usreName} multiline={false}
                    blurOnSubmit={true} placeholder='uncoinex@qq.com' placeholderTextColor='rgb(153,153,153)'
                    onChangeText = {(text) => this.setState({usreName:text})}/>
                    <TextInput style={stypes.pwdText} value={this.state.pwd} multiline={false}
                    blurOnSubmit={true} placeholder='密码' placeholderTextColor='rgb(153,153,153)' secureTextEntry={true} 
                    onChangeText = {(text) => this.setState({pwd:text})}/>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.loginClick()}>
                        <Text style={stypes.loginBtn}>登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.forgetPwd()}>
                        <Text style={stypes.forgetPwd}>忘记密码?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.reginseClick()}>
                        <View style={{flexDirection:'row'}}>
                        <Text style={stypes.reginseText1}>还没有账户,</Text>
                        <Text style={stypes.reginseText2}>立即注册</Text>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
                
              
                <LoginMobileView 
                ref = {(LoginMobileView) => this.LoginMobileView = LoginMobileView}
                login_key={this.state.login_key}
                mobileClick={()=>this.props.navigation.replace('MarkView')}
                />
                <LoginGoogleView 
                ref = {(LoginGoogleView) => this.LoginGoogleView = LoginGoogleView}
                login_key={this.state.login_key}
                googleClick = {()=>this.props.navigation.replace('MarkView')}
                />
                <Load 
                ref = {(Load) => this.Load = Load}
                title = {this.state.loadingText}
                type = {this.state.type}
                />
                <AlertSelected ref={(dialog)=>{
                    this.dialog = dialog;
                }}/>
            </View>
            

        );
    }

}

const stypes = StyleSheet.create({
    contian:{
        flex:1,
        height:height,
        backgroundColor:'rgb(27,38,45)'
    },
    imageHeader:{
        marginLeft:20,
    },
    loginText:{
        lineHeight:120,
        marginLeft:20,
        fontSize:24,
        color:'rgb(196,199,201)',
    },
    userText:{
        marginTop:45,
        marginLeft:60,
        width:width-120,
        height:40,
        borderBottomColor:'#ffffff',
        borderBottomWidth:1,
        textAlign:'center',
        color:'#fff'
    },
    pwdText:{
        marginTop:25,
        marginLeft:60,
        width:width-120,
        height:40,
        borderBottomColor:'#ffffff',
        borderBottomWidth:1,
        textAlign:'center',
        color:'#fff'
    },
    loginBtn:{
        marginTop:40,
        marginLeft:60,
        width:width-120,
        height:40,
        backgroundColor:'rgb(255,182,0)',
        color:'#fff',
        lineHeight:40,
        textAlign:'center'
    },
    forgetPwd:{
        marginTop:30,
        textAlign:'center',
        marginLeft:width/2.0-40,
        width:80,
        height:30,
        lineHeight:30,
        fontSize:14,
        color:'rgb(196,199,201)',
    },
    reginseText1:{
        marginLeft:width/2.0-90,
        fontSize:15,
        marginTop:5,
        color:'rgb(196,199,201)',
        height:30,
        width:90,
        textAlign:'right',
        lineHeight:30,
    },
    reginseText2:{
        fontSize:15,
        marginTop:5,
        color:'rgb(255,182,0)',
        height:30,
        textAlign:'left',
        lineHeight:30,
    },
});