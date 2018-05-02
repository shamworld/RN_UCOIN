import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    StyleSheet,
    TextInput,
    Keyboard,
    
} from 'react-native';
import {NavigationActions} from 'react-navigation';


const {width,height}=Dimensions.get('window');
export default class ResetSucessView extends Component{
    constructor(props){
        super(props);
        
    }

    static navigationOptions = {
        header:null,
    }
    emailCodeClick(){
        const resetAction = NavigationActions.reset({//重置导航为login
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'LoginView'}),
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render(){
        let isRec = this.props.navigation.state.params.isRec;

        return(
            <View style={stypes.contian}>
                <Text style={stypes.headerText}>重置成功</Text>
                <Image source={require('../../Images/图标/成功提示图标.png')} style={stypes.imageIcon} resizeMode='center'/>
                <Text style = {stypes.validationText}>{isRec?`邮件已发送至${this.props.navigation.state.params.email}`:'密码重置成功,立即登录'}</Text>
                <Text style={stypes.contentText}>{isRec?'请前往邮箱激活账户，否则将无法正常登陆':''}</Text>
                <TouchableOpacity activeOpacity = {1} onPress = {() => this.emailCodeClick()}>
                    <Text style={stypes.emailCodeText}>确定</Text>
                </TouchableOpacity>
            </View>
        )
    }

}


const stypes=StyleSheet.create({

    contian:{
        flex:1,
        height:height,
        backgroundColor:'rgb(27,39,45)',
    },
    headerText:{
        marginTop:20,
        height:44,
        lineHeight:44,
        textAlign:'center',
        width:width,
        color:'rgb(196,199,201)'
    },
    imageIcon:{
        marginTop:64,
        marginLeft:width/2.0-40,
        width:80,
        height:80,
    },
    validationText:{
        marginTop:5,
        marginLeft:0,
        marginRight:0,
        textAlign:'center',
        height:20,
        lineHeight:20,
        color:'#fff',
        fontSize:14
    },
    contentText:{
        marginTop:5,
        marginLeft:25,
        marginRight:25,
        textAlign:'center',
        color:'rgb(255,182,0)',
        fontSize:14,
    },
    emailCodeText:{
        marginTop:50,
        marginLeft:50,
        marginRight:50,
        height:35,
        borderWidth:1,
        borderColor:'rgb(255,182,0)',
        lineHeight:35,
        textAlign:'center',
        color:'rgb(255,182,0)'
    }
});