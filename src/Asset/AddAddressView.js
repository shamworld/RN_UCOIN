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

const {width,height}=Dimensions.get('window');
export default class AddAddressView extends Component{

    constructor(props){
        super(props);
        this.state = {
            addressText:'',
            labelText:''
        }
    }


    static navigationOptions = ({navigation})=>({
        title:'添加新地址',
        headerRight:(
            <TouchableOpacity onPress = {()=>{navigation.state.params.popAddressListView()}}>
                <Text style={{color:'rgb(196,199,201)',marginRight:20}}>记录</Text>
            </TouchableOpacity>
        )

    })

    popAddressListView(){

    }
    componentDidMount(){
        this.props.navigation.setParams({popAddressListView:this.popAddressListView.bind(this)});
    }


    addAddressBtnClick(){

    }

    render(){
        return(
            <View style={stypes.contains}>
                <Text style={stypes.leftText}>提现地址</Text>
                <TextInput 
                    style={stypes.bgView}
                    onChangeText={(text)=>this.setState({addressText:text})}
                    value={this.state.addressText}
                />
                <Text style={stypes.leftText}>标签</Text>
                <TextInput 
                    style={stypes.bgView}
                    onChangeText={(text)=>this.setState({labelText:text})}
                    value={this.state.labelText}
                />
                <View style={{marginTop:40}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.addAddressBtnClick()}>
                        <Text style={stypes.btnView}>添加</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const stypes = StyleSheet.create({
    contains:{
        backgroundColor:'rgb(27,38,45)',
        flex:1
    },
    leftText:{
        marginLeft:20,
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
});