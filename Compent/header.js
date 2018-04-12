import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,

} from 'react-native';
const {width,height} = Dimensions.get('window');
/**
 * header组件
 * title
 * back
 */
export default class Header extends Component {
    
    _goback(){
      //alert("a")
      this.props.back.props.navigation.goBack();
    }
    render(){
        return (
            <View style={styles.header} >
            {/*返回开始*/}
              <View style={styles.headerback}>
              <TouchableOpacity
                onPress = {this._goback.bind(this)}
              > 
              <View style={{flexDirection:"row", flexWrap:'wrap',justifyContent:"center"}}>
                  <View style={{
                    width:20,
                    height:50,
                    justifyContent:"center",
                    
                  }}>
                  <Image style={{width: 13,height:18}} source = {require('../images/back.png')} />
                  </View>
                  <Text style={{lineHeight:50,color:'#fff'}}>{"返回"}</Text>
                </View>
                </TouchableOpacity>
              </View>              
              <View style={styles.headerView}>
                <Text style={{textAlign:'center',color:"#fff",fontSize:16}}>{this.props.title}</Text>
              </View>

              {/*空格便于布局无实际作用*/}
              <View style={{width: 100}}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
      header:{
        width: width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor:'rgba(0,0,0,.8)'
      },
      headerback:{
        height:height,
        width: 100,
        alignItems:"center",
        justifyContent: 'center',
      },
      headerView:{
        width: 190,    
      },
})