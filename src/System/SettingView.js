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
import Msg from '../../Compent/LoadingMsg';
import storage from '../../Compent/StorageUtil';


const {width,height}=Dimensions.get('window');
export default class SettingView extends Component{
    static navigationOptions = {
        title:'设置'
    }
    constructor(props){
        super(props);
        this.state={
            msg:'',
            isRec:false,
        }
        
    }
    componentWillMount(){
        storage.load({
            key:'guestIsRec',

        }).then(res => {
            this.setState({isRec:res.guestIsRec})
            console.log('数据为:'+res.guestIsRec);
        }).catch(err => {
            console.log('error:'+err);
        });
    }
    render(){
        
        return(
            <View style={stypes.contairn}>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({msg:'敬请期待'},() => {
                    this.Msg.show();
                })}>
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>通知设置</Text>

                         <Image source={require('../../Images/图标/收起侧边栏按钮.png')} style={stypes.rightImage}/>
                       
                    </View>
                </TouchableOpacity>
                <View style={stypes.lineView}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({msg:'请到网页绑定手机'},() => {
                    this.Msg.show();
                })}>
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>绑定手机</Text>

                         <Image source={require('../../Images/图标/收起侧边栏按钮.png')} style={stypes.rightImage}/>
                       
                    </View>
                </TouchableOpacity>
                <View style={stypes.lineView}></View>

                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    
                    storage.save({
                        key:'guestIsRec',
                        data:{
                            guestIsRec:!this.state.isRec
                        }
                    });
                    this.setState({isRec:!this.state.isRec});
                }}>
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>手势</Text>

                         <Image source={this.state.isRec?require('../../Images/图标/开关-开.png'):require('../../Images/图标/开关-关.png')} style={{marginTop:20,height:20,width:40}}/>
                       
                    </View>
                    
                </TouchableOpacity>
                {
                    this.state.isRec?
                    <TouchableOpacity activeOpacity={1} >
                        <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                            <Text style={stypes.contentText}>修改手势</Text>

                            <Image source={require('../../Images/图标/收起侧边栏按钮.png')} style={stypes.rightImage}/>
                        
                        </View>
                    </TouchableOpacity>
                    :''
                }
                <View style={stypes.lineView}></View>

                <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.navigate('LanguageView')}>
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>语言</Text>

                         <Image source={require('../../Images/图标/收起侧边栏按钮.png')} style={stypes.rightImage}/>
                       
                    </View>
                </TouchableOpacity>
                <View style={stypes.lineView}></View>

                <TouchableOpacity activeOpacity={1} >
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>版本号</Text>

                         <Text style={stypes.contentText}>1.0</Text>
                       
                    </View>
                </TouchableOpacity>

                <Msg 
                ref = {(Msg) => this.Msg = Msg}
                title = {this.state.msg}
                />
            </View>
        )
    }

}


const stypes=StyleSheet.create({
    contairn:{
        flex:1,
        backgroundColor:'rgb(27,38,45)',
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
});
