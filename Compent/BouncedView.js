import React, { Component } from 'react';
import {
 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput ,
  ScrollView,
  DeviceEventEmitter,
  Modal,
  ActivityIndicator,
 
} from 'react-native';
const {width,height}=Dimensions.get('window');
export default class BouncedView extends Component {


    constructor(props){
        super(props);
        this.state={
           visible:false
        }
      }

      //显示modal     
    show(){
        this.setState({visible:true});
      }
  
      //关闭modal
      hide(){
        this.setState({visible:false});
      }

      suerBtnClick(){
        this.props.suerClick();
        this.hide();
      }

      render() {
        return(
            <View  style={styles.container} >
                 <Modal
                    animationType='fade'                                  // 淡入
                    transparent={true}                                    // 透明
                    visible={this.state.visible}                          // 根据isModal决定是否显示
                    onRequestClose={() => {this.props.back&&this.setState({visible:false})}}        // android必须实现
                 > 
                    <View style={[styles.modalViewStyle,{width:180,height:40,borderRadius:5,marginLeft:width/2.0-90,marginTop:height/2.0-60,height:95}]}>
                        <Text style={{fontSize:16,color:'rgb(27,38,45)',marginTop:10,height:30,lineHeight:30}} numberOfLines={0} >{this.props.title}</Text>
                        <View style={{backgroundColor:'rgb(196,199,201)',height:1,width:180,marginTop:10}}></View>
                        <View style={{flexDirection:'row',height:30,alignItems:'center',marginTop:5,borderBottomLeftRadius:5.0,borderBottomRightRadius:5.0}}>
                            <TouchableOpacity activeOpacity={1} onPress={()=>this.suerBtnClick()}>
                                <Text style={{color:'rgb(27,38,45)',borderRightWidth:0.5,borderColor:'rgb(196,199,201)',width:90,textAlign:'center',height:40,lineHeight:40}}>确定</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={()=>this.hide()}>
                                <Text style={{color:'rgb(27,38,45)',borderLeftWidth:0.2,borderColor:'rgb(196,199,201)',width:90,textAlign:'center',height:40,lineHeight:40}}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
          );
      }
}


const styles = StyleSheet.create({

    container:{
        backgroundColor:'rgba(0,0,0,0.4)',
        
    },
    modalViewStyle:{
 
        backgroundColor:'#f5f5f5',
        borderRadius:5,
        alignItems:'center',
         paddingLeft:10,
         paddingRight:10,
      },



});


