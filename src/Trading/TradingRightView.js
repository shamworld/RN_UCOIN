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
    DeviceEventEmitter,
}from 'react-native';
import React, { Component } from 'react';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
const {width,height}=Dimensions.get('window');
import Load from '../../Compent/loading';

export default class TradingRightView extends Component{

    constructor(props){
        super(props);
        this.state = {
            buyList:[],
            sellList:[],
            selectIsRec:true,
            selectText:'默认',
            coinInfoData:{},
            loadText:'',
            type:0,
            finishPrice:'',
            finishNum:''
        }
    }
    componentDidMount(){
        this.msgListener = DeviceEventEmitter.addListener('useredCoin',(data) => {
            this.requestPriceAndNumList(data),
            this.requestFinishPrice(data)
        });
    }
    async requestFinishPrice(data){
        this.setState({coinInfoData:data});
        await Request.get(Config.api.homeList+'v2/trade/newPrice/'+data.id,true).then((data) => {
           
            if(data.code==0){


                setTimeout(() => {
                    this.setState({
                        finishPrice:data.data.rmb_price,
                        finishNum:data.data.new_price,
                    });
                },0);
                
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
    async requestPriceAndNumList(data){
        this.setState({coinInfoData:data});
        await Request.get(Config.api.homeList+'v2/trade/'+data.id+'decimal=6&limit=16&buyOrder=desc&sellOrder=desc',true).then((data) => {
           
            if(data.code==0){


                setTimeout(() => {
                    this.setState({
                        buyList:data.data.buys,
                        sellList:data.data.sells,
                    });
                },0);
                
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

    sellListItem(item,i,type){
        if(type==0&&i>=8){
            return;
        }else if(type==1&&i>=16){
            return;
        }
        return (
            <View style={{flexDirection:'row',justifyContent:'space-between',height:23}} key={i}>
                <Text style={stypes.sellpriceText}>{parseFloat(item.price).toFixed(6)}</Text>
                <Text style={stypes.sellnumText}>{parseFloat(item.number).toFixed(6)}</Text>
            </View>
        )
    }
    buyListItem(item,i,type){
        if(type==0&&i>=8){
            return;
        }else if(type==1&&i>=16){
            return;
        }
        return (
            <View style={{flexDirection:'row',justifyContent:'space-between',height:23}} key={i}>
                <Text style={stypes.buypriceText}>{parseFloat(item.price).toFixed(6)}</Text>
                <Text style={stypes.buynumText}>{parseFloat(item.number).toFixed(6)}</Text>
            </View>
        )
    }
    defualtView(){
        return (
            <View>
                <View style={{marginLeft:5,marginRight:10,height:23*8}}>
                        {
                            
                            this.state.sellList.map((item,i)=>this.sellListItem(item,i,0))
                        }
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:5,marginRight:10,borderStyle:'dashed',borderColor:'rgb(164,173,178)',borderWidth:1,height:30}}>
                        <Text style={stypes.sellContent}>{parseFloat(this.state.finishPrice).toFixed(4)}</Text>
                        <Text style={stypes.sellContent}>￥</Text>
                        <Text style={stypes.sellContent}>{parseFloat(this.state.finishNum).toFixed(4)}</Text>
                </View>
                <View style={{marginLeft:5,marginRight:10,height:23*8}}>
                        {
                            this.state.buyList.map((item,i)=>this.buyListItem(item,i,0))
                        }
                </View>
            </View>
        )
    }


    onlyBuyView(){
        return (
            <View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:5,marginRight:10,borderStyle:'dashed',borderColor:'rgb(164,173,178)',borderWidth:1,height:30}}>
                    <Text style={stypes.sellContent}>{parseFloat(this.state.finishPrice).toFixed(4)}</Text>
                    <Text style={stypes.sellContent}>￥</Text>
                    <Text style={stypes.sellContent}>{parseFloat(this.state.finishNum).toFixed(4)}</Text>
                </View>
                <View style={{marginLeft:5,marginRight:10,height:23*16}}>
                        {
                            this.state.buyList.map((item,i)=>this.buyListItem(item,i,1))
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
                            this.state.sellList.map((item,i)=>this.sellListItem(item,i,1))
                        }
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:5,marginRight:10,borderStyle:'dashed',borderColor:'rgb(164,173,178)',borderWidth:1,height:30}}>
                    <Text style={stypes.buyContent}>{parseFloat(this.state.finishPrice).toFixed(4)}</Text>
                    <Text style={stypes.buyContent}>￥</Text>
                    <Text style={stypes.buyContent}>{parseFloat(this.state.finishNum).toFixed(4)}</Text>
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
                <Load 
                ref = {(Load) => this.Load = Load}
                title = {this.state.loadText}
                type = {this.state.type}
                />
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