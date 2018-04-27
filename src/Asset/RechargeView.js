import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    Switch,
    Alert

}from 'react-native';
import React, { Component } from 'react';
import RecordView from './RecordView';
import Msg from '../../Compent/LoadingMsg';

const {width,height}=Dimensions.get('window');
export default class RechargeView extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg:'',
        }
    }
    static navigationOptions = ({navigation})=>({
        title:'充值',
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

    showMsg(msg){
        this.setState({msg:msg});
        this.Msg.show();
    }

    render(){
        return(
            <View style={stypes.contains}>
                <TouchableOpacity>
                    <View style={{flexDirection:'row',marginTop:15,justifyContent:'center',height:20}}>
                        <Image source={require('../../Images/图标/币种图标.png')} style={{width:15,height:15,marginTop:2.5}}/>
                        <Text style={stypes.coinText}>BTC</Text>
                        <Image source={require('../../Images/图标/下拉.png')} style={{width:10,height:10,marginTop:5}}/>
                    </View>
                </TouchableOpacity>
                <Text style={stypes.assetsText}>0.000000资产</Text>
                <View style={{alignItems: 'center', justifyContent: 'center',marginTop:30}}>
                    <Image source={require('../../Images/图标/二维码.png')}/>
                </View>
                <View style={{marginTop:60}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.showMsg('复制成功')}>
                        <Text style={stypes.btnView}>复制地址</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:30}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.showMsg('复制成功')}>
                        <Text style={stypes.btnView}>复制地址</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[stypes.cluesText,{marginTop:20}]}>温馨提示</Text>
                <Text style={stypes.cluesText}>1.请勿向上述地址充值任何非BTC资产,否则资产将不可找回。</Text>
                <Text style={stypes.cluesText}>2.您充值至上述地址后,需要整个网络节点的确认,1次网络确认后到账,6次网络确认后可提币。</Text>
                <Text style={stypes.cluesText}>3.最小充值金额:0.001BTC,小于最小金额的充值将不会上账。</Text>
                <Text style={stypes.cluesText}>4.您的充值地址不会经常改变,可以重复充值;如有更改,我们会尽量通过网络公告或邮件通知您。</Text>
                <Text style={stypes.cluesText}>5.请务必确认手机安全,防止信息被篡改或泄露。</Text>
                <Msg 
                ref = {(Msg) => this.Msg = Msg}
                title = {this.state.msg}
                />
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
        marginTop:40,
        marginLeft:0,
        marginRight:0,
        textAlign:'center',
        color:'white',
        fontSize:25,
    },
    imageIcon:{
        width:120,
        height:120,

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
    }
});

