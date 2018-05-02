import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    TextInput,
    Keyboard
}from 'react-native';
import React, { Component } from 'react';
import Msg from '../../Compent/LoadingMsg';
import {NavigationActions} from 'react-navigation';

const {width,height}=Dimensions.get('window');
export default class ChangeLoginPWDView extends Component{
    static navigationOptions = {
        title:'修改登录密码'
    }
    constructor(props){
        super(props);
        this.state = ({
            oldPwd:'',
            newPwd:'',
            surePwd:'',
            msg:'',
        });
    }

    suerBtnClick(){
        Keyboard.dismiss();
        let err = '';
        if(this.state.oldPwd === ''){
            err = '请输入旧密码';
        }else  if(this.state.newPwd === ''){
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
            this.setState({msg:err},() => {
                this.Msg.show();
            })

            return ;
        }


        // const resetAction = NavigationActions.reset({//重置导航为login
        //     index:0,
        //     actions:[
        //         NavigationActions.navigate({routeName:'EmailTextView','isRec':false}),
        //     ]
        // });
        // this.props.navigation.dispatch(resetAction);
        this.props.navigation.replace('ResetSucessView',{'isRec':false});
        // this.props.navigation.navigate('ResetSucessView',{'isRec':false});
    }
    hideKeyBoard(){
        Keyboard.dismiss();
    }
    render(){
        return(
            <View style={stypes.contairn}>
            <TouchableOpacity activeOpacity = {1} onPress = {() => {Keyboard.dismiss()}}>
                    <View style={{height:height}}>
                        <Text style = {stypes.emailLabel}>旧密码</Text>
                        <TextInput 
                                value = {this.state.oldPwd}
                                onChangeText = {(text) => this.setState({oldPwd:text})}
                                style = {stypes.emailInput}
                        />
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
               <Msg ref = {(Msg) => this.Msg = Msg} title = {this.state.msg}/>
            </View>
        )
    }

}


const stypes=StyleSheet.create({
    contairn:{
        flex:1,
        backgroundColor:'rgb(27,38,45)',
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

