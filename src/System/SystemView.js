import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image
}from 'react-native';
import React, { Component } from 'react';
import Load from '../../Compent/loading';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';

const {width,height}=Dimensions.get('window');
export default class SystemView extends Component{

    constructor(props){
        super(props);
        this.state={
            loadText:'',
            type:0,
        }
    }

    render(){

        return (
            <View style={stypes.contairn}>
                <TouchableOpacity activeOpacity={1}>
                    <Image source={require('../../Images/图标/manager.png')} style={stypes.headImage}/>
                </TouchableOpacity>

                <View style={{marginTop:10,flexDirection:'row',marginLeft:20,height:60,marginRight:20}}>
                    <Image source={require('../../Images/图标/我的图标.png')} style={{marginTop:10,width:40,height:40}}/>
                    <Text style={stypes.contentText}>UID:001</Text>
                </View>
                <View style={stypes.lineView}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.navigate('ProveView')}>
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>身份认证</Text>
                        <View style={{flexDirection:'row',marginRight:5}}>
                            <Text style={stypes.certificationText}>未认证</Text>
                            <Image source={require('../../Images/图标/收起侧边栏按钮.png')} style={stypes.rightImage}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={stypes.lineView}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.navigate('ChangeLoginPWDView')}>
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>登录密码</Text>
                        <View style={{flexDirection:'row',marginRight:5}}>
                            <Text style={stypes.contentText}>修改</Text>
                            <Image source={require('../../Images/图标/收起侧边栏按钮.png')} style={stypes.rightImage}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={stypes.lineView}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>{this.setState({loadText:'请到U-Coin官网设置Google验证',type:3},() => {
                    this.Load.show();
                })}}>
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>Google验证</Text>
 
                        <Image source={require('../../Images/图标/收起侧边栏按钮.png')} style={stypes.rightImage}/>
                       
                    </View>
                </TouchableOpacity>
                <View style={stypes.lineView}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.navigate('SettingView')}>
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>设置</Text>

                        <Image source={require('../../Images/图标/收起侧边栏按钮.png')} style={stypes.rightImage}/>
                        
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.replace('LoginView');}}>
                    <Text style={stypes.exitOutBtn}>退出</Text>
                </TouchableOpacity>

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
    contairn:{
        flex:1,
        backgroundColor:'rgb(27,38,45)',
    },
    headImage:{
        marginLeft:20,
        marginTop:10,
        marginRight:20,
        height:100,
        width:width-40

    },
    contentView:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:60,
        marginLeft:20,
        marginRight:20
    },
    contentText:{
        fontSize:14,
        color:'rgb(196,199,207)',
        lineHeight:60,
        height:60
    },
    lineView:{
        marginLeft:20,
        marginRight:20,
        height:1,
        backgroundColor:'rgb(54,70,79)',
    },
    rightImage:{
        width:15,
        height:20,
        marginTop:20
    },
    certificationText:{
        fontSize:14,
        color:'rgb(255,182,0)',
        lineHeight:60,
        height:60
    },
    exitOutBtn:{
        borderWidth:1,
        borderColor:'rgb(255,182,0)',
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        height:40,
        color:'rgb(255,182,0)',
        textAlign:'center',
        lineHeight:40
    }
});