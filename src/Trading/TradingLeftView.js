import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    RefreshControl,
    ActivityIndicator,
    TextInput,
    Slider,
    ImageBackground,
    DeviceEventEmitter
}from 'react-native';
import React, { Component } from 'react';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
const {width,height}=Dimensions.get('window');
import Load from '../../Compent/loading';



export default class TradingLeftView extends Component{
    constructor(props){
        super(props);
        this.state = {
            buyPrice:'',
            numbers:'',
            totalAmount:'',
            slider_x:0,
            sliderValue:0,
            useredText:'可用:0.000000',
            sliderMax:0,
            loadText:'',
            type:0,
            vomlueText:0.000000,
            coinInfoData:{},
            useredCoinNumber:0.000000,
            
        }
        
    }
    componentDidMount(){
        this.msgListener = DeviceEventEmitter.addListener('useredCoin',(data) => this.requestCoinNumber(data));
    }
    componentWillUnmount(){
        //此生命周期内，去掉监听
        this.msgListener&&this.msgListener.remove();
    }
    async requestCoinNumber(coinListData){
        this.setState({coinInfoData:coinListData});
        let url=this.props.type==1?coinListData.pay_id:coinListData.coin_id;
        await Request.get(Config.api.homeList+'v2/asset?coin_id='+url,true).then((data) => {
            if(data.code==0){
                let arr=new Array();
                arr=coinListData.name.split('_');

                setTimeout(() => {
                    this.setState({
                        useredText:this.props.type==1?`可用${arr[1]}:${parseFloat(data.data.available).toFixed(6)}`:`可用${arr[0]}:${parseFloat(data.data.available).toFixed(6)}`,
                        sliderMax:parseFloat(data.data.available).toFixed(6)>0?1:0,
                        vomlueText:parseFloat(data.data.worth).toFixed(6),
                        useredCoinNumber:parseFloat(data.data.available).toFixed(6),
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
    requestBuyOrSell(){
        if(this.state.buyPrice==''){
            this.setState({loadText:'请输入价格',type:3},()=>{
                this.Load.show();
            });
            return;
        }
        
        let params=this.props.type==1?{price:this.state.buyPrice,number:this.state.numbers,type:0}:{price:this.state.buyPrice,number:this.state.numbers,type:1};
        Request.post(Config.api.homeList+'v2/trade/'+this.state.coinInfoData.id,params,true).then((data) => {
            if(data.code==0){
                this.requestCoinNumber(this.state.coinInfoData);
            }else if (data.code==9001){
                this.setState({loadText:data.msg,type:3},()=>{
                    this.Load.show();
                    
                });
                
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
            <View style={stypes.contain}>
                <Text style={stypes.canUserText}>
                {
                    this.state.useredText
                } 
                </Text>
                <TextInput 
                placeholder='买价'
                placeholderTextColor='rgb(164,173,178)'
                style={stypes.priceText}
                value = {this.state.buyPrice}
                onChangeText = {(text) => this.setState({buyPrice:text})}
                />
                <Text style = {stypes.valuationText}>{`估值:￥${this.state.vomlueText}`}</Text>
                <TextInput 
                placeholder='数量'
                placeholderTextColor='rgb(164,173,178)'
                style={stypes.priceText}
                value = {this.state.numbers}
                onChangeText = {(text) => this.setState({numbers:text})}
                onEndEditing = {()=>{
                    if(this.state.useredCoinNumber<parseFloat(this.state.numbers)){
                        this.setState({numbers:this.state.useredCoinNumber});
                        
                    }
                    
                }}
                />
                <ImageBackground 
                source={this.props.type==1?require('../../Images/图标/percentage-green.png'):require('../../Images/图标/percentage-red.png')}
                style={{marginLeft:this.state.slider_x,marginTop:3,width:35,height:25}}
                resizeMode='cover'
                >
                <Text style={{height:25,lineHeight:25,textAlign:'center',fontSize:9,color:'white'}}>{parseFloat(this.state.sliderValue/1000*100).toFixed(1)}%</Text>
                </ImageBackground>
                <Slider style={{marginLeft:17.5,marginRight:17.5,marginTop:1}} onValueChange={(value)=>{console.log(value+'value'), this.setState({sliderValue:value,numbers:this.state.useredCoinNumber*value,slider_x:value/1000*(width/2.0-35)})}} maximumTrackTintColor='black' step={0} minimumValue={0} maximumValue={this.state.sliderMax} thumbImage = {require('../../Images/图标/greencircle.png')}/>
                <TextInput 
                placeholder='总额(BTC)'
                placeholderTextColor='rgb(164,173,178)'
                style={stypes.priceText}
                value = {parseFloat(this.state.buyPrice*this.state.numbers).toFixed(6)}
                editable={false}
                onChangeText = {(text) => this.setState({totalAmount:text})}
                />
                <TouchableOpacity onPress={()=>this.requestBuyOrSell()}>
                    <Text style={this.props.type==1?stypes.buyBtn:stypes.sellBtn}>{this.props.type==1?'买入':'卖出'}</Text>
                </TouchableOpacity>
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
    canUserText:{
        color:'white',
        marginLeft:10,
        marginTop:20,
        height:20,
        lineHeight:20,
        marginRight:0,
        fontSize:14
    },
    priceText:{
        color:'white',
        marginTop:10,
        backgroundColor:'rgb(38,54,64)',
        fontSize:12,
        borderWidth:1,
        borderColor:'rgb(56,73,82)',
        marginLeft:10,
        height:30,
    },
    valuationText:{
        color:'rgb(164,173,178)',
        marginLeft:10,
        marginTop:20,
        height:20,
        lineHeight:20,
        marginRight:0,
        fontSize:14
    },
    buyBtn:{
        color:'white',
        marginTop:20,
        backgroundColor:'rgb(62,107,0)',
        fontSize:12,
        borderWidth:1,
        marginLeft:10,
        height:30,
        textAlign:'center',
        lineHeight:30
    },
    sellBtn:{
        color:'white',
        marginTop:20,
        backgroundColor:'red',
        fontSize:12,
        borderWidth:1,
        marginLeft:10,
        height:30,
        textAlign:'center',
        lineHeight:30
    }

})