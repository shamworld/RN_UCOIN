import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,

}from 'react-native';
import React, { Component } from 'react';
import ClinchItem from './ClinchItem'
 


const {width,height}=Dimensions.get('window');
export default class MyClinchView extends Component{
    constructor(props){
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        this.state={
            dataSource:dataSource.cloneWithRows([
                {coin_name:'BTC',type:0,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
                {coin_name:'BTC',type:0,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
                {coin_name:'UT',type:1,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
                {coin_name:'BTC',type:0,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
                {coin_name:'UT',type:1,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
                {coin_name:'UT',type:1,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
                {coin_name:'BTC',type:0,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
                {coin_name:'BTC',type:0,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000}
            ]),
        }
    }

    static navigationOptions = {
        title:'我的成交'
    }



    rendRowItem(data){
        return (
            <ClinchItem data={data}>
            </ClinchItem>
        )
    }


    render(){

        return (
            <View style={stypes.contain}>
                <ListView
                dataSource={this.state.dataSource}
                renderRow = {this.rendRowItem.bind(this)}
                enableEmptySections={true}
                onEndReachedThreshold={40}
                >
                </ListView>
            </View>
        );
    }

}


const stypes=StyleSheet.create({
    contain:{
        flex:1,
        height:height,
        backgroundColor:'rgb(27,38,45)',
    }
});
