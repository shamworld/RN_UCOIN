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
    Keyboard,
    ActivityIndicator,
    RefreshControl,
    FlatList

}from 'react-native';
import React, { Component } from 'react';
import Load from '../../Compent/loading';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
import CustomModal from '../../Compent/CustomModal';

const {width,height}=Dimensions.get('window');
export default class AddressListView extends Component{

    constructor(props){
        super(props);
        // var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:[],
            isRefreshing:false,
            isLoading:true,
            isLoadingMore:false,
            loadText:'',
            type:0,
            modalVisibility:false,
            itemData:{}
        }
    }
    static navigationOptions = ({navigation})=>({
        title:'地址',
        

    })
    componentWillMount(){
        this.refreshData();
    }

    refreshData(){
        this.setState({refreshing:true})
        Request.get(Config.api.homeList+'v2/address/'+this.props.navigation.state.params.id,true).then((data) => {
            
            
            if(data.code==0){
     
     
                setTimeout(() => {
                    this.setState({
                        dataSource:data.data,
                        isRefreshing:false
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

    requestDeleteAddress(data){
        Request.post(Config.api.homeList+'v2/address/delete/'+data.id,null,true).then((data) => {
            
            
            if(data.code==0){
                this.setState({loadText:'删除成功',type:3},()=>{
                    this.Load.show();
                    
                });
     
                this.refreshData();
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

    renderRow(rowData){

        return (
            <View>
                <TouchableOpacity activeOpacity={1} onLongPress={()=>{
                    // Alert.alert('温馨提示','是否删除该地址',[
                    //     {text:'取消'},
                    //     {text:'删除',onPress:this.requestDeleteAddress(rowData)},
                    // ])
                    this.setState({modalVisibility:true,itemData:rowData.item});
                }}>
                <Text style={[stypes.text,{marginTop:15}]}>标签：{rowData.item.tag}</Text>
                <Text style={[stypes.text,{marginTop:5}]}>地址：{rowData.item.address}</Text>
                <View style={{marginTop:15,height:1,backgroundColor:'rgb(54,70,79)'}}></View>
                </TouchableOpacity>
            </View>
        )
    }

    render(){
        return(
            <View style={stypes.contains}>
            
                
            <FlatList
                data={this.state.dataSource}
                extraData={this.state}
                renderItem={this.renderRow.bind(this)}
                keyExtractor={(item,index)=>index}
                refreshing={this.state.isRefreshing}
                onRefresh={() => {
                    
                    this.refreshData()
                }}
                />
            
            <Load 
                ref = {(Load) => this.Load = Load}
                title = {this.state.loadText}
                type = {this.state.type}
                />
            <CustomModal title='温馨提示' message='是否删除该地址' sureText='删除' ref="_customModal" visibility={this.state.modalVisibility}
            onLeftPress={()=>{this.setState({modalVisibility:false})}} onRightPress={()=>{
                this.setState({modalVisibility:false})
                this.requestDeleteAddress(this.state.itemData)
            }}/>
            </View>
        )
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
    text:{
        marginLeft:10,
        color:'white',
        height:20,
        lineHeight:20,
        fontSize:14
    }
});
