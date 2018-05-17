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

import Msg from '../../Compent/loading';
import EmailTextView from './EmailTextView';
import globar from '../../Compent/Globar';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
import CountDownButton from '../../Compent/CountDownButton';
const {width,height}=Dimensions.get('window');

export default class ForgetPWDView extends Component{

    constructor(props){
        super(props);
        this.state = ({
            emailText:'',
            msg:'',
            code:'',
            type:0,
        });
    }

    static navigationOptions = {
        title:'找回密码'
    }

    suerBtnClick(){
        Keyboard.dismiss();
        let {types}=this.props.navigation.state.params;
        if(this.state.emailText === ''){
            this.setState({msg:'请输入邮箱',type:3},() => {
                this.Msg.show();
            });

            return;
        }else if(!globar.emailRegular.test(this.state.emailText)&&types==1){
            this.setState({msg:'邮箱格式不正确',type:3},() => {
                this.Msg.show();
            });

            return;
        }else if(this.state.code === ''){
            this.setState({msg:'请输入验证码',type:3},() => {
                this.Msg.show();
            });

            return;
        }
        this.requestEmailChech();
        
    }

    requestEmailChech(){
        this.setState({msg:'正在验证...',type:2},() => {
            this.Msg.show();
        });
        let {types}=this.props.navigation.state.params;
        let pramas=types==1?{email:this.state.emailText,code:this.state.code}:{mobile:this.state.emailText,code:this.state.code};
        console.log(pramas.mobile+'---'+pramas.code);
        let url=types==1?'v2/email/check-code':'v2/sms/check-code';
        Request.post(Config.api.homeList+url,pramas,false).then((data)=>{
            // this.Msg.hide();
            console.log(data);
            if(data.code==0){
                this.Msg.hide();
                this.props.navigation.navigate('EmailTextView',{'email':this.state.emailText,'data':data.data,types:types});
            }else if (data.code==9001){

            }else{
                this.setState({msg:data.msg,type:3},()=>{
                    this.Msg.show();
                });
            }
        },(err)=>{
            
            console.log('错误信息'+err);
            // alert(err);
            this.setState({msg:'服务器异常或网络错误',type:3},()=>{
                this.Msg.show();
            });
        });

    }
    //获取验证码
    requestMobileCode(anyWay){
        Keyboard.dismiss();
        let {types}=this.props.navigation.state.params;
        if(this.state.emailText === ''){
            this.setState({msg:types==1?'请输入邮箱':'请输入手机号',type:3},() => {
                this.Msg.show();
            });
            anyWay(false);
            return ;
        }else if(!globar.emailRegular.test(this.state.emailText)&&types==1){
            this.setState({msg:'邮箱格式不正确',type:3},() => {
                this.Msg.show();
            });
            anyWay(false);
            return ;
        }
        let pramas=types==1?{email:this.state.emailText}:{mobile:this.state.emailText};
        let url = '';
        url=types==1?'v2/email/send':'v2/sms/send';
        Request.post(Config.api.homeList+url,pramas,false).then((data)=>{
            console.log(data);
            if(data.code==0){
                anyWay(true);
                this.setState({msg:'发送成功',type:3},()=>{
                    
                });
                this.Msg.show();
            }else if (data.code==9001){

            }else{
                this.setState({msg:data.msg,type:3},()=>{
                    
                });
                this.Msg.show();
                anyWay(false);
            }
        },(err)=>{
            console.log('错误信息'+err);
            this.setState({msg:'服务器异常或网络错误',type:3},()=>{
                this.Msg.show();
            });
            anyWay(false);
        });
    }
    hideKeyBoard(){
        Keyboard.dismiss();
    }
    
    render(){
        let {types}=this.props.navigation.state.params;
        return(
            <View style={stypes.contian}>
               <TouchableOpacity activeOpacity = {1} onPress = {() => {Keyboard.dismiss()}}>
                    <View style={{height:height}}>
                        <Text style = {stypes.emailLabel}>{types==1?'邮箱地址':'手机号'}</Text>
                        <TextInput 
                                value = {this.state.emailText}
                                onChangeText = {(text) => this.setState({emailText:text})}
                                style = {stypes.emailInput}
                        />
                        <Text style = {stypes.emailLabel}>验证码</Text>
                        <View style={{flexDirection:'row'}}>
                            <TextInput 
                                    value = {this.state.code}
                                    onChangeText = {(text) => this.setState({code:text})}
                                    style = {[stypes.emailInput,{width:width-40-130,marginRight:0}]}
                            />
                            <CountDownButton 
                            enable={true}
                            style={{marginLeft:10,marginRight:20,backgroundColor:'rgb(77,100,112)',height:35,marginTop:5}}
                            textStyle={{color: 'rgb(196,199,207)'}}
                            timerCount={60}
                            timerTitle={'获取验证码'}
                            timerActiveTitle={['请在（','s）后重试']}
                            onClick={(_shouldStartCountting)=>{
                            // shouldStartCountting是一个回调函数，根据调用接口的情况在适当的时候调用它来决定是否开始倒计时
                            //请求接口返回是否发送验证码成功 然后回调回去
                            this.requestMobileCode(_shouldStartCountting);
                            // _shouldStartCountting(isRec);
                            // alert(shouldStartCountting);
                            }}
                            timerEnd={
                                ()=>{
                                    this.setState({
                                        state: '重新发送'
                                    })
                                }
                            }
                            />
                        </View>
                        <View style={{marginTop:40}}>
                            <TouchableOpacity activeOpacity = {1} onPress = {() => this.suerBtnClick()}>
                                <Text style={stypes.suerBtn}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
               </TouchableOpacity>
               <Msg ref = {(Msg) => this.Msg = Msg} title = {this.state.msg} type={this.state.type}/>
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
    emailLabel:{
        marginTop:10,
        color:'rgb(196,199,201)',
        fontSize:14,
        marginLeft:20,
        height:20,
        lineHeight:20,
        textAlign:'left',
    },
    emailInput:{
        marginTop:5,
        marginLeft:20,
        marginRight:20,
        backgroundColor:'rgb(38,54,64)',
        borderWidth:1,
        height:35,
        borderColor:'rgb(56,73,82)',
        color:'#fff',
    },
    suerBtn:{
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