import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    Switch,
    Alert

}from 'react-native';
import React, { Component } from 'react';
import RecordItem from './RecordItem';

const {width,height}=Dimensions.get('window');
export default class RecordView extends Component{
    constructor(props){
        super(props);
        var dataSource=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            selectBtn:true,
            dataSource:dataSource.cloneWithRows([
                {number:'31',coin_name:'BTC',created_at:'2017.04.28 13:21:42',address:'大时代按暗示tw2就让人爱人爱人啊啊阿道夫范德萨剧情片发阿发发神经',id:'74698712',status:1},
                {number:'342',coin_name:'UT',created_at:'2017.04.28 13:21:42',address:'安师傅34人',id:'435666',status:0},
                {number:'324',coin_name:'UT',created_at:'2017.04.28 13:21:42',address:'fasrq',id:'432646',status:1},
                {number:'654',coin_name:'BTC',created_at:'2017.04.28 13:21:42',address:'稳如泰山',id:'2434526',status:1},
                {number:'45',coin_name:'BTC',created_at:'2017.04.28 13:21:42',address:'额温柔我',id:'4236234',status:0},
                {number:'65',coin_name:'BTC',created_at:'2017.04.28 13:21:42',address:'3 认识的',id:'21345256',status:1},
                {number:'76',coin_name:'UT',created_at:'2017.04.28 13:21:42',address:'让房东说',id:'12342345',status:1},
            ]),
        }
    }
    static navigationOptions = ({navigation})=>({
        title:'记录',

    })

    listContent(isRec){
        if(isRec){
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([
                    {number:'31',coin_name:'BTC',created_at:'2017.04.28 13:21:42',address:'大时代按暗示tw2就让人爱人爱人啊啊阿道夫范德萨剧情片发阿发发神经',id:'74698712',status:1},
                    {number:'342',coin_name:'UT',created_at:'2017.04.28 13:21:42',address:'安师傅34人',id:'435666',status:0},
                    {number:'324',coin_name:'UT',created_at:'2017.04.28 13:21:42',address:'fasrq',id:'432646',status:1},
                    {number:'654',coin_name:'BTC',created_at:'2017.04.28 13:21:42',address:'稳如泰山',id:'2434526',status:1},
                    {number:'45',coin_name:'BTC',created_at:'2017.04.28 13:21:42',address:'额温柔我',id:'4236234',status:0},
                    {number:'65',coin_name:'BTC',created_at:'2017.04.28 13:21:42',address:'3 认识的',id:'21345256',status:1},
                    {number:'76',coin_name:'UT',created_at:'2017.04.28 13:21:42',address:'让房东说',id:'12342345',status:1},
                ]),
                selectBtn:true,
            });
        }else{
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([
                    {number:'31432',coin_name:'UT',created_at:'2017.04.28 22:21:42',address:'人家唉发辐射大冯那是的能否撒旦你',id:'325324',status:1},
                    {number:'2',coin_name:'UT',created_at:'2017.04.28 11:21:42',address:'李开复我去额头你多少分是的',id:'3125',status:0},
                    {number:'4564',coin_name:'UT',created_at:'2017.04.28 17:07:42',address:'发圣诞快乐范德萨发撒按',id:'23432646',status:0},
                    {number:'354',coin_name:'BTC',created_at:'2017.04.28 07:41:42',address:'大守空房nmsad.f/ ',id:'4325',status:1},
                    {number:'45',coin_name:'UT',created_at:'2017.04.28 07:40:42',address:'大街上配方法阿尔阿发',id:'54232',status:0},
                    {number:'65',coin_name:'BTC',created_at:'2017.04.28 15:54:42',address:'3 客人暗室逢灯',id:'412343',status:1},
                    {number:'45',coin_name:'UT',created_at:'2017.04.28 13:21:42',address:'二级到光谷',id:'45235',status:1},
                ]),
                selectBtn:false,
            });
        }
    }
    
    renderRow(data){
        return(
            <RecordItem data={data}/>
        )
    }

    render(){
        return(
            <View style={stypes.contains}>
                <View style={[stypes.contentView,{height:30,backgroundColor:'rgb(38,54,64)'}]}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.listContent(true)}>
                    <Text style={this.state.selectBtn?stypes.headSelectText:stypes.headText}>充值</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.listContent(false)}>
                    <Text style={this.state.selectBtn?stypes.headText:stypes.headSelectText}>提现</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'rgb(255,182,0)',height:2,width:width/2.0,marginLeft:this.state.selectBtn?0:width/2.0}}></View>
                <ListView
                    renderRow={this.renderRow.bind(this)}
                    dataSource={this.state.dataSource}
                    onEndReachedThreshold={40}
                    enableEmptySections={true}
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