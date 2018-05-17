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
    DeviceEventEmitter
}from 'react-native';
import React, { Component } from 'react';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
const {width,height}=Dimensions.get('window');
import Load from '../../Compent/loading';
import BouncedView from '../../Compent/BouncedView';

export default class EntrustListView extends Component{


    constructor(props){
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        this.state={
            dataSource:dataSource,
            bouncedView:'',
            isRefreshing:false,
            isLoading:false,
            coinInfoData:{},
            loadText:'',
            type:0,
            removeEntrustData:{}
        }
    }
    listItem(item){
        
        return (
            <View style={{flexDirection:'row',justifyContent:'space-between',height:50}}>
                <Text style={[stypes.priceText,parseInt(item.type)==0?{color:'rgb(85,255,0)'}:{color:'red'}]}>{parseFloat(item.price).toFixed(6)}</Text>
                <Text style={stypes.numText}>{parseFloat(item.number).toFixed(6)}</Text>
                <View style={{backgroundColor:'#c4c7c9',borderRadius:5.0,marginTop:10, marginRight:20,height:30,width:width/3.0-40,marginLeft:20}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{
                        this.setState({bouncedView:"确定撤单",removeEntrustData:item},() => {
                            this.BouncedView.show();
                        });
                    }}>
                        <Text style={stypes.entrustText}>撤单</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
    componentDidMount(){
        this.msgListener = DeviceEventEmitter.addListener('useredCoin',(data) => {
            this.setState({coinInfoData:data})
            this.onRefresh();
        });
    }
    
    onRefresh(){
        this.setState({
            isRefreshing:false,
            isLoading:false,
        },()=>{
            this.requestEntrustList();
        });
        
    }
    requestEntrustList(){
        Request.get(Config.api.homeList+'v2/entrust?market_id='+this.state.coinInfoData.id,true).then((data) => {
            
             if(data.code==0){
 
                let arr=new Array();
                arr=data.data.data;
                 if(arr.length>0){
                    setTimeout(() => {
                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(data.data.data),
                            isRefreshing:false,
                            isLoading:true,
                        });
                    },0);
                 }else{
                    this.setState({
                        isRefreshing:false,
                        isLoading:true,
                    });
                 }
                 
             }else if (data.code==9001){
                 this.setState({loadText:data.msg,type:3,isRefreshing:false,
                    isLoading:true,},()=>{
                     this.Load.show();
                     
                 });
                 // this.props.toLogin();
             }else{
                 this.setState({loadText:data.msg,type:3,isRefreshing:false,
                    isLoading:true,},()=>{
                     this.Load.show();
                 });
                
             }
         
         },(error) =>{
              console.log('错误信息'+error);
              this.setState({isRefreshing:false,
                isLoading:true,});
          })
    }

    requestRmoveEntrustData(){
        this.setState({loadingText:'正在加载...',type:2},() => {
            this.Load.show();
        });
        let params={type:this.state.removeEntrustData.type,order_id:this.state.removeEntrustData.id};
        Request.post(Config.api.homeList+'v2/remove'+this.state.coinInfoData.id,params,true).then((data) => {
            
            this.setState({loadText:data.msg,type:3},()=>{
                this.Load.show();
                
            });
        
        },(error) =>{
             console.log('错误信息'+error);
             this.Load.hide();
         })
    }

    render(){
        return(
            <View style={stypes.contain}>
                {
                    this.state.isLoading?
                    <ListView
                    dataSource={this.state.dataSource}
                    enableEmptySections = {true}
                    onEndReachedThreshold = {40}
                    renderRow = {this.listItem.bind(this)}
                    refreshControl = {
                        <RefreshControl 
                            refreshing = {this.state.isRefreshing}
                            onRefresh = {this.onRefresh.bind(this)}
                            />
                    }
                    >
                    </ListView>
                    :
                    <ActivityIndicator style = {stypes.loadDataStyle}/>
                }
                <BouncedView ref = {(BouncedView) => this.BouncedView = BouncedView } suerClick={()=>this.requestRmoveEntrustData()} title = {this.state.bouncedView}/>
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
    loadDataStyle:{
        marginVertical:20
    },
});