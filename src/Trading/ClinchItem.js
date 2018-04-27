import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,

}from 'react-native';
import React, { Component } from 'react';

const {width,height}=Dimensions.get('window');
export default class ClinchItem extends Component{

    constructor(props){
        super(props);
        console.log(this.props.data);
    }
    render(){
        const {coin_name,type,price,created_at,number,fee}=this.props.data;
        return(
            <View style={stypes.contain}> 
                <View style={{height:179}}>
                    <View style={stypes.viewFlexDriction}>
                        <View style={stypes.viewFlexDriction}>
                            <Text style={[stypes.text,{marginLeft:20,marginTop:20}]}>{coin_name}</Text>
                            <Text style={type==0?[stypes.text,{color:'green',marginTop:20,marginLeft:20}]:[stypes.text,{color:'red',marginTop:20,marginLeft:20}]}>{type==0?'买':'卖'}</Text>
                        </View>
                        <Text style={[stypes.text,{marginRight:20,marginTop:20}]}>{created_at}</Text>
                    </View>
                    <View style={stypes.viewFlexDriction}>
                        <Text style={[stypes.text,{marginTop:20,width:width/2.0-20}]}>{price.toFixed(6)}</Text>
                        <Text style={[stypes.text,{marginTop:20,width:width/2.0-20}]}>{number.toFixed(6)}</Text>
                    </View>
                    <View style={stypes.viewFlexDriction}>
                        <Text style={[stypes.text,{marginTop:10,width:width/2.0-20}]}>价格</Text>
                        <Text style={[stypes.text,{marginTop:10,width:width/2.0-20}]}>数量</Text>
                    </View>
                    <View style={stypes.viewFlexDriction}>
                        <Text style={[stypes.text,{marginLeft:20,marginTop:10}]}>手续费</Text>
                        <Text style={[stypes.text,{marginTop:10,marginRight:20}]}>{fee.toFixed(6)}</Text>
                    </View>
                    <View style={stypes.viewFlexDriction}>
                        <Text style={[stypes.text,{marginLeft:20,marginTop:10}]}>成交金额</Text>
                        <Text style={[stypes.text,{marginTop:10,marginRight:20}]}>{(price*number).toFixed(6)}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'white',marginLeft:5,marginRight:5,marginBottom:0,height:1}}></View>
            </View>
            
        )
    }

}



const stypes=StyleSheet.create({
    contain:{
        height:180,
        backgroundColor:'rgb(56,73,82)',
        marginLeft:10,
        marginRight:10,
        borderRadius:10,
    },
    viewFlexDriction:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    text:{
        textAlign:'center',
        fontSize:12,
        lineHeight:20,
        height:20,
        color:'white'
    }
});



