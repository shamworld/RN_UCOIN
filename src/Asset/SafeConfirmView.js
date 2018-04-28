import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    Switch,
    Alert,
    TextInput

}from 'react-native';
import React, { Component } from 'react';
import CountDownButton from '../../Compent/CountDownButton';

const {width,height}=Dimensions.get('window');
export default class SafeConfirmView extends Component{

    constructor(props){
        super(props);
        this.state = {
            smsText:'',

        }
    }
    static navigationOptions = ({navigation})=>({
        title:'安全验证',

    })
   
    render(){
        return(
            <View style={stypes.contains}>
                <Text style={stypes.smsText}>短信验证码</Text>
                <View style={{flexDirection:'row',marginTop:5}}>
                    <TextInput 
                        style={stypes.bgView}
                        onChangeText={(text)=>this.setState({smsText:text})}
                        value={this.state.smsText}
                    />
                    <CountDownButton 
                        enable={true}
                        style={{marginLeft:10,marginRight:10,backgroundColor:'rgb(77,100,112)',height:30}}
                        textStyle={{color: 'rgb(196,199,207)'}}
                        timerCount={60}
                        timerTitle={'获取验证码'}
                        timerActiveTitle={['请在（','s）后重试']}
                        onClick={(_shouldStartCountting)=>{
                        // shouldStartCountting是一个回调函数，根据调用接口的情况在适当的时候调用它来决定是否开始倒计时
                        //请求接口返回是否发送验证码成功 然后回调回去
                        _shouldStartCountting(true)
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
                <View style={{marginTop:20}}>
                    <TouchableOpacity activeOpacity={1} >
                        <Text style={stypes.btnView}>提现</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const stypes = StyleSheet.create({
    contains:{
        backgroundColor:'rgb(27,38,45)',
        flex:1
    },
    smsText:{
        height:20,
        lineHeight:20,
        color:'rgb(196,199,207)',
        marginLeft:20,
        marginTop:15

    },
    bgView:{
        marginLeft:20,
        marginRight:20,
        height:30,
        backgroundColor:'rgb(38,54,64)',
        borderColor:'rgb(56,73,82)',
        borderWidth:1,
        width:230,
        color:'white'
    
    },
    codeBtn:{
        marginLeft:10,
        marginRight:20,
        height:30,
        lineHeight:30,
        backgroundColor:'rgb(77,100,112)',
        color:'rgb(196,199,207)',
        textAlign:'center'
    },
    btnView:{
        color:'rgb(255,182,0)',
        borderColor:'rgb(255,182,0)',
        borderWidth:1,
        marginLeft:20,
        marginRight:20,
        height:30,
        lineHeight:30,
        textAlign:'center',
    },
});