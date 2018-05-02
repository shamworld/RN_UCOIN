import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Image,
    Keyboard,
    TextInput,
}from 'react-native';
import React, { Component } from 'react';
import Msg from '../../Compent/LoadingMsg';

const {width,height}=Dimensions.get('window');
export default class ProveView extends Component{
    static navigationOptions = {
        title:'身份认证'
    }
    constructor(props){
        super(props);
        this.state = {
            selectBtn:true,
            msg:'',
            firstName:'',
            lastName:'',
            proveCode:'',
            foreignFistName:'',
            foreignLastName:'',
            foreignSex:'',
            foreignCountryName:'',
            foreignProveCode:'',
            isRecSex:true,
        }
    }

    chinaView(){
        return (
            <View>
                <TouchableOpacity activeOpacity = {1} onPress = {() => {Keyboard.dismiss()}}>
                    <Text style = {stypes.nameLabel}>姓氏:</Text>
                    <TextInput 
                            value = {this.state.firstName}
                            onChangeText = {(text) => this.setState({firstName:text})}
                            style = {stypes.nameInput}
                    />
                    <Text style = {stypes.nameLabel}>名字:</Text>
                    <TextInput 
                            value = {this.state.lastName}
                            onChangeText = {(text) => this.setState({lastName:text})}
                            style = {stypes.nameInput}
                    />
                    <Text style = {stypes.nameLabel}>有效身份证号码:</Text>
                    <TextInput 
                            value = {this.state.proveCode}
                            onChangeText = {(text) => this.setState({proveCode:text})}
                            style = {stypes.nameInput}
                    />
                    <View style={{marginTop:40,height:35}}>
                        <TouchableOpacity activeOpacity = {1} onPress = {() => this.chinaSuerBtnClick()}>
                            <Text style={stypes.suerBtn}>上传证件照</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            
            </View>
            
        )
    }
    chinaSuerBtnClick(){
        let err='';
        if(this.state.firstName==''){
            err='请输入姓氏';
        }else if(this.state.lastName==''){
            err='请输入名字';
        }else if(this.state.proveCode==''){
            err='请输入有效身份证号码';
        }

        if(err!=''){
            this.setState({msg:err},() => {
                this.Msg.show();
            })

            return ;
        }
        this.props.navigation.navigate('UploadDocumentsView');
    }
    otherCountriesSuerBtnClick(){
        let err='';
        if(this.state.foreignFistName==''){
            err='请输入姓氏';
        }else if(this.state.foreignLastName==''){
            err='请输入名字';
        }else if(this.state.foreignCountryName==''){
            err='请选择国家';
        }else if(this.state.foreignProveCode==''){
            err='请输入有效身份证号码';
        }

        if(err!=''){
            this.setState({msg:err},() => {
                this.Msg.show();
            })

            return ;
        }
        this.props.navigation.navigate('UploadDocumentsView');
    }
    otherCountriesView(){
        return (
           <View>
            <TouchableOpacity activeOpacity = {1} onPress = {() => {Keyboard.dismiss()}}>
                <Text style = {stypes.nameLabel}>姓氏:</Text>
                <TextInput 
                        value = {this.state.foreignFistName}
                        onChangeText = {(text) => this.setState({foreignFistName:text})}
                        style = {stypes.nameInput}
                />
                <Text style = {stypes.nameLabel}>名字:</Text>
                <TextInput 
                        value = {this.state.foreignLastName}
                        onChangeText = {(text) => this.setState({foreignLastName:text})}
                        style = {stypes.nameInput}
                />

                <Text style = {stypes.nameLabel}>性别:</Text>
                <View style={{marginTop:15,flexDirection:'row',paddingRight:15}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({isRecSex:true})}>
                    <Image source={this.state.isRecSex?require('../../Images/图标/对勾.png'):''} style={stypes.sexImage}/>
                    </TouchableOpacity>
                    <Text style = {stypes.sexText}>男</Text>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({isRecSex:true})}>
                    <Image source={this.state.isRecSex?'':require('../../Images/图标/对勾.png')} style={stypes.sexImage}/>
                    </TouchableOpacity>
                    <Text style = {stypes.sexText}>女</Text>
                </View>
                <Text style = {[stypes.nameLabel,{marginTop:15}]}>国家及地区:</Text>
                <View style={[stypes.nameInput,{flexDirection:'row',justifyContent:'space-between'}]}>
                    <Text style={{color:'white',lineHeight:35}}>{this.state.foreignCountryName}</Text>
                    <Image source={require('../../Images/图标/下拉.png')} style={{width:10,height:10,marginTop:10,marginRight:10}}/>
                </View>

                <Text style = {stypes.nameLabel}>护照ID:</Text>
                <TextInput 
                        value = {this.state.foreignProveCode}
                        onChangeText = {(text) => this.setState({foreignProveCode:text})}
                        style = {stypes.nameInput}
                />
                <View style={{marginTop:40,height:35}}>
                    <TouchableOpacity activeOpacity = {1} onPress = {() => this.otherCountriesSuerBtnClick()}>
                        <Text style={stypes.suerBtn}>上传证件照</Text>
                    </TouchableOpacity>
                </View>
        </TouchableOpacity>
        
        </View>
        )
    }
    render(){
        return(
            <View style={stypes.contairn}>
                <View style={[stypes.contentView,{height:30,backgroundColor:'rgb(38,54,64)'}]}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({selectBtn:true})}>
                    <Text style={this.state.selectBtn?stypes.headSelectText:stypes.headText}>中国大陆地区</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({selectBtn:false})}>
                    <Text style={this.state.selectBtn?stypes.headText:stypes.headSelectText}>其它国家及地区</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{backgroundColor:'rgb(255,182,0)',height:2,width:width/2.0,marginLeft:this.state.selectBtn?0:width/2.0}}></View>
                    {
                        this.state.selectBtn?
                        this.chinaView()
                        :
                        this.otherCountriesView()
                    }
                <Msg ref = {(Msg) => this.Msg = Msg} title = {this.state.msg}/>
            </View>
        )
    }

}


const stypes=StyleSheet.create({
    contairn:{
        flex:1,
        backgroundColor:'rgb(27,38,45)',
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
    },
    nameLabel:{
        marginTop:10,
        color:'rgb(196,199,201)',
        fontSize:14,
        marginLeft:20,
        height:20,
        lineHeight:20,
        textAlign:'left',
    },
    nameInput:{
        marginTop:5,
        marginLeft:20,
        marginRight:20,
        backgroundColor:'rgb(38,54,64)',
        borderWidth:1,
        height:35,
        borderColor:'rgb(56,73,82)',
        color:'#fff',
    },
    suerBtn:{
        marginLeft:20,
        marginRight:20,
        textAlign:'center',
        color:'rgb(255,182,0)',
        borderColor:'rgb(255,182,0)',
        borderWidth:1,
        lineHeight:35,
    },
    sexText:{
        marginTop:10,
        color:'rgb(196,199,201)',
        fontSize:14,
        height:20,
        lineHeight:20,
        marginLeft:10
    },
    sexImage:{
        marginTop:10,
        width:20,
        height:20,
        borderWidth:1,
        marginLeft:20,
        borderColor:'rgb(38,54,64)'
    }
});
