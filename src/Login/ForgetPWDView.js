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
import EmailTextView from './EmailTextView';

const {width,height}=Dimensions.get('window');
export default class ForgetPWDView extends Component{

    constructor(props){
        super(props);
        this.state = ({
            emailText:'',
            msg:'',
        });
    }

    static navigationOptions = {
        title:'找回密码'
    }

    suerBtnClick(){
        Keyboard.dismiss();
        if(this.state.emailText === ''){
            this.setState({msg:'请输入邮箱'},() => {
                this.Msg.show();
            });

            return;
        }
        this.props.navigation.navigate('EmailTextView',{'email':this.state.emailText});
    }
    hideKeyBoard(){
        Keyboard.dismiss();
    }
    
    render(){
        return(
            <View style={stypes.contian}>
               <TouchableOpacity activeOpacity = {1} onPress = {() => {Keyboard.dismiss()}}>
                    <View style={{height:height}}>
                        <Text style = {stypes.emailLabel}>邮箱地址</Text>
                        <TextInput 
                                value = {this.state.emailText}
                                onChangeText = {(text) => this.setState({emailText:text})}
                                style = {stypes.emailInput}
                        />
                        <View style={{marginTop:40}}>
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
        marginTop:30,
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