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
    TextInput,
    Keyboard

}from 'react-native';
import React, { Component } from 'react';
import Load from '../../Compent/loading';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';

const {width,height}=Dimensions.get('window');
export default class DrawalView extends Component{
    constructor(props){
        super(props);
        var coinList = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        var addressList = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        this.state = {
            numText:'',
            isRecHidden:true,
            loadText:'',
            coinList:coinList,
            type:0,
            navTitle:'',
            index:0,
            today_used:'0.000000',
            available:'0.000000',
            totalMoney:'0.000000',
            isRecHiddenList:false,
            addressList:addressList,
            addressText:'',
            id:''

        }
    }
    componentWillMount(){
        this.requestCoinList();
        
    }

    //币的列表
    async requestCoinList(){
        await Request.get(Config.api.homeList+'v2/coin/info',false).then((data) => {
         
         let list=new Array();
         list=data.data;
         let title='';
         if(list.length>0){
            
             title=list[this.state.index].name;
             this.reqeustUserCoinInfo(list[this.state.index]);
             this.requestAddressList(list[this.state.index]);
         }
          setTimeout(() => {
              this.setState({
                  coinList:this.state.coinList.cloneWithRows(list),
                  navTitle:title,
                  id:list[this.state.index].id
              });
          },0);
         },(error) =>{
              console.log('错误信息'+error);
              this.setState({isLoading:true});
          })
     }

     async reqeustUserCoinInfo(data){
        await Request.get(Config.api.homeList+'v2/asset?coin_id='+data.id,true).then((data) => {
            console.log(data);
            
            if(data.code==0){
     
     
                setTimeout(() => {
                    this.setState({
                        today_used:data.data.today_used,
                        totalMoney:(parseFloat(data.data.available)+parseFloat(data.data.disabled)).toFixed(6),
                        available:data.data.available
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

     async requestAddressList(data){
        await Request.get(Config.api.homeList+'v2/address/'+data.id,true).then((data) => {
            console.log(data);
            
            if(data.code==0){
     
     
                setTimeout(() => {
                    this.setState({
                        addressList:this.state.addressList.cloneWithRows(data.data)
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

    static navigationOptions = ({navigation})=>({
        title:'提现',
        headerRight:(
            <TouchableOpacity onPress = {()=>{navigation.state.params.popRecordView()}}>
                <Text style={{color:'rgb(196,199,201)',marginRight:20}}>记录</Text>
            </TouchableOpacity>
        )
    })
    componentDidMount(){
        this.props.navigation.setParams({popRecordView:this.popRecordView.bind(this)});
    }

    popRecordView(){
        this.props.navigation.navigate('RecordView');
    }

    securityVerification(){
        let err='';

        if(this.state.addressText==''){
            err='请选择地址';
        }else if(this.state.numText==''){
            err='请输入数量';
        }else if(parseFloat(this.state.numText)<0.01){
            err='日提现额度不少于0.01';
        }else if(parseFloat(this.state.numText)>parseFloat(this.state.available)){
            err='提现数量超出可用数量';
        }

        if(err!=''){
            this.setState({loadText:err,type:3});
            this.Load.show();
            return;
        }

        this.props.navigation.navigate('SafeConfirmView',{addressText:this.state.addressText,numText:this.state.numText,id:this.state.id});
    }
    //币的列表item
    coinListItem(data,sectionId,rowId){
        
        return(
            <View>
                <TouchableOpacity onPress={()=>{
                    this.setState({coinListData:data,navTitle:data.name,isRecHiddenList:false,index:sectionId,id:data.id})
                    this.reqeustUserCoinInfo(data)
                    this.requestAddressList(data)
                    
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

    //地址列表
    addressListView(){
        return(
            <View style={stypes.addressView}>
            {
                this.state.addressList.length>4?
                <View style={{height:40*4}}>
                <ListView
                dataSource={this.state.addressList}
                renderRow={(rowData,sectionId,rowId)=>this.addressItem(rowData,sectionId,rowId)}
                enableEmptySections = {true}
                onEndReachedThreshold = {40}
                />
                </View>
                :
                <View style={{height:40*this.state.addressList.length}}>
                <ListView
                dataSource={this.state.addressList}
                renderRow={(rowData,sectionId,rowId)=>this.addressItem(rowData,sectionId,rowId)}
                enableEmptySections = {true}
                onEndReachedThreshold = {40}
                />
                </View>
            }
                <TouchableOpacity activeOpacity={1} onPress={()=>{this.setState({isRecHidden:true});this.props.navigation.navigate('AddAddressView',{id:this.state.id})}}>
                    <Text style={[stypes.addressBtn,{color:'rgb(255,182,0)'}]}>+添加新地址</Text>
                </TouchableOpacity>
            </View>
        )
    }

    addressItem(data,sectionId,rowId){
        return (
            <View>
                <TouchableOpacity onPress={()=>this.setState({isRecHidden:true,addressText:data.address})}>
                <Text style={stypes.addressItemText}>地址{parseInt(rowId)+1}</Text>
                <Text style={[stypes.addressItemText,{fontSize:12}]}>{data.address}</Text>
                <View style={{height:1,backgroundColor:'rgb(54,70,79)'}}></View>
                </TouchableOpacity>
            </View>
        )
    }

    render(){
        return(
            <View style={stypes.contains}>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({isRecHidden:true,isRecHiddenList:false},()=>{Keyboard.dismiss()})}>
                <TouchableOpacity onPress={()=>this.setState({isRecHiddenList:!this.state.isRecHiddenList})}>
                    <View style={{flexDirection:'row',marginTop:15,justifyContent:'center',height:20}}>
                        <Image source={require('../../Images/图标/币种图标.png')} style={{width:15,height:15,marginTop:2.5}}/>
                        <Text style={stypes.coinText}>{this.state.navTitle}</Text>
                        <Image source={require('../../Images/图标/下拉.png')} style={{width:10,height:10,marginTop:5}}/>
                    </View>
                </TouchableOpacity>
                <Text style={stypes.assetsText}>{parseFloat(this.state.totalMoney).toFixed(6)}资产</Text>
                <Text style={[stypes.userText,{marginTop:20}]}>日提现额度：不少于0.01{this.state.navTitle}</Text>
                <Text style={[stypes.userText,{marginTop:5}]}>今日已用：{parseFloat(this.state.today_used).toFixed(6)}{this.state.navTitle}</Text>
                <Text style={stypes.leftText}>地址</Text>
                
                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({isRecHidden:false})}>
                    <View style={[stypes.bgView,stypes.viewFlex]}>
                        <Text style={{color:'white'}}>{this.state.addressText}</Text>
                        <Image source={require('../../Images/图标/下拉.png')} style={{width:10,height:10,marginTop:10,marginRight:10}}/>
                    </View>
                </TouchableOpacity>
                
                <Text style={stypes.leftText}>数量</Text>
                <TextInput 
                    style={stypes.bgView}
                    onChangeText={(text)=>this.setState({numText:text})}
                    value={this.state.numText}
                    keyboardType='numeric'
                />

                <View style={stypes.viewFlex}>
                    <Text style={stypes.leftText}>可用</Text>
                    <Text style={stypes.rightText}>{parseFloat(this.state.available).toFixed(6)}</Text>
                </View>
                <View style={stypes.viewFlex}>
                    <Text style={stypes.leftText}>手续费</Text>
                    <Text style={stypes.rightText}>5%</Text>
                </View>
                <View style={stypes.viewFlex}>
                    <Text style={stypes.leftText}>实际到账</Text>
                    <Text style={stypes.rightText}>{this.state.numText==''?'0.000000':(parseFloat(this.state.numText)*0.05).toFixed(6)}</Text>
                </View>


                <View style={{marginTop:20}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.securityVerification()}>
                        <Text style={stypes.btnView}>提现</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[stypes.cluesText,{marginTop:10}]}></Text>
                <Text style={stypes.cluesText}>温馨提示</Text>
                <Text style={stypes.cluesText}>1.最小提币数量为:0.01{this.state.navTitle}</Text>
                <Text style={stypes.cluesText}>2.为保障资金安全,当您账户安全策略变更,密码修改,使用新地址提币,我们会对提币进行人工审核,请耐心等待工作人员电话或邮件联系</Text>
                <Text style={stypes.cluesText}>3.请务必确认手机安全,防止信息被篡改或泄露</Text>

                </TouchableOpacity>
                {
                    this.state.isRecHidden?<View></View>:this.addressListView()
                }
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
        marginTop:20,
        marginLeft:0,
        marginRight:0,
        textAlign:'center',
        color:'white',
        fontSize:25,
    },
    userText:{
        marginLeft:0,
        marginRight:0,
        textAlign:'center',
        fontSize:12,
        color:'rgb(196,199,207)'
    },
    leftText:{
        marginLeft:20,
        color:'rgb(196,199,207)',
        marginTop:20,
        fontSize:14
    },
    rightText:{
        marginRight:20,
        color:'rgb(196,199,207)',
        marginTop:20,
        fontSize:14
    },
    bgView:{
        marginLeft:20,
        marginRight:20,
        height:30,
        backgroundColor:'rgb(38,54,64)',
        borderColor:'rgb(56,73,82)',
        borderWidth:1,
        marginTop:10,
        color:'white'
    
    },
    viewFlex:{
        justifyContent:'space-between',
        flexDirection:'row'
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
        marginTop:3,
        fontSize:12
    },
    addressView:{
        backgroundColor:'rgb(38,54,64)',
        borderColor:'rgb(56,73,82)',
        borderWidth:1,
        left:20,
        right:20,
        position:'absolute',
        top:214
        
    },
    addressBtn:{
        marginLeft:0,
        marginRight:0,
        textAlign:'center',
        height:30,
        lineHeight:30,
    },
    addressItemText:{
        marginLeft:10,
        height:20,
        lineHeight:20,
        marginRight:10,
        color:'white',
        fontSize:14,
    }
});