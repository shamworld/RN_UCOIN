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

import Msg from '../../Compent/LoadingMsg';

const {width,height}=Dimensions.get('window');
export default class EmailTextView extends Component{

    static navigationOptions = {
        title:'邮箱验证',
        cardStack:{
            gesturesEnabled:false,
        },
    }

    render(){
        return(
            <View style={stypes.contian}>
                <Text stype={{color:'#fff'}}>{this.props.email}</Text>
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
    
});