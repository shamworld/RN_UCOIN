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
    RefreshControl

}from 'react-native';
import React, { Component } from 'react';
import Msg from '../../Compent/LoadingMsg';

const {width,height}=Dimensions.get('window');
export default class AddressListView extends Component{

    constructor(props){
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:dataSource.cloneWithRows([
                {tag:'412',address:'回去问'},
                {tag:'rhn',address:'发光谷'},
                {tag:'啊静安寺',address:'二维图恩'},
                {tag:'为人妻我人',address:'广东佛山人'},
                ]),
            isRefreshing:false,
            isLoading:true,
            isLoadingMore:false,
        }
    }
    static navigationOptions = ({navigation})=>({
        title:'地址',
        

    })
    refreshData(){


    }

    renderRow(rowData){
        return (
            <View>
                <Text style={[stypes.text,{marginTop:15}]}>标签：{rowData.tag}</Text>
                <Text style={[stypes.text,{marginTop:5}]}>地址：{rowData.address}</Text>
                <View style={{marginTop:15,height:1,backgroundColor:'rgb(54,70,79)'}}></View>
            </View>
        )
    }

    render(){
        return(
            <View style={stypes.contains}>
            {
                this.state.isLoading?
                <ListView
                    renderRow={this.renderRow.bind(this)}
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    onEndReachedThreshold={40}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshData.bind(this)}/>
                    }
                />
                :
                <ActivityIndicator style = {stypes.loadDataStyle}/>
            }
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
