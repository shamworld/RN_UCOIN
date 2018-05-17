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
const {width,height}=Dimensions.get('window');

import globar from '../../Compent/Globar';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';

export default class ResetPWDView extends Component{

    constructor(props){
        super(props);
        this.state = ({
            newPwd:'',
            surePwd:'',
            msg:'',
            type:3
        });
    }

    static navigationOptions = {
        title:'重置密码'
    }

    suerBtnClick(){
        Keyboard.dismiss();
        let err = '';
        if(this.state.newPwd === ''){
            err = '请输入新密码';
        }else if (this.state.newPwd.length <6){
            err = '密码至少6位';
        }else if (this.state.surePwd === ''){
            err = '请输入确认新密码';
        }else if (this.state.surePwd.length <6){
            err = '密码至少6位';
        }else if (this.state.surePwd !== this.state.newPwd){
            err = '两次密码不一致';
        }

        if(err !== ''){
            this.setState({msg:err,type:3},() => {
                this.Msg.show();
            })

            return ;
        }
        this.requestRegistPWD();
    }
    requestRegistPWD(){
        Keyboard.dismiss();
         this.setState({msg:'正在加载...',type:2},() => {
            this.Msg.show();
        });
        let params={
            password:this.state.newPwd,
            password_confirmation:this.state.surePwd,
            forget_password_key:this.props.navigation.state.params.data,
        }
        Request.post(Config.api.homeList+'v2/security/password-reset',params,false).then((data)=>{
            // this.Load.hide();
            console.log(data);
            if(data.code==0){
                console.log(data);
                this.Msg.hide();
                this.props.navigation.navigate('ResetSucessView',{'isRec':false});
            }else if (data.code==9001){

            }else{
                this.setState({loadingText:data.msg,type:3},()=>{
                    this.Load.show();
                });
            }
        },(err)=>{
            this.Load.hide();
            console.log('错误信息'+err);
            alert(err);
        });
    }
    hideKeyBoard(){
        Keyboard.dismiss();
    }
    
    render(){
        return(
            <View style={stypes.contian}>
               <TouchableOpacity activeOpacity = {1} onPress = {() => {Keyboard.dismiss()}}>
                    <View style={{height:height}}>
                        <Text style = {stypes.emailLabel}>新密码</Text>
                        <TextInput 
                                value = {this.state.newPwd}
                                onChangeText = {(text) => this.setState({newPwd:text})}
                                style = {stypes.emailInput}
                        />
                        <Text style = {stypes.emailLabel}>确认新密码</Text>
                        <TextInput 
                                value = {this.state.surePwd}
                                onChangeText = {(text) => this.setState({surePwd:text})}
                                style = {stypes.emailInput}
                        />
                        <View style={{marginTop:40,height:35}}>
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
        textAlign:'center',
        color:'rgb(255,182,0)',
        borderColor:'rgb(255,182,0)',
        borderWidth:1,
        lineHeight:35,
    }
    
});