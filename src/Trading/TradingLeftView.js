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
}from 'react-native';
import React, { Component } from 'react';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
const {width,height}=Dimensions.get('window');
import Msg from '../../Compent/LoadingMsg';

export default class TradingLeftView extends Component{
    constructor(props){
        super(props);
        this.state = {
            buyPrice:'',
            numbers:'',
            totalAmount:'',
            slider_x:0,
            sliderValue:0,
        }
    }
    render(){
        return(
            <View style={stypes.contain}>
                <Text style={stypes.canUserText}>可用UT:15204123.1015000</Text>
                <TextInput 
                placeholder='买价'
                placeholderTextColor='rgb(164,173,178)'
                style={stypes.priceText}
                value = {this.state.buyPrice}
                onChangeText = {(text) => this.setState({buyPrice:text})}
                />
                <Text style = {stypes.valuationText}>估值：￥458120.000000</Text>
                <TextInput 
                placeholder='数量'
                placeholderTextColor='rgb(164,173,178)'
                style={stypes.priceText}
                value = {this.state.numbers}
                onChangeText = {(text) => this.setState({numbers:text})}
                />
                <ImageBackground 
                source={require('../../Images/图标/percentage-green.png')}
                style={{marginLeft:this.state.slider_x,marginTop:3,width:35,height:25}}
                resizeMode='cover'
                >
                <Text style={{height:25,lineHeight:25,textAlign:'center',fontSize:9,color:'white'}}>{parseFloat(this.state.sliderValue/1000*100).toFixed(1)}%</Text>
                </ImageBackground>
                <Slider style={{marginLeft:17.5,marginRight:17.5,marginTop:1}} onValueChange={(value)=>{this.setState({sliderValue:value,slider_x:value/1000*(width/2.0-35)})}} maximumTrackTintColor='black' step={0} minimumValue={0} maximumValue={1000} thumbImage = {require('../../Images/图标/greencircle.png')}/>
                <TextInput 
                placeholder='总额(BTC)'
                placeholderTextColor='rgb(164,173,178)'
                style={stypes.priceText}
                value = {this.state.totalAmount}
                autoFocus={false}
                onChangeText = {(text) => this.setState({totalAmount:text})}
                />
                <TouchableOpacity>
                    <Text style={stypes.buyBtn}>买入</Text>
                </TouchableOpacity>
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
        marginTop:20,
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

})