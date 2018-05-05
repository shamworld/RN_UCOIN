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
  ActivityIndicator
} from 'react-native';

export default class Modals extends Component {
   /* props定义 */
    // static defaultProps = {
    //    title : '',  //标题
    //    width:240 ,  // 组件宽度
    //    height:50 , //组件高度
    //    back:true ,  // back返回关闭
    //    touch:true  // 触摸关闭
    // }
    constructor(props){
      super(props);
      this.state={
         visible:false
      }
    }
    //显示modal     
    show(){
      this.setState({visible:true});
      if(this.props.type!=1||this.props.type!=2){
        setTimeout(() => {
          this.hide();
      }, 2000);
      }
    }
    //关闭modal
    hide(){
      this.setState({visible:false});
    }
    render() {
      return(
              <Modal
                  animationType='fade'                                  // 淡入
                  transparent={true}                                    // 透明
                  visible={this.state.visible}                          // 根据isModal决定是否显示
                  onRequestClose={() => {!this.props.back&&this.setState({visible:false})}}        // android必须实现
                > 
                <TouchableOpacity  onPress={()=>{this.props.touch&&this.setState({visible:false})}} activeOpacity={1} style={styles.Modalcontainer}>
                    <View style={[styles.modalViewStyle,{padding:20}]}>
                      {this.props.type==1?<Image 
                        style={{width:30,height:30}} 
                      source={require('../Images/图标/yes.png')} 
                      resizeMode={'contain'}/>:this.props.type==2?<ActivityIndicator animating={true}   color={"#666666"} size="large" />:''}
                        <Text style={{fontSize:14,color:'#181818'}} >{this.props.title || '加载中...'}</Text>
                      </View>
                </TouchableOpacity >
              </Modal>
         
        );
    }   
}

const styles = StyleSheet.create({

modalViewStyle:{
  backgroundColor:'#f5f5f5',
  borderRadius:5,
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
},
Modalcontainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems:'center',
  backgroundColor:'rgba(0, 0, 0, 0.5)',
} 
});


