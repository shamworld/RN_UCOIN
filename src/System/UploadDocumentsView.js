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
    ImageBackground,
    ScrollView
}from 'react-native';
import React, { Component } from 'react';
import Msg from '../../Compent/LoadingMsg';

const {width,height}=Dimensions.get('window');
export default class UploadDocumentsView extends Component{
    static navigationOptions = {
        title:'上传证件照'
    }

    sureBtnClick(){
        this.props.navigation.navigate('CertificationSucView',{statues:0});
    }

    render(){
        return(
            <View style={stypes.contairn}>
                <ScrollView>
                <Text style={stypes.titleText}>正面照</Text>
                <Text style={stypes.contentText}>请确保内容完整并清晰可见，资质文件平台方可见，仅支持JPG格式图片</Text>
                <TouchableOpacity>
                    <ImageBackground style={stypes.backgrounImage}>
                        <Image style={stypes.addImage} source={require('../../Images/图标/上传证件照.png')}/>
                    </ImageBackground>
                </TouchableOpacity>

                <Text style={stypes.titleText}>反面照</Text>
                <Text style={stypes.contentText}>请确保内容完整并清晰可见，资质文件平台方可见，仅支持JPG格式图片</Text>
                <TouchableOpacity>
                    <ImageBackground style={stypes.backgrounImage}>
                        <Image style={stypes.addImage} source={require('../../Images/图标/上传证件照.png')}/>
                    </ImageBackground>
                </TouchableOpacity>

                <Text style={stypes.titleText}>手持身份证照</Text>
                <Text style={stypes.contentText}>请您上传一张手持身份证正面照和个人签字的照片，个人签字的内容包含“U-COIN”和今天的日期。请确保照片和个人签字的内容清晰可见，仅支持JPG格式图片</Text>
                <TouchableOpacity>
                    <ImageBackground style={stypes.backgrounImage}>
                        <Image style={stypes.addImage} source={require('../../Images/图标/上传证件照.png')}/>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={{marginTop:40,height:35}}>
                    <TouchableOpacity activeOpacity = {1} onPress={()=>this.sureBtnClick()}>
                        <Text style={stypes.suerBtn}>提交</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:50}}>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const stypes=StyleSheet.create({
    contairn:{
        flex:1,
        backgroundColor:'rgb(27,38,45)',
    },
    titleText:{
        marginTop:10,
        marginLeft:20,
        marginRight:20,
        fontSize:14,
        color:'rgb(196,199,201)',
    },
    contentText:{
        marginTop:10,
        marginLeft:20,
        marginRight:20,
        fontSize:10,
        color:'rgb(196,199,201)',
    },
    backgrounImage:{
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        height:214,
        backgroundColor:'rgb(32,44,51)',
    },
    addImage:{
        height:60,
        width:60,
        marginLeft:width/2.0-50,
        marginTop:107-30
    },
    suerBtn:{
        marginLeft:20,
        marginRight:20,
        textAlign:'center',
        color:'rgb(255,182,0)',
        borderColor:'rgb(255,182,0)',
        borderWidth:1,
        lineHeight:35,
    }

});