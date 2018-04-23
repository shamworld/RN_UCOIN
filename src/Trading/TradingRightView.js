import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    RefreshControl,
    ActivityIndicator,
    Image,
}from 'react-native';
import React, { Component } from 'react';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
const {width,height}=Dimensions.get('window');
import Msg from '../../Compent/LoadingMsg';

export default class TradingRightView extends Component{

    constructor(props){
        super(props);
        this.state = {
            buyList:[
                {price:10.000000,num:102.000000},
                {price:144.000000,num:12.321000},
                {price:53.000000,num:123.000000},
                {price:14.000000,num:31.000000},
                {price:5342.000000,num:342.000000},
                {price:53.000000,num:123.000000},
                {price:213.020000,num:141.0200}
            ],
            sellList:[
                {price:10.000000,num:102.000000},
                {price:144.000000,num:12.321000},
                {price:53.000000,num:123.000000},
                {price:213.020000,num:141.0200},
                {price:14.000000,num:31.000000},
                {price:5342.000000,num:342.000000},
                {price:213.020000,num:141.0200}
            ],
            selectIsRec:true,
            selectText:'默认'
        }
    }
    
    sellListItem(item){
        return (
            <View style={{flexDirection:'row',justifyContent:'space-between',height:23}}>
                <Text style={stypes.sellpriceText}>{item.price}</Text>
                <Text style={stypes.sellnumText}>{item.num}</Text>
            </View>
        )
    }
    buyListItem(item){
        return (
            <View style={{flexDirection:'row',justifyContent:'space-between',height:23}}>
                <Text style={stypes.buypriceText}>{item.price}</Text>
                <Text style={stypes.buynumText}>{item.num}</Text>
            </View>
        )
    }
    defualtView(){
        return (
            <View>
                <View style={{marginLeft:5,marginRight:10,height:23*8}}>
                        {
                            this.state.sellList.map((item,i)=>this.sellListItem(item))
                        }
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:5,marginRight:10,borderStyle:'dashed',borderColor:'rgb(164,173,178)',borderWidth:1,height:30}}>
                        <Text style={stypes.sellContent}>10.001000</Text>
                        <Text style={stypes.sellContent}>￥</Text>
                        <Text style={stypes.sellContent}>10.451200</Text>
                </View>
                <View style={{marginLeft:5,marginRight:10,height:23*8}}>
                        {
                            this.state.buyList.map((item,i)=>this.buyListItem(item))
                        }
                </View>
            </View>
        )
    }


    onlyBuyView(){
        return (
            <View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:5,marginRight:10,borderStyle:'dashed',borderColor:'rgb(164,173,178)',borderWidth:1,height:30}}>
                    <Text style={stypes.sellContent}>10.001000</Text>
                    <Text style={stypes.sellContent}>￥</Text>
                    <Text style={stypes.sellContent}>10.451200</Text>
                </View>
                <View style={{marginLeft:5,marginRight:10,height:23*16}}>
                        {
                            this.state.buyList.map((item,i)=>this.buyListItem(item))
                        }
                </View>
            </View>
        )
    }

    onlySellView(){
        return (
            <View>
               
                <View style={{marginLeft:5,marginRight:10,height:23*16}}>
                        {
                            this.state.sellList.map((item,i)=>this.sellListItem(item))
                        }
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:5,marginRight:10,borderStyle:'dashed',borderColor:'rgb(164,173,178)',borderWidth:1,height:30}}>
                    <Text style={stypes.buyContent}>10.001000</Text>
                    <Text style={stypes.buyContent}>￥</Text>
                    <Text style={stypes.buyContent}>10.451200</Text>
                 </View>
            </View>
        )
    }
    
    render(){
        return(
            <View style={stypes.contain}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
                    <Text style={stypes.priceText}>价格</Text>
                    <Text style={stypes.numText}>数量</Text>
                </View>
                {
                    this.state.selectText=='默认'?this.defualtView():this.state.selectText=='只看买入'?this.onlyBuyView():this.onlySellView()
                }
                <View style={{left:width/2.0-15-100,height:100,width:80,position:'relative',top:-50}}>
 
                    <View style={{height:75,flex:2}} display={this.state.selectIsRec?'flex':'none'}>
                    </View>
                    <View style={{height:75,backgroundColor:'rgb(45,58,65)',flex:2}} display={!this.state.selectIsRec?'flex':'none'}>
                        <TouchableOpacity activeOpacity={1} onPress = {()=>{this.setState({selectIsRec:'none',selectText:'默认'})}}>
                            <Text style={stypes.selectText}>默认</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress = {()=>{this.setState({selectIsRec:'none',selectText:'只看买入'})}}>
                            <Text style={stypes.selectText}>只看买入</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress = {()=>{this.setState({selectIsRec:'none',selectText:'只看卖出'})}}>
                            <Text style={stypes.selectText}>只看卖出</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress = {()=>{this.setState({selectIsRec:false})}}>
                        <View style={{flexDirection:'row',backgroundColor:'rgb(45,58,65)',justifyContent:'center',marginBottom:0,height:25}}>
                            
                            <Text style={stypes.selectText}>{this.state.selectText}</Text>
                            <Image source={require('../../Images/图标/下拉.png')} resizeMode='cover' style={{width:10,height:10,marginTop:7.5}}/>
                            
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const stypes=StyleSheet.create({
    contain:{
        width:width/2.0,
        backgroundColor:'rgb(27,38,45)',
    },
    priceText:{
        color:'rgb(164,173,178)',
        fontSize:12,
        marginLeft:10,
        height:20,
        lineHeight:20,
    },
    numText:{
        color:'rgb(164,173,178)',
        fontSize:12,
        marginRight:10,
        height:20,
        lineHeight:20,
    },
    sellpriceText:{
        color:'red',
        fontSize:12,
        height:23,
        lineHeight:23,
    },
    sellnumText:{
        color:'red',
        fontSize:12,
        height:23,
        lineHeight:23,
    },
    buypriceText:{
        color:'green',
        fontSize:12,
        height:23,
        lineHeight:23,
    },
    buynumText:{
        color:'green',
        fontSize:12,
        height:23,
        lineHeight:23,
    },
    sellContent:{
        color:'red',
        fontSize:12,
        height:30,
        lineHeight:30,
    },
    selectText:{
        textAlign:'center',
        height:25,
        lineHeight:25,
        fontSize:12,
        color:'rgb(196,199,201)'
    },
    buyContent:{
        color:'green',
        fontSize:12,
        height:30,
        lineHeight:30,
    },
})