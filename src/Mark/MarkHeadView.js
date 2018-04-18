import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image

}from 'react-native';
import React, { Component } from 'react';

const {width,height}=Dimensions.get('window');
export default class MarkHeadView extends Component{

    constructor(props){
        super(props);
        this.state = {
            type:0,
        }
    }
    touchClick(type){
        this.setState({type:type},()=>{this.props.haedClick(type)});
    }

    render(){

        return (
            <View style = {stypes.contains}>
                <TouchableOpacity onPress={()=>this.touchClick(this.state.type===0?1:0)}>
                    <Image style = {stypes.imageBtn} source = {this.state.type===0?require('../../Images/图标/成交量从高到底.png'):this.state.type===1?require('../../Images/图标/成交量从低到高.png'):require('../../Images/图标/成交量未筛选.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.touchClick(this.state.type===2?3:2)}>
                     <Image style = {stypes.imageBtn} source = {this.state.type===2?require('../../Images/图标/最新价从高到低.png'):this.state.type===3?require('../../Images/图标/最新价从低到高.png'):require('../../Images/图标/最新价未筛选.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.touchClick(this.state.type===4?5:4)}>
                     <Image style = {stypes.imageBtn} source = {this.state.type===4?require('../../Images/图标/24h涨跌幅从高到底.png'):this.state.type===5?require('../../Images/图标/24h涨跌幅从低到高.png'):require('../../Images/图标/24h涨跌幅未筛选.png')}/>
                </TouchableOpacity>
            </View>
        );
    }

}

const stypes = StyleSheet.create({
    contains:{
        backgroundColor:'rgb(38,54,64)',

        flexDirection:'row',
        height:30,
    },
    imageBtn:{
        width:width/3.0,
        height:30
    }
    
});