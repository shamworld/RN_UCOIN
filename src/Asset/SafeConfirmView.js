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
import Load from '../../Compent/loading';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';

const {width,height}=Dimensions.get('window');
export default class SafeConfirmView extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            smsText:'',
            loadText:'',
            type:0,
        }
    }
    static navigationOptions = ({navigation})=>({
        title:'安全验证',

    })
   //发送短信
    requestSendSMS(_shouldStartCountting){
        Request.post(Config.api.homeList+'v2/sms/send',null,true).then((data) => {
            
            
            if(data.code==0){
                _shouldStartCountting(true);
                this.setState({loadText:'发送成功',type:3},()=>{
                    this.Load.show();
                    
                });
     
                
            }else if (data.code==9001){
                _shouldStartCountting(false);
                this.setState({loadText:data.msg,type:3},()=>{
                    this.Load.show();
                    
                });
                // this.props.toLogin();
            }else{
                _shouldStartCountting(false);
                this.setState({loadText:data.msg,type:3},()=>{
                    this.Load.show();
                });
               
            }
            },(error) =>{
                _shouldStartCountting(false);
                 console.log('错误信息'+error);
                 this.setState({isLoading:true});
             })
    }
    //提现
    reqestRecharge(){
        let err='';

        if(this.state.addressText==''){
            err='请输入验证码';
        }

        if(err!=''){
            this.setState({loadText:err,type:3});
            this.Load.show();
            return;
        }

       let {addressText,numText,id}=this.props.navigation.state.params;
        let params={address:addressText,number:numText,sms_code:this.state.smsText,coin_id:id};
       Request.post(Config.api.homeList+'v2/coin/extract',params,true).then((data) => {
            
            
        if(data.code==0){
            this.setState({loadText:'提现成功',type:3},()=>{
                this.Load.show();
                this.props.navigation.goBack();
            });
 
            
        }else if (data.code==9001){
            this.setState({loadText:data.msg,type:3},()=>{
                this.Load.show();
                
            });
            // this.props.toLogin();
        }else{
            this.setState({loadText:data.msg,type:3},()=>{
                this.Load.show();
            });
           
        }
        },(error) =>{
             console.log('错误信息'+error);
             this.setState({isLoading:true});
         })

    }

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
                        this.requestSendSMS(_shouldStartCountting);
                        
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
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.reqestRecharge()}>
                        <Text style={stypes.btnView}>提现</Text>
                    </TouchableOpacity>
                </View>
                <Load 
                ref = {(Load) => this.Load = Load}
                title = {this.state.loadText}
                type = {this.state.type}
                />
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