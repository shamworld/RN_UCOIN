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
export default class ResetPWDView extends Component{

    constructor(props){
        super(props);
        this.state = ({
            newPwd:'',
            surePwd:'',
            msg:'',
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
            this.setState({msg:err},() => {
                this.Msg.show();
            })

            return ;
        }
        this.props.navigation.navigate('ResetSucessView',{'isRec':false});
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
               <Msg ref = {(Msg) => this.Msg = Msg} title = {this.state.msg}/>
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