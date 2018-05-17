import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    RefreshControl,
    ActivityIndicator,
    InteractionManager
}from 'react-native';
import React, { Component } from 'react';
import ClinchItem from './ClinchItem'
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
import Load from '../../Compent/loading';
import LoadMore from '../../Compent/LoadMoreFooter';


const {width,height}=Dimensions.get('window');
export default class MyClinchView extends Component{
    constructor(props){
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        // dataSource.cloneWithRows([
        //     {coin_name:'BTC',type:0,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
        //     {coin_name:'BTC',type:0,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
        //     {coin_name:'UT',type:1,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
        //     {coin_name:'BTC',type:0,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
        //     {coin_name:'UT',type:1,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
        //     {coin_name:'UT',type:1,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
        //     {coin_name:'BTC',type:0,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000},
        //     {coin_name:'BTC',type:0,price:10.0000000,created_at:'2018-04-20 15:03:19',number:4124.000000,fee:0.1000000}
        // ]),
        this.state={
            dataSource:dataSource,
            isRefreshing:false,
            isLoading:false,
            loadText:'',
            type:0,
            page:1,
            totalPage:1,
        }
    }

    static navigationOptions = {
        title:'我的成交'
    }

    componentWillMount(){
        this.onRefresh();
    }
    onRefresh(){
        this.setState({
            isRefreshing:false,
            isLoading:true,
        });
        this.requestClinchList();
    }

    requestClinchList(){
        Request.get(Config.api.homeList+'v2/entrust/trade?page='+this.state.page,true).then((data) => {
            console.log(data);

            if(data.code==0){
 
                let arr=new Array();
                arr=data.data.data;
                 if(arr.length>0){
                    setTimeout(() => {
                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(data.data.data),
                            isRefreshing:false,
                            isLoading:true,
                            totalPage:data.data.last_page,
                            page:1
                        });
                    },0);
                 }else{
                    this.setState({
                        isRefreshing:false,
                        isLoading:true,
                        totalPage:data.data.last_page,
                        page:1
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
             this.setState({isLoading:true});
         })
    }
    _toEnd(){
        
        
        if(!this.state.isLoading){
            return ;
        }
        // this.setState({page:this.state.page+1})
        
        if(this.state.page>=this.state.totalPage){
            // this.setState({page:this.state.page-1})
            
            return;
        }
        InteractionManager.runAfterInteractions(() => {
            console.log("触发加载更多 toEnd() --> ");
            this._loadMoreData();
        });
    }
    _loadMoreData() {
        this.setState({page:this.state.page+1})
        Request.get(Config.api.homeList+'v2/entrust/trade?page='+this.state.page,true).then((data) => {
            console.log(data);

            if(data.code==0){
 
                let arr=new Array();
                arr=data.data.data;
                 if(arr.length>0){
                    setTimeout(() => {
                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(data.data.data),
                            
                        });
                    },0);
                 }
                 
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
    _renderFooter() {
        console.log('!!!!'+this.state.totalPage+' '+this.state.page);
        if(!this.state.isLoading){
            return ;
        }
        if(this.state.page<this.state.totalPage){
            //还有更多，默认显示‘正在加载更多...’
            
            return <LoadMore />
        }else{
             // 加载全部
             return <LoadMore isLoadAll={true}/>
        }
    }
    rendRowItem(data){
        return (
            <ClinchItem data={data} onclick={()=>this.requestDeletClinch(data)}>
            </ClinchItem>
        )
    }

    requestDeletClinch(data){

    }

    render(){

        return (
            <View style={stypes.contain}>
            {
                this.state.isLoading ?
                <ListView 
                dataSource = {this.state.dataSource}
                renderRow = {this.rendRowItem.bind(this)}
                enableEmptySections = {true}
                onEndReachedThreshold = {40}
                onEndReached={this._toEnd.bind(this)}
                renderFooter={this._renderFooter.bind(this)}
                refreshControl = {
                    <RefreshControl 
                        refreshing = {this.state.isRefreshing}
                        onRefresh = {this.onRefresh.bind(this)}
                        />
                }
            >
            </ListView>
            :
            <ActivityIndicator 
                    style = {stypes.loadDataStyle}
                />
            }
            <Load 
                ref = {(Load) => this.Load = Load}
                title = {this.state.loadText}
                type = {this.state.type}
                />
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
