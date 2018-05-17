import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    Switch,
    Alert,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    InteractionManager

}from 'react-native';
import React, { Component } from 'react';
import RecordItem from './RecordItem';
import Load from '../../Compent/loading';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
import LoadMore from '../../Compent/LoadMoreFooter';

const {width,height}=Dimensions.get('window');

var newList=[],page=1,totalPage=2;

export default class RecordView extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectBtn:true,
            dataSource:[],
            loadText:'',
            type:0,
            isRefreshing:false,
            openfooter:false,//初次加载是否显示faltlist的尾部
        }
    }
    static navigationOptions = ({navigation})=>({
        title:'记录',

    })

    listContent(isRec){
        if(isRec){
            this.setState({
                selectBtn:true,
            });
        }else{
            this.setState({
                selectBtn:false,
            });
        }
        this.onRefresh();
    }
    componentWillMount(){
        this.onRefresh();
    }
    onRefresh(){
        console.log('下拉');
        page=1;
        newList=[];
        this.setState({
            isRefreshing:true,
        });
        this.requesteRecordList();
    }

    requesteRecordList(){
        let url=this.state.selectBtn?'v2/import?page=':'v2/export?page=';
        Request.get(Config.api.homeList+url+page,true).then((data) => {
            console.log(data);
            
            if(data.code==0){
                totalPage=data.data.last_page;

                data.data.data.forEach(function(item,index){
                    newList.push(item);
                  });
                setTimeout(() => {
                    this.setState({
                        isRefreshing:false,
                        dataSource:newList,
                        openfooter:true,
                    });
                },0);
                
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
                 
             })
    }


    //尾部
    _footer(){

       
        if(!this.state.openfooter){
            return null;
          }
        if(page<totalPage){
            //还有更多，默认显示‘正在加载更多...’
            
            return <LoadMore isLoadAll={false}/>
        }else{
             // 加载全部
             return <LoadMore isLoadAll={true}/>
        }
    }

    renderRow(data){
        
        return(
            <RecordItem data={data.item}/>
        )
    }

    render(){
        return(
            <View style={stypes.contains}>
                <View style={[stypes.contentView,{height:30,backgroundColor:'rgb(38,54,64)'}]}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{
                        this.state.selectBtn?'':this.listContent(true)
                    }}>
                    <Text style={this.state.selectBtn?stypes.headSelectText:stypes.headText}>充值</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{
                        !this.state.selectBtn?'':this.listContent(false)
                    }}>
                    <Text style={this.state.selectBtn?stypes.headText:stypes.headSelectText}>提现</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'rgb(255,182,0)',height:2,width:width/2.0,marginLeft:this.state.selectBtn?0:width/2.0}}></View>
                <FlatList
                style={{flex:1}}
                ref={(flatList)=>this._flatList = flatList}//获取此flatlist
                ItemSeparatorComponent={this._separator}//设置行与行之间的分隔线
                // ListHeaderComponent = {this._header.bind(this)}
                ListFooterComponent={this._footer.bind(this)}//设置尾部
                renderItem={this.renderRow.bind(this)}//根据data的数据渲染页面
                // ListEmptyComponent = {this.ListEmpty.bind(this)}
                refreshing={this.state.isRefreshing}//下拉加载配置项
                onRefresh={this.onRefresh.bind(this)}//下拉刷新
                onEndReachedThreshold={0.1}
                onEndReached={((info)=>{
                    
                    if(info.distanceFromEnd>=0){
                        console.log(info.distanceFromEnd);
                        page++;
                        this.requesteRecordList();
                    }
                    
                }).bind(this)}
                data={this.state.dataSource}
                 extraData = {this.state}
                />
                
                <Load 
                ref = {(Load) => this.Load = Load}
                title = {this.state.loadText}
                type = {this.state.type}
                />
            </View>
        )
    }
}


const stypes = StyleSheet.create({
    contains:{
        height:height,
        backgroundColor:'rgb(27,38,45)',
        flex:1
    },
    contentView:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    headText:{
        textAlign:'center',
        width:width/2.0,
        color:'rgb(196,199,207)',
        lineHeight:30,
    },
    headSelectText:{
        textAlign:'center',
        width:width/2.0,
        color:'rgb(255,182,0)',
        lineHeight:30,
    }
});