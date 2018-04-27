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
import DrawalView from './DrawalView';
import RechargeView from './RechargeView';


const {width,height}=Dimensions.get('window');
export default class AssetView extends Component{

    // 构造
    constructor(props) {
        super(props);

        var dataSource=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
        // 初始状态
        this.state = {

            value: true,
            hiddenView:false,
            dataSource:dataSource.cloneWithRows([
                {coin_name:'BTC',disabled:6.01200000,available:93.98600000},
                {coin_name:'FUC',disabled:6.01200000,available:93.98600000},
                {coin_name:'HCC',disabled:6.01200000,available:93.98600000},
                {coin_name:'SIX',disabled:6.01200000,available:93.98600000},
                {coin_name:'ITS',disabled:6.01200000,available:93.98600000},
                {coin_name:'EDU',disabled:6.01200000,available:93.98600000},
                {coin_name:'ETP',disabled:6.01200000,available:93.98600000},
                {coin_name:'UBC',disabled:6.01200000,available:93.98600000},
            ]),

        };
    }


    renderRowItem(data){
        return (
            <View>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({hiddenView:!this.state.hiddenView})}>
                    <Text style={{height:30,lineHeight:30,marginLeft:20,color:'white'}}>{data.coin_name}</Text>
                    {
                        this.state.hiddenView?
                        <View></View>
                        :
                        <View style={{marginTop:10,height:70}}>
                            <View style={stypes.hiddenView}>
                                <Text style={[stypes.itemText,{marginLeft:20}]}>总资产</Text>
                                <Text style={[stypes.itemText,{marginRight:20}]}>{(data.disabled+data.available).toFixed(6)}</Text>
                            </View>
                            <View style={stypes.hiddenView}>
                                <Text style={[stypes.itemText,{marginLeft:20}]}>可用</Text>
                                <Text style={[stypes.itemText,{marginRight:20}]}>{data.available.toFixed(6)}</Text>
                            </View>
                            <View style={stypes.hiddenView}>
                                <Text style={[stypes.itemText,{marginLeft:20}]}>冻结</Text>
                                <Text style={[stypes.itemText,{marginRight:20}]}>{data.disabled.toFixed(6)}</Text>
                            </View>
                        </View>
                    }
                    <View style={{marginLeft:10,marginTop:5,backgroundColor:'#f2f2f2',height:0.5,marginRight:0}}></View>
                </TouchableOpacity>
            </View>
        )
    }

    render(){

        return (
            <View style={stypes.contains}>
                <Text style={stypes.textMain}>当前估值</Text>
                <Text style={[stypes.textMain,{fontSize:25,marginTop:30,color:'white'}]}>0.000000</Text>
                <Text style={stypes.textMain}>￥0.000000</Text>
                <View style={stypes.buySellView}>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('RechargeView')}}>
                        <Text style={stypes.topUpText}>充值</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('DrawalView')}}> 
                        <Text style={stypes.drawalText}>提现</Text>
                    </TouchableOpacity>
                </View>
                <View style={stypes.listHeadView}>
                    <Text style={stypes.listHeadText}>隐藏0资产币种</Text>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({value:!this.state.value})}>
                        <Image style={stypes.switchBtn} resizeMode='cover' source={this.state.value?require('../../Images/图标/开关-开.png'):require('../../Images/图标/开关-关.png')}/>
                    </TouchableOpacity>
                </View>
                {
                    this.state.value?
                    <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRowItem.bind(this)}
                    enableEmptySections = {true}
                    onEndReachedThreshold = {40}
                />
                :<View></View>
                }
            </View>
        );
    }

}


const stypes = StyleSheet.create({
    contains:{
        height:height,
        backgroundColor:'rgb(27,38,45)',
        flex:1
    },
    textMain:{
        textAlign:'center',
        marginTop:15,
        color:'rgb(196,199,201)',
        fontSize:12,
        marginLeft:0,
        marginRight:0
    },
    listHeadView:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'rgb(38,54,64)',
        height:25,
        marginTop:35
    },
    listHeadText:{
        marginLeft:20,
        lineHeight:25,
        color:'rgb(196,199,201)',
        
    },
    switchBtn:{
        marginRight:20,
        marginTop:4,
        height:17,
        marginBottom:4,
        width:25
    },
    buySellView:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10
    },
    topUpText:{
        color:'rgb(218,233,211)',
        backgroundColor:'rgb(62,107,0)',
        height:30,
        width:100,
        lineHeight:30,
        textAlign:'center',
        marginRight:10
    },
    drawalText:{
        color:'rgb(218,233,211)',
        backgroundColor:'rgb(122,0,6)',
        height:30,
        width:100,
        lineHeight:30,
        textAlign:'center',
        marginLeft:10
    },
    hiddenView:{
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    itemText:{
        textAlign:'center',
        fontSize:12,
        lineHeight:20,
        height:20,
        color:'rgb(196,199,201)'
    }
});
