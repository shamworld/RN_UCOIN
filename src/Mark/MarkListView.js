import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    RefreshControl,
    ActivityIndicator
}from 'react-native';
import React, { Component } from 'react';
import MarkHeadView from './MarkHeadView';
import MarkItem from './MarkItem';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
const {width,height}=Dimensions.get('window');
import Msg from '../../Compent/LoadingMsg';

export default class MarkListView extends Component{

    constructor(props){
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        this.state = {
            dataSource:dataSource,
            isRefreshing:false,
            isLoading:false,
            isLoadingMore:false,
            sorting:'number_order=1',
            type:'1'
        }
        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }
    componentWillMount(){
        
        this.requestMarkList();
    }
    // 下拉刷新
    onRefresh(){
        this.setState({
            isRefreshing:false,
            isLoading:false,
            type:this.props.type
        });
        this.requestMarkList();
    }

    requestMarkList(){
       Request.get(Config.api.homeList+'v2/market/list?'+this.state.sorting,(data) => {
           console.log(this.state.type);
        let items=this.state.type==='1'?data.data.btc:data.data.ut;
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                isRefreshing:false,
                isLoading:true,
            });
        },0);
       },(error) =>{
            console.log('错误信息'+error);
            this.setState({isLoading:true});
        })
    }
    renderRow(rowData){
        return (
            <MarkItem
                itemData={rowData} 
            />
        )
    }
    render(){
        this.props.type===this.state.type?null:this.onRefresh();
        return (
            <View style = {stypes.contains}>
                <MarkHeadView haedClick = {(type) => {
                    switch(type){
                        case 0:
                            this.setState({sorting:'number_order=1'},()=>this.onRefresh())
                             break;
                        case 1:
                            this.setState({sorting:'number_order=0'},()=>this.onRefresh())
                             break;
                        case 2:
                             this.setState({sorting:'price_order=1'},()=>this.onRefresh())
                             break;
                        case 3:
                            this.setState({sorting:'price_order=0'},()=>this.onRefresh())
                             break;
                        case 4:
                            this.setState({sorting:'rate_order=1'},()=>this.onRefresh())
                             break;
                        case 5:
                            this.setState({sorting:'rate_order=0'},()=>this.onRefresh())
                            break;
                        default:
                             break;
                    }
                }}/>
                {
                    this.state.isLoading ?
                    <ListView 
                    dataSource = {this.state.dataSource}
                    renderRow = {this.renderRow}
                    enableEmptySections = {true}
                    onEndReachedThreshold = {40}
                    refreshControl = {
                        <RefreshControl 
                            refreshing = {this.state.isRefreshing}
                            onRefresh = {this.onRefresh}
                            />
                    }
                >
                </ListView>
                :
                <ActivityIndicator 
                        style = {stypes.loadDataStyle}
                    />
                }
            </View>
        );
    }

}

const stypes = StyleSheet.create({
    contains:{
        backgroundColor:'rgb(27,38,45)',
        flex:1
    },
    loadDataStyle:{
        marginVertical:20
    },
});