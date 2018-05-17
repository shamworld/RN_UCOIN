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
import RecordView from './RecordView';
import Load from '../../Compent/loading';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';

const {width,height}=Dimensions.get('window');
export default class RechargeView extends Component{
    constructor(props){
        super(props);
        var coinList = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        this.state = {
            loadText:'',
            coinList:coinList,
            type:0,
            navTitle:'',
            index:0,
            isRecHiddenList:false,
            assetsText:'0.000000',
            addressText:''
        }
    }
    static navigationOptions = ({navigation})=>({
        title:'充值',
        headerRight:(
            <TouchableOpacity onPress = {()=>{navigation.state.params.popRecordView()}}>
                <Text style={{color:'rgb(196,199,201)',marginRight:20}}>记录</Text>
            </TouchableOpacity>
        )
    })
    componentDidMount(){
        this.props.navigation.setParams({popRecordView:this.popRecordView.bind(this)});
    }
    componentWillMount(){
        this.requestCoinList();
        this.requestSynchronous();
    }
    //币的列表
    async requestCoinList(){
       await Request.get(Config.api.homeList+'v2/coin/info',false).then((data) => {
        console.log(data);
        let list=new Array();
        list=data.data;
        let title='';
        if(list.length>0){
           
            title=list[this.state.index].name;
            this.requestCoinTypeData(list[this.state.index]),
            this.requestRechargeAddress(list[this.state.index])
        }
         setTimeout(() => {
             this.setState({
                 coinList:this.state.coinList.cloneWithRows(list),
                 navTitle:title
             });
         },0);
        },(error) =>{
             console.log('错误信息'+error);
             this.setState({isLoading:true});
         })
    }

    //请求一下就可以了
    async requestSynchronous(){
        await Request.get(Config.api.homeList+'v2/import/synchronous',true).then((data) => {
             
         
         },(error) =>{
              
          })
     }

    popRecordView(){
        this.props.navigation.navigate('RecordView');
    }

    showMsg(msg){
        this.setState({loadText:msg,type:3},()=>{
            this.Load.show();
        });
        
    }
    //不同币种不同数据
    requestCoinTypeData(data){
         Request.get(Config.api.homeList+'v2/asset?coin_id='+data.id,true).then((data) => {
        console.log(data);
        
        if(data.code==0){


            setTimeout(() => {
                this.setState({
                    assetsText:data.data.available
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
             this.setState({isLoading:true});
         })
    }
    //请求地址
    requestRechargeAddress(data){
        Request.get(Config.api.homeList+'v2/import/address/'+data.id,true).then((data) => {
       console.log(data);
       
       if(data.code==0){


           setTimeout(() => {
               this.setState({
                addressText:data.data.address
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
            this.setState({isLoading:true});
        })
   }


    coinListItem(data,sectionId,rowId){
        
        return(
            <View>
                <TouchableOpacity onPress={()=>{
                    this.setState({coinListData:data,navTitle:data.name,isRecHiddenList:false,index:sectionId})
                    this.requestCoinTypeData(data),
                    this.requestRechargeAddress(data)
                }}>
                    <Text style={{marginLeft:5,height:25,lineHeight:25,textAlign:'center',color:'white'}}>{data.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
    coinListRender(){
        return (
            <View style={{position:'absolute',top:40,width:120,left:width/2.0-60,height:200,backgroundColor:'rgba(0,0,0,0.7)'}}>
                
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
        return(
            <View style={stypes.contains}>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({isRecHiddenList:false})}>
                <TouchableOpacity  onPress={()=>this.setState({isRecHiddenList:!this.state.isRecHiddenList})}>
                    <View style={{flexDirection:'row',marginTop:15,justifyContent:'center',height:20}}>
                        <Image source={require('../../Images/图标/币种图标.png')} style={{width:15,height:15,marginTop:2.5}}/>
                        <Text style={stypes.coinText}>{this.state.navTitle}</Text>
                        <Image source={require('../../Images/图标/下拉.png')} style={{width:10,height:10,marginTop:5}}/>
                    </View>
                </TouchableOpacity>
                <Text style={stypes.assetsText}>{parseFloat(this.state.assetsText).toFixed(6)}资产</Text>
                <View style={{alignItems: 'center', justifyContent: 'center',marginTop:30}}>
                    <Image source={require('../../Images/图标/二维码.png')}/>
                </View>
                <View style={{marginTop:60}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.showMsg('复制成功')}>
                        <Text style={stypes.btnView}>复制地址</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:30}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.showMsg('复制成功')}>
                        <Text style={stypes.btnView}>复制地址</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[stypes.cluesText,{marginTop:20}]}>温馨提示</Text>
                <Text style={stypes.cluesText}>
                {
                    
                    `1.请勿向上述地址充值任何非${this.state.navTitle}资产,否则资产将不可找回。`
                       
                    
                }
                </Text>
                <Text style={stypes.cluesText}>2.您充值至上述地址后,需要整个网络节点的确认,1次网络确认后到账,6次网络确认后可提币。</Text>
                <Text style={stypes.cluesText}>
                
                {
                    
                    `3.最小充值金额:0.001${this.state.navTitle},小于最小金额的充值将不会上账。`
                       
                    
                }
                </Text>
                <Text style={stypes.cluesText}>4.您的充值地址不会经常改变,可以重复充值;如有更改,我们会尽量通过网络公告或邮件通知您。</Text>
                <Text style={stypes.cluesText}>5.请务必确认手机安全,防止信息被篡改或泄露。</Text>
                </TouchableOpacity>
                {
                    this.state.isRecHiddenList?this.coinListRender():''
                }
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
    coinText:{
        height:20,
        lineHeight:20,
        color:'rgb(196,199,207)'
    },
    assetsText:{
        marginTop:40,
        marginLeft:0,
        marginRight:0,
        textAlign:'center',
        color:'white',
        fontSize:25,
    },
    imageIcon:{
        width:120,
        height:120,

    },
    btnView:{
        color:'rgb(255,182,0)',
        borderColor:'rgb(255,182,0)',
        borderWidth:1,
        marginLeft:20,
        marginRight:20,
        height:30,
        lineHeight:30,
        textAlign:'center',
    },
    cluesText:{
        marginLeft:20,
        marginRight:20,
        color:'rgb(196,199,207)',
        fontSize:12
    }
});

