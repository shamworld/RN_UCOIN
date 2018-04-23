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
import BouncedView from '../../Compent/BouncedView';

export default class EntrustListView extends Component{


    constructor(props){
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        this.state={
            dataSource:dataSource.cloneWithRows([
                {price:10.000000,num:102.000000},
                {price:144.000000,num:12.321000},
                {price:53.000000,num:123.000000},
                {price:14.000000,num:31.000000},
                {price:5342.000000,num:342.000000},
                {price:53.000000,num:123.000000},
                {price:213.020000,num:141.0200},
                {price:10.000000,num:102.000000},
                {price:144.000000,num:12.321000},
                {price:53.000000,num:123.000000},
                {price:213.020000,num:141.0200},
                {price:14.000000,num:31.000000},
                {price:5342.000000,num:342.000000},
                {price:213.020000,num:141.0200}
            ]),
            bouncedView:''
            
        }
    }
    listItem(item){
        return (
            <View style={{flexDirection:'row',justifyContent:'space-between',height:50}}>
                <Text style={stypes.priceText}>{item.price.toFixed(6)}</Text>
                <Text style={stypes.numText}>{item.num.toFixed(6)}</Text>
                <View style={{backgroundColor:'#c4c7c9',borderRadius:5.0,marginTop:10, marginRight:20,height:30,width:width/3.0-40,marginLeft:20}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{
                        this.setState({bouncedView:"确定撤单"},() => {
                            this.BouncedView.show();
                        });
                    }}>
                        <Text style={stypes.entrustText}>撤单</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }

    render(){
        return(
            <View style={stypes.contain}>
                <ListView
                dataSource={this.state.dataSource}
                enableEmptySections = {true}
                 onEndReachedThreshold = {40}
                 renderRow = {this.listItem.bind(this)}
                >
                </ListView>
                <BouncedView ref = {(BouncedView) => this.BouncedView = BouncedView } suerClick={()=>{console.log('点击了确定')}} title = {this.state.bouncedView}/>
            </View>
        )
    }
}



const stypes=StyleSheet.create({
    contain:{
        backgroundColor:'rgb(27,38,45)',
    },
    priceText:{
        color:'red',
        fontSize:12,
        height:20,
        marginTop:15,
        lineHeight:20,
        textAlign:'center',
        width:width/3.0
    },
    numText:{
        color:'white',
        fontSize:12,
        height:20,
        marginTop:15,
        lineHeight:20,
        textAlign:'center',
        width:width/3.0
    },
    entrustText:{
        color:'white',
        fontSize:12,
        height:30,
        lineHeight:30,
        textAlign:'center',
    },
});