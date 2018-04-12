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
export default class ProtectView extends Component{

    static navigationOptions = {
        title:'隐私保护'
    }

    render(){
        return(
            <View style={stypes.contian}>
                <Text numberOfLines={20} style={stypes.contentText}> 
                    UNION COIN及其附属公司(一下简称“本公司”，“我们”或“我们的”)致力于保护和尊重您的隐私。   此外，我们受“1988年隐私法”和“国家隐私原则”的约束，构成该法案的一部分。使用您的个人数据，因为我们通过我们的数字资产(不涉及法定货币)交易平台为您提供访问和实用程序服务。在提供读物的过程中，我们手机和维护个人信息。通常，我们绝对不会向任何非附属第三方披露任何哟馆客户的个人信息，除非下文所述的情况下。
                </Text>
                <Text numberOfLines={2} style={stypes.contentText}> 
                   【数据收集目的和使用】
                </Text>
                <Text numberOfLines={20} style={stypes.contentText}> 
                    U-COIN收集，处理和存储的个人数据，是通过您使用我们的服务所取得的，或者已经获得了您的同意。这些个人数据可能包括联系方式或与您的设备或互联网服务先关的任何信息(如IP地址和MAC号码)。U-COIN使用个人数据与您沟通，并管理、履行、改进以及为您制定个性化服务。U-COIN还可以从我们收集的任何和人数据中生成通用数据，并将其用于我们自己的目的。我们还可以使用这些数据与您就U-COIN或其合作伙伴提供的其它产品或服务。
                </Text>
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
    contentText:{
        marginLeft:15,
        marginRight:15,
        color:'rgb(196,199,201)',
        marginTop:20,
        
    }
});