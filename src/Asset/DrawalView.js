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

const {width,height}=Dimensions.get('window');
export default class DrawalView extends Component{
    constructor(props){
        super(props);
        this.state = {
            numText:'',
            isRecHidden:true,
        }
    }
    static navigationOptions = ({navigation})=>({
        title:'提现',
        headerRight:(
            <TouchableOpacity onPress = {()=>{navigation.state.params.popRecordView()}}>
                <Text style={{color:'rgb(196,199,201)',marginRight:20}}>记录</Text>
            </TouchableOpacity>
        )
    })
    componentDidMount(){
        this.props.navigation.setParams({popRecordView:this.popRecordView.bind(this)});
    }

    popRecordView(){
        this.props.navigation.navigate('RecordView');
    }

    securityVerification(){
        
    }


    addressListView(){
        return(
            <View style={stypes.addressView}>
                <TouchableOpacity activeOpacity={1} onPress={()=>{this.setState({isRecHidden:true});this.props.navigation.navigate('AddAddressView')}}>
                    <Text style={[stypes.addressBtn,{color:'rgb(255,182,0)'}]}>+添加新地址</Text>
                </TouchableOpacity>
            </View>
        )
    }


    render(){
        return(
            <View style={stypes.contains}>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({isRecHidden:true})}>
                <TouchableOpacity>
                    <View style={{flexDirection:'row',marginTop:15,justifyContent:'center',height:20}}>
                        <Image source={require('../../Images/图标/币种图标.png')} style={{width:15,height:15,marginTop:2.5}}/>
                        <Text style={stypes.coinText}>BTC</Text>
                        <Image source={require('../../Images/图标/下拉.png')} style={{width:10,height:10,marginTop:5}}/>
                    </View>
                </TouchableOpacity>
                <Text style={stypes.assetsText}>0.000000资产</Text>
                <Text style={[stypes.userText,{marginTop:20}]}>日提现额度：不少于0.01BTC</Text>
                <Text style={[stypes.userText,{marginTop:5}]}>今日已用：0.000000BTC</Text>
                <Text style={stypes.leftText}>地址</Text>
                
                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({isRecHidden:false})}>
                    <View style={[stypes.bgView,stypes.viewFlex]}>
                        <Text style={{color:'white'}}></Text>
                        <Image source={require('../../Images/图标/下拉.png')} style={{width:10,height:10,marginTop:10,marginRight:10}}/>
                    </View>
                </TouchableOpacity>
                
                <Text style={stypes.leftText}>数量</Text>
                <TextInput 
                    style={stypes.bgView}
                    onChangeText={(text)=>this.setState({numText:text})}
                    value={this.state.numText}
                />

                <View style={stypes.viewFlex}>
                    <Text style={stypes.leftText}>可用</Text>
                    <Text style={stypes.rightText}>0.000000</Text>
                </View>
                <View style={stypes.viewFlex}>
                    <Text style={stypes.leftText}>手续费</Text>
                    <Text style={stypes.rightText}>5%</Text>
                </View>
                <View style={stypes.viewFlex}>
                    <Text style={stypes.leftText}>实际到账</Text>
                    <Text style={stypes.rightText}>0.000000</Text>
                </View>


                <View style={{marginTop:20}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.securityVerification()}>
                        <Text style={stypes.btnView}>提现</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[stypes.cluesText,{marginTop:10}]}></Text>
                <Text style={stypes.cluesText}>温馨提示</Text>
                <Text style={stypes.cluesText}>1.最小提币数量为:0.01BTC</Text>
                <Text style={stypes.cluesText}>2.为保障资金安全,当您账户安全策略变更,密码修改,使用新地址提币,我们会对提币进行人工审核,请耐心等待工作人员电话或邮件联系</Text>
                <Text style={stypes.cluesText}>3.请务必确认手机安全,防止信息被篡改或泄露</Text>

                </TouchableOpacity>
                {
                    this.state.isRecHidden?<View></View>:this.addressListView()
                }


            </View> 
        )
    }
}


const stypes = StyleSheet.create({
    contains:{
        height:height,
        backgroundColor:'rgb(27,38,45)',
        flex:1
    },
    coinText:{
        height:20,
        lineHeight:20,
        color:'rgb(196,199,207)'
    },
    assetsText:{
        marginTop:20,
        marginLeft:0,
        marginRight:0,
        textAlign:'center',
        color:'white',
        fontSize:25,
    },
    userText:{
        marginLeft:0,
        marginRight:0,
        textAlign:'center',
        fontSize:12,
        color:'rgb(196,199,207)'
    },
    leftText:{
        marginLeft:20,
        color:'rgb(196,199,207)',
        marginTop:20,
        fontSize:14
    },
    rightText:{
        marginRight:20,
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
    
    },
    viewFlex:{
        justifyContent:'space-between',
        flexDirection:'row'
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
    cluesText:{
        marginLeft:20,
        marginRight:20,
        color:'rgb(196,199,207)',
        fontSize:12
    },
    addressView:{
        backgroundColor:'rgb(38,54,64)',
        borderColor:'rgb(56,73,82)',
        borderWidth:1,
        left:20,
        right:20,
        position:'absolute',
        top:214
        
    },
    addressBtn:{
        marginLeft:0,
        marginRight:0,
        textAlign:'center',
        height:30,
        lineHeight:30,
    }
});