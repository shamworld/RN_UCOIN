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
import storage from '../../Compent/StorageUtil';

const {width,height}=Dimensions.get('window');
export default class LanguageView extends Component{
    static navigationOptions = {
        title:'语言'
    }
    constructor(props){
        super(props);
        this.state={
            isRec:false,
        }
        
    }

    componentWillMount(){
        storage.load({
            key:'languageIsRec',

        }).then(res => {
            this.setState({isRec:res.languageIsRec})
            console.log('数据为:'+res.languageIsRec);
        }).catch(err => {
            console.log('error:'+err);
        });
    }
    
    render(){
        return(
            <View style={stypes.contairn}>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    this.setState({isRec:false});
                    storage.save({
                        key:'languageIsRec',
                        data:{
                            languageIsRec:false
                        }
                    });
                    
                }}>
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>中文</Text>

                        {
                            this.state.isRec?'':<Image source={require('../../Images/图标/对勾.png')} style={stypes.rightImage}/>
                        }
                    
                    </View>
                </TouchableOpacity>
                <View style={stypes.lineView}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    this.setState({isRec:true});
                    storage.save({
                        key:'languageIsRec',
                        data:{
                            languageIsRec:true
                        }
                    });
                    
                }}>
                    <View style={{flexDirection:'row',marginLeft:20,height:60,marginRight:20,justifyContent:'space-between'}}>
                        <Text style={stypes.contentText}>英文</Text>

                        {
                            this.state.isRec?<Image source={require('../../Images/图标/对勾.png')} style={stypes.rightImage}/>:''
                        }
                    
                    </View>
                </TouchableOpacity>
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
        width:20,
        height:20,
        marginTop:20
    },
});
