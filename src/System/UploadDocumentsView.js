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
    ScrollView,
    Platform,

    
}from 'react-native';
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker'; //第三方相机
import Load from '../../Compent/loading';
import Config from '../../Compent/config';
import Request from '../../Compent/Request';
import storage from '../../Compent/StorageUtil';

const {width,height}=Dimensions.get('window');


let userDic={};
export default class UploadDocumentsView extends Component{
    static navigationOptions = {
        title:'上传证件照',
        
    }
    constructor(props){
        super(props);
        this.state={
            faceImg:'',
            reverseImg:'',
            handheldImg:'',
            faceUrl:'',
            reverseUrl:'',
            handheldUrl:'',
            loadText:'',
            type:0,
        }
    }
    componentDidMount(){
        

        storage.load({
            key:'userToken',

        }).then(res => {
            userDic=res;
            // console.log(userDic);
        }).catch(err => {
            console.log('error:'+err);
        });
    }
    sureBtnClick(){
        this.props.navigation.navigate('CertificationSucView',{statues:0});
    }
    pushPickture(type){
        var options={
            //底部弹出框选项
            title:'请选择',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'相册',
            quality:0.75,
            allowsEditing:true,
            noData:false,
            storageOptions: {
                skipBackup: true,
                path:'images'
            }
        }
        /**
         * showImagePicker:弹出相册和相机
         * launchCamera:弹出相机
         * launchImageLibrary:弹出相册
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
          
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              type==1?this.setState({faceImg: source}):type==2?this.setState({reverseImg: source}):this.setState({handheldImg: source})
              let file='';
              if(Platform.OS === 'android'){
                    file = response.uri
                }else {
                    file = response.uri.replace('file://', '')
                }
              this.requestImageWithUrl(type,file);
            }
          });
    }

   async requestImageWithUrl(type,data){
        let formData=new FormData();//如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
        let date=new Date();
        formData.append('file',{uri: data, type: 'image/jpeg', name: '5234.jpg'});

     await fetch(Config.api.homeList+'v2/services/fileUpload',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization':userDic.token_type+' '+userDic.access_token,
                'X-Requested-With':'XMLHttpRequest',
                
                },
            body:formData
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                type==1?this.setState({faceUrl:data.data}):type==2?this.setState({reverseUrl:data.data}):this.setState({handheldUrl:data.data})
                
            })
            .catch((error) => {
                
                console.log("error = " + error)
            });

    //    await Request.post(Config.api.homeList+'v2/services/fileUpload',formData,true).then((data) => {
    //         console.log(data);
            
    //         if(data.code==0){
                
                
                
    //         }else if (data.code==9001){
    //             this.setState({loadText:data.msg,type:3},()=>{
    //                 this.Load.show();
                    
    //             });
    //             // this.props.toLogin();
    //         }else{
    //             this.setState({loadText:data.msg,type:3},()=>{
    //                 this.Load.show();
    //             });
               
    //         }
    //         },(error) =>{
    //              console.log('错误信息'+error);
                 
    //          })
                

    }

    render(){
        return(
            <View style={stypes.contairn}>
                <ScrollView>
                <Text style={stypes.titleText}>正面照</Text>
                <Text style={stypes.contentText}>请确保内容完整并清晰可见，资质文件平台方可见，仅支持JPG格式图片</Text>
                <TouchableOpacity onPress={()=>this.pushPickture(1)}>
                    <ImageBackground style={stypes.backgrounImage} source={this.state.faceImg}>
                        <Image style={stypes.addImage} source={require('../../Images/图标/上传证件照.png')}/>
                    </ImageBackground>
                </TouchableOpacity>

                <Text style={stypes.titleText}>反面照</Text>
                <Text style={stypes.contentText}>请确保内容完整并清晰可见，资质文件平台方可见，仅支持JPG格式图片</Text>
                <TouchableOpacity onPress={()=>this.pushPickture(2)}>
                    <ImageBackground style={stypes.backgrounImage} source={this.state.reverseImg}>
                        <Image style={stypes.addImage} source={require('../../Images/图标/上传证件照.png')}/>
                    </ImageBackground>
                </TouchableOpacity>

                <Text style={stypes.titleText}>手持身份证照</Text>
                <Text style={stypes.contentText}>请您上传一张手持身份证正面照和个人签字的照片，个人签字的内容包含“U-COIN”和今天的日期。请确保照片和个人签字的内容清晰可见，仅支持JPG格式图片</Text>
                <TouchableOpacity onPress={()=>this.pushPickture(3)}>
                    <ImageBackground style={stypes.backgrounImage} source={this.state.handheldImg}>
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
                <Load 
                ref = {(Load) => this.Load = Load}
                title = {this.state.loadText}
                type = {this.state.type}
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