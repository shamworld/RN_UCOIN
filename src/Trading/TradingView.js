import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
}from 'react-native';
import React, { Component } from 'react';
import TradingContent from './TradingContent';
import EntrustListView from './EntrustListView';
import MyClinchView from './MyClinchView';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
const {width,height}=Dimensions.get('window');
export default class TradingView extends Component{

    constructor(props){
        super(props);
        this.state = {
            scrollList:[
                {'titile':'买入','type':'1'},
                {'titile':'卖出','type':'2'},
                {'titile':'委托','type':'3'},
            ]
        }
    }

    static navigationOptions = {
        header:null
    }

    render(){

        return (
            <View style={stypes.contairn}>
                <View style={{height:64,flexDirection:'row',backgroundColor:'rgb(38,54,64)',justifyContent:'space-between',borderBottomColor:'rgb(27,38,45)',borderBottomWidth:1}}>
                    <TouchableOpacity>
                        <Image style={stypes.navLeft} source={require('../../Images/图标/市场K线按钮.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                       <View style={{flexDirection:'row'}}> 
                       <Text style={stypes.navMid}>BTC/UT</Text>
                       <Image source={require('../../Images/图标/下拉.png')} style={{marginTop:37,width:10,height:10}}/>
                       </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {this.props.navigation.navigate('MyClinchView')}}>
                        <Text style={stypes.navRight}>我的交易</Text>
                    </TouchableOpacity>
                </View>
                <ScrollableTabView
                     renderTabBar = {()=><DefaultTabBar/>}
                    tabBarActiveTextColor = 'rgb(255,182,0)'
                    tabBarInactiveTextColor = 'white'
                    tabBarUnderlineStyle={{backgroundColor:'rgb(255,182,0)'}}
                    tabBarBackgroundColor = 'rgb(38,54,64)'
                    style = {{height:10}}
                >
                {
                    this.state.scrollList.map((item,i)=>{
                        if(i==0||i==1){
                            return (
                                <TradingContent tabLabel = {item.titile} type = {item.type}
                                    navigator = {this.props.navigator} {...this.props} style={{marginBottom:0}}/>
                            )
                        }else if(i==2){
                            return (
                                <EntrustListView tabLabel = {item.titile} type = {item.type}
                                    style={{marginBottom:0}}/>
                            )
                        }
                    })
                }
                </ScrollableTabView>

            </View>
        );
    }

}

const stypes=StyleSheet.create({
    contairn:{
        flex:1,
        height:height,
        backgroundColor:'rgb(27,38,45)',
    },
    navLeft:{
        marginLeft:10,
        width:25,
        height:25,
        marginTop:29.5
    },
    navMid:{
        marginTop:29.5,
        lineHeight:25,
        marginLeft:20,
        height:25,
        color:'rgb(196,199,201)'
    },
    navRight:{
        marginRight:10,
        marginTop:29.5,
        lineHeight:25,
        height:25,
        color:'rgb(196,199,201)'
    }
});