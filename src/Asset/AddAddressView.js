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
    TextInput,
    Keyboard

}from 'react-native';
import React, { Component } from 'react';
import Msg from '../../Compent/LoadingMsg';
import Load from '../../Compent/loading';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';

const {width,height}=Dimensions.get('window');
export default class AddAddressView extends Component{

    constructor(props){
        super(props);
        this.state = {
            addressText:'',
            labelText:'',
            msg:'',
            loadText:'',
            type:0,
        }
    }


    static navigationOptions = ({navigation})=>({
        title:'添加新地址',
        headerRight:(
            <TouchableOpacity onPress = {()=>{navigation.state.params.popAddressListView()}}>
                <Text style={{color:'rgb(196,199,201)',marginRight:20}}>地址</Text>
            </TouchableOpacity>
        )

    })

    popAddressListView(){
        this.props.navigation.navigate('AddressListView',{id:this.props.navigation.state.params.id});
    }
    componentDidMount(){
        this.props.navigation.setParams({popAddressListView:this.popAddressListView.bind(this)});
    }


    addAddressBtnClick(){
        let err='';
        if(this.state.addressText === ''){
            err='请输入提现地址';
        }else if (this.state.labelText === ''){
            err='请输入标签';
        }

        if(err !== ''){
            this.setState({msg:err},() => {
                this.Msg.show();
            });
            return ;
        }
        
        Keyboard.dismiss()
        this.requestAddAddress();
        
    }
    requestAddAddress(){
        let params={address:this.state.addressText,tag:this.state.labelText,coin_id:this.props.navigation.state.params.id};
        Request.post(Config.api.homeList+'v2/address/add',params,true).then((data) => {
            console.log(data);
            
            if(data.code==0){
     
                this.setState({msg:'添加成功'},() => {
                    this.Msg.show();
                });
                this.props.navigation.goBack();
                
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
                <TouchableOpacity onPress={()=>Keyboard.dismiss()} activeOpacity={1}>
                    <Text style={stypes.leftText}>提现地址</Text>
                    <TextInput 
                        style={stypes.bgView}
                        onChangeText={(text)=>this.setState({addressText:text})}
                        value={this.state.addressText}
                    />
                    <Text style={stypes.leftText}>标签</Text>
                    <TextInput 
                        style={stypes.bgView}
                        onChangeText={(text)=>this.setState({labelText:text})}
                        value={this.state.labelText}
                    />
                    <View style={{marginTop:40}}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.addAddressBtnClick()}>
                            <Text style={stypes.btnView}>添加</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <Msg 
                ref = {(Msg) => this.Msg = Msg}
                title = {this.state.msg}
                />
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
    leftText:{
        marginLeft:20,
        color:'rgb(196,199,207)',
        marginTop:20,
        fontSize:14
    },
    bgView:{
        marginLeft:20,
        marginRight:20,
        height:30,
        backgroundColor:'rgb(38,54,64)',
        borderColor:'rgb(56,73,82)',
        borderWidth:1,
        marginTop:10,
        color:'white'
    
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