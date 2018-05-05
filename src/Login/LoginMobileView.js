import React, { Component } from 'react';
import {
 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput ,
  ScrollView,
  DeviceEventEmitter,
  Modal,
  ActivityIndicator,
  Keyboard,
  Alert,

 
} from 'react-native';
const {width,height}=Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CountDownButton from '../../Compent/CountDownButton';
import Loading from '../../Compent/loadingNew';
import storage from '../../Compent/StorageUtil';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
import Load from '../../Compent/loading';

export default class LoginMobileView extends Component {


    constructor(props){
      super(props);
      this.state={
         visible:false,
         codeText:'',
         loadingText:'',
         msg:'',
         type:3
      }



    }
    //短信验证码
    requestMobileCode(_shouldStartCountting){
        Keyboard.dismiss();
        
        let params={
            login_key:this.props.login_key,
        }
        // this.setState({loadingText:'正在验证...'},() => {
        //     this.Loading.show();
        // });
        Request.post(Config.api.homeList+'v2/sms/send',params,false).then((data)=>{
            if(data.code==0){
                this.setState({msg:'发送成功。请注意查收',type:3},()=>{
                    this.Load.show();
                });
                _shouldStartCountting(true);
            }else if (data.code==9001){

            }else{
                this.setState({msg:data.msg,type:3},()=>{
                    this.Load.show();
                });
                _shouldStartCountting(false);
            }
        },(err)=>{
            // this.Loading.hide();
            console.log('错误信息'+error);
            alert(err);
            _shouldStartCountting(false);
        });
    }
    //登录
    requestMobileLogin(){
        Keyboard.dismiss();
        let err='';
        if(this.state.codeText === ''){
            err = '请输入验证码';
        }

        if(err !== ''){
            this.setState({msg:err,type:3},() => {
                this.Load.show();
            });
            return ;
        }
        let params={
            login_key:this.props.login_key,
            sms_code:this.state.codeText
        }

        Request.post(Config.api.homeList+'v2/auth/mobile/login',params,false).then((data)=>{
            
            if(data.code==0){
                
                storage.save({
                    key:'userToken',
                    data:{
                        access_token:data.data.access_token,
                        token_type:data.data.token_type,
                        refresh_token:data.data.refresh_token
                    }
                })
                this.props.mobileClick();
            }else if (data.code==9001){

            }else{
                this.setState({msg:data.msg,type:3},()=>{
                    this.Load.show();
                });
            }
        },(err)=>{
            console.log('错误信息'+err);
            alert(err);
        });
    }

    //显示modal     
    show(){
      this.setState({visible:true});

    }

    //关闭modal
    hide(){
      this.setState({visible:false});
    }
    render() {
      return(
            
               <Modal
                  animationType='none'                               // 淡入
                  transparent={true}                                    // 透明
                  visible={this.state.visible}                          // 根据isModal决定是否显示
                  onRequestClose={() => {this.props.back&&this.setState({visible:false})}}        // android必须实现
               > 
                <View style={styles.container}>
                <KeyboardAwareScrollView
                    // style={{ backgroundColor: '#4c69a5' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={false}
                >
                    <View style={styles.modalViewStyle}>
                        <TouchableOpacity onPress={()=>{this.setState({visible:false}),Keyboard.dismiss()}}  activeOpacity={1}>
                            <Image source={require('../../Images/图标/输入框清除按钮.png')} style={styles.clearBtn}/>
                        </TouchableOpacity>
                        <Text style={styles.titleLabel}>手机验证</Text>
                        <View style={{flexDirection:'row',marginTop:30}}>
                            <TextInput 
                            value = {this.state.codeText}
                            onChangeText = {(text) => this.setState({codeText:text})}
                            style = {styles.nameInput}
                            placeholder='请输入验证码'
                            placeholderTextColor='rgb(153,153,153)'
                            />
                            <CountDownButton 
                            enable={true}
                            style={{marginLeft:10,marginRight:10,backgroundColor:'rgb(77,100,112)',height:35}}
                            textStyle={{color: 'rgb(196,199,207)'}}
                            timerCount={60}
                            timerTitle={'获取验证码'}
                            timerActiveTitle={['请在（','s）后重试']}
                            onClick={(_shouldStartCountting)=>{
                            // shouldStartCountting是一个回调函数，根据调用接口的情况在适当的时候调用它来决定是否开始倒计时
                            //请求接口返回是否发送验证码成功 然后回调回去
                            this.requestMobileCode(_shouldStartCountting);
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
                            <TouchableOpacity activeOpacity={1} onPress={()=>this.requestMobileLogin()}>
                                <Text style={styles.btnView}>提交</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                 </KeyboardAwareScrollView>
                </View>
                <Load 
                ref = {(Load) => this.Load = Load}
                title = {this.state.msg}
                type = {this.state.type}
                />
              </Modal>

                
         
        );
    }
 

     
 
   
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'rgba(1,1,1,0.2)'
    },

    modalViewStyle:{

        backgroundColor:'rgb(27,38,45)',
        marginLeft:40,
        marginRight:40,
        height:200,
        marginTop:height/2.0-60,
        
    },
    clearBtn:{
        top:5,
        width:15,
        height:15,
        position:'absolute',
        right:10
    },
    titleLabel:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        color:'rgb(255,182,0)',
        marginTop:20,
        textAlign:'center',
        // marginLeft:0,
        // marginRight:0,
    },
    nameInput:{
        marginLeft:20,
        width:150,
        backgroundColor:'rgb(38,54,64)',
        borderWidth:1,
        height:35,
        borderColor:'rgb(56,73,82)',
        color:'#fff',
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
