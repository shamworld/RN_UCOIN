import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    DeviceEventEmitter
}from 'react-native';
import React, { Component } from 'react';
import TradingContent from './TradingContent';
import EntrustListView from './EntrustListView';
import MyClinchView from './MyClinchView';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
const {width,height}=Dimensions.get('window');
export default class TradingView extends Component{

    constructor(props){
        super(props);
        var coinList = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        this.state = {
            scrollList:[
                {'titile':'买入','type':'1'},
                {'titile':'卖出','type':'2'},
                {'titile':'委托','type':'3'},
            ],
            isRecHiddenList:false,
            coinList:coinList,
            navTitle:'',
            coinListData:{},
            index:0
        }
    }

    static navigationOptions = {
        header:null
    }
    componentWillMount(){
        this.requestCoinList();
    }
    //币的列表
    async requestCoinList(){
       await Request.get(Config.api.homeList+'v2/coin/tinker',false).then((data) => {
            console.log(data);
        let list=new Array();
        list=data.data;
        let title='';
        
        if(list.length>0){
           
            title=list[this.state.index].name.replace(/_/,'/');
            DeviceEventEmitter.emit('useredCoin',list[this.state.index]);
        }
         setTimeout(() => {
             this.setState({
                 coinList: this.state.coinList.cloneWithRows(list),
                 navTitle:title
             });
         },0);
        },(error) =>{
             console.log('错误信息'+error);
             this.setState({isLoading:true});
         })
    }
    //
    coinListItem(data,sectionId,rowId){
        
        return(
            <View>
                <TouchableOpacity onPress={()=>{
                    this.setState({coinListData:data,navTitle:data.name.replace(/_/,'/'),isRecHiddenList:false,index:sectionId}),
                    DeviceEventEmitter.emit('useredCoin',data);
                }}>
                    <Text style={{marginLeft:5,height:25,lineHeight:25,textAlign:'center',color:'white'}}>{data.name.replace(/_/,'/')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
    coinListRender(){
        return (
            <View style={{position:'absolute',top:64,width:120,left:width/2.0-60,height:200,backgroundColor:'rgba(0,0,0,0.7)'}}>
                
                <ListView
                dataSource={this.state.coinList}
                renderRow={(rowData,sectionId,rowId)=>this.coinListItem(rowData,sectionId,rowId)}
                enableEmptySections = {true}
                onEndReachedThreshold = {40}
                />
                
            </View>
        )
    }

    render(){

        return (
            <View style={stypes.contairn}>
                <View style={{height:64,flexDirection:'row',backgroundColor:'rgb(38,54,64)',justifyContent:'space-between',borderBottomColor:'rgb(27,38,45)',borderBottomWidth:1}}>
                    <TouchableOpacity>
                        <Image style={stypes.navLeft} source={require('../../Images/图标/市场K线按钮.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({isRecHiddenList:!this.state.isRecHiddenList})}>
                       <View style={{flexDirection:'row'}}> 
                       <Text style={stypes.navMid}>{this.state.navTitle}</Text>
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
                    onScroll={(postion) => {  
                        // float类型 [0, tab数量-1]  
                        console.log('scroll position:' + postion);
                        if(postion==0||postion==1||postion==2){
                            this.requestCoinList();
                        }
                      }
                    }
                >
                {
                    this.state.scrollList.map((item,i)=>{
                        
                        if(i==0||i==1){
                            return (
                                <TradingContent key={i} tabLabel = {item.titile} type = {item.type} coinListData = {this.state.coinListData}
                                    navigator = {this.props.navigator} {...this.props} style={{marginBottom:0}} toLogin={()=>this.props.navigation.replace('LoginView')}/>
                            )
                        }else if(i==2){
                            return (
                                <EntrustListView key={i}  tabLabel = {item.titile} type = {item.type} coinListData = {this.state.coinListData}
                                navigator = {this.props.navigator} {...this.props} style={{marginBottom:0}} toLogin={()=>this.props.navigation.replace('LoginView')}
                                    style={{marginBottom:0}}/>
                            )
                        }
                    })
                }
                </ScrollableTabView>
                {
                    this.state.isRecHiddenList?this.coinListRender():''
                }
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