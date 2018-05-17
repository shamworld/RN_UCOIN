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
    SectionList,
    FlatList

}from 'react-native';
import React, { Component } from 'react';
import DrawalView from './DrawalView';
import RechargeView from './RechargeView';
import Load from '../../Compent/loading';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';

const {width,height}=Dimensions.get('window');
export default class AssetView extends Component{

    // {coin_name:'BTC',disabled:6.01200000,available:93.98600000,isRec:true},
    //         {coin_name:'FUC',disabled:6.01200000,available:93.98600000,isRec:true},
    //         {coin_name:'HCC',disabled:6.01200000,available:93.98600000,isRec:true},
    //         {coin_name:'SIX',disabled:6.01200000,available:93.98600000,isRec:true},
    //         {coin_name:'ITS',disabled:6.01200000,available:93.98600000,isRec:true},
    //         {coin_name:'EDU',disabled:6.01200000,available:93.98600000,isRec:true},
    //         {coin_name:'ETP',disabled:6.01200000,available:93.98600000,isRec:true},
    //         {coin_name:'UBC',disabled:6.01200000,available:93.98600000,isRec:true}
    // 构造
    constructor(props) {
        super(props);

        // 初始状态
        this.state = {
            refreshing: false, 
            value: true,
            dataSource:[],
            loadText:'',
            type:0,
            hiddenList:[],
            rmbMoney:'0.000000'
        };
        //this.dataScroll(this.state.dataSource);
    }
     //对数据添加一个Bool字段
     dataScroll(dataObj){
        let list=new Array();
        dataObj.forEach((data,i)=>{
            data.isRec=true;
            list.push(data);
        });
       return list;
    }
    //点击控制显示隐藏
    press(data,index){
        
        data.item.isRec=!data.item.isRec;
        this.setState({dataSource:this.state.dataSource});
        
    }

   async requestAsset(){
        await Request.get(Config.api.homeList+'v2/asset/total',true).then((data) => {
            console.log(data);
             if(data.code==0){

                 setTimeout(() => {
                     this.setState({
                        rmbMoney:data.data[0].total_rmb
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

    requestCoinList(){
        Request.get(Config.api.homeList+'v2/asset',true).then((data) => {

            if(data.code==0){

                let list=[];
                data.data.forEach((item,i)=>{
                    if(parseFloat(item.available)+parseFloat(item.disabled)!=0){
                        item.isRec=true;
                        list.push(item);
                    }
                })
               let dataS=[];
               dataS = this.dataScroll(data.data);
                setTimeout(() => {
                    this.setState({
                        dataSource:dataS,
                        refreshing:false,
                        hiddenList:list
                    });
                },0);
                
            }else if (data.code==9001){
                this.setState({refreshing:false,loadText:data.msg,type:3},()=>{
                    this.Load.show();
                    
                });
                // this.props.toLogin();
            }else{
                this.setState({refreshing:false,loadText:data.msg,type:3},()=>{
                    this.Load.show();
                });
               
            }
        
        },(error) =>{
             console.log('错误信息'+error);
             this.setState({refreshing:false});
         })
    }
    componentWillMount(){
        this.requestAsset();
        this.onRefresh();
    }
    onRefresh(){
        this.setState({refreshing:true})
        this.requestCoinList();
    }

    renderRowItem(data,index){
        
        return (
            <View>
                <TouchableOpacity activeOpacity={1} onPress={this.press.bind(this,data,index)}>
                    <Text style={{height:30,lineHeight:30,marginLeft:20,color:'white'}}>{data.item.coin_name}</Text>
                    {
                        data.item.isRec?
                        ''
                        :
                        <View style={{marginTop:10,height:70}}>
                            <View style={stypes.hiddenView}>
                                <Text style={[stypes.itemText,{marginLeft:20}]}>总资产</Text>
                                <Text style={[stypes.itemText,{marginRight:20}]}>{(parseFloat(data.item.available)+parseFloat(data.item.disabled)).toFixed(6)}</Text>
                            </View>
                            <View style={stypes.hiddenView}>
                                <Text style={[stypes.itemText,{marginLeft:20}]}>可用</Text>
                                <Text style={[stypes.itemText,{marginRight:20}]}>{parseFloat(data.item.available).toFixed(6)}</Text>
                            </View>
                            <View style={stypes.hiddenView}>
                                <Text style={[stypes.itemText,{marginLeft:20}]}>冻结</Text>
                                <Text style={[stypes.itemText,{marginRight:20}]}>{parseFloat(data.item.disabled).toFixed(6)}</Text>
                            </View>
                        </View>
                    }
                    <View style={{marginLeft:10,marginTop:5,backgroundColor:'rgb(196,199,201)',height:0.5,marginRight:0}}></View>
                </TouchableOpacity>
            </View>
        )
    }
    render(){

        return (
            <View style={stypes.contains}>
                <Text style={stypes.textMain}>当前估值</Text>
                <Text style={[stypes.textMain,{fontSize:25,marginTop:30,color:'white'}]}>{'￥'+parseFloat(this.state.rmbMoney).toFixed(6)}</Text>
                <View style={stypes.buySellView}>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('RechargeView')}}>
                        <Text style={stypes.topUpText}>充值</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('DrawalView')}}> 
                        <Text style={stypes.drawalText}>提现</Text>
                    </TouchableOpacity>
                </View>
                <View style={stypes.listHeadView}>
                    <Text style={stypes.listHeadText}>隐藏0资产币种</Text>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({value:!this.state.value})}>
                        <Image style={stypes.switchBtn} resizeMode='cover' source={this.state.value?require('../../Images/图标/开关-开.png'):require('../../Images/图标/开关-关.png')}/>
                    </TouchableOpacity>
                </View>
                {
                    this.state.value?
                    <FlatList
                    data={this.state.dataSource}
                    extraData={this.state}
                    renderItem={this.renderRowItem.bind(this)}
                    keyExtractor={(item,index)=>index}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        
                        this.onRefresh()
                    }}
                    />
                    :<FlatList
                    data={this.state.hiddenList}
                    extraData={this.state}
                    renderItem={this.renderRowItem.bind(this)}
                    keyExtractor={(item,index)=>index}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        
                        this.onRefresh()
                    }}
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


const stypes = StyleSheet.create({
    contains:{
        height:height,
        backgroundColor:'rgb(27,38,45)',
        flex:1
    },
    textMain:{
        textAlign:'center',
        marginTop:15,
        color:'rgb(196,199,201)',
        fontSize:12,
        marginLeft:0,
        marginRight:0
    },
    listHeadView:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'rgb(38,54,64)',
        height:25,
        marginTop:35
    },
    listHeadText:{
        marginLeft:20,
        lineHeight:25,
        color:'rgb(196,199,201)',
        
    },
    switchBtn:{
        marginRight:20,
        marginTop:4,
        height:17,
        marginBottom:4,
        width:25
    },
    buySellView:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:25
    },
    topUpText:{
        color:'rgb(218,233,211)',
        backgroundColor:'rgb(62,107,0)',
        height:30,
        width:100,
        lineHeight:30,
        textAlign:'center',
        marginRight:10
    },
    drawalText:{
        color:'rgb(218,233,211)',
        backgroundColor:'rgb(122,0,6)',
        height:30,
        width:100,
        lineHeight:30,
        textAlign:'center',
        marginLeft:10
    },
    hiddenView:{
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    itemText:{
        textAlign:'center',
        fontSize:12,
        lineHeight:20,
        height:20,
        color:'rgb(196,199,201)'
    }
});
