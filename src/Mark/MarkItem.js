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

const {width,height}=Dimensions.get('window');
export default class MarkHeadView extends Component{

    constructor(props){
        super(props);
        
    }
    render(){
        let {itemData} = this.props;
        let index=itemData.rate.indexOf("-");
        return(
            <View style={styles.contairn}>
                <View style={styles.contentView}>
                    <View style={styles.leftView}>
                        <View style = {{flexDirection:'row'}}>
                            <Text style={styles.BTCText}>
                                {itemData.name}
                             </Text>
                            <Text style={styles.BTCText_right}>
                                 /BTC
                             </Text>
                        </View>

                    <Text style={styles.volumeText}>
                        {itemData.number}
                    </Text>
                    </View>
                    <View style={styles.leftView}>
                    <Text style={styles.priceText}>
                            {itemData.price}
                        </Text>
                        <Text style={styles.volumePriceText}>
                            ￥{itemData.price}
                        </Text>
                    </View>
                    <View style={styles.leftView}>
                        <View style={styles.rightView}>
                            <Text style={index===-1?styles.interest:styles.interest_red}>
                                {
                                    index===-1?`+${itemData.rate}%`:`${itemData.rate}%`
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        )
    }


}


const styles=StyleSheet.create({
    contairn:{
        height:70,
    },
    contentView:{
        height:69,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    leftView:{
        
        width:width/3.0,
        
    },
    BTCText:{
        marginTop:10,
        height:30,
        lineHeight:30,
        marginLeft:20,
        color:'white'
    },
    BTCText_right:{
        marginTop:10,
        height:30,
        lineHeight:30,
        color:'rgb(196,199,201)'
    },
    volumeText:{
        fontSize:10,
        marginLeft:20,
        height:20,
        lineHeight:20,
        color:'rgb(196,199,201)'
    },
    priceText:{
        marginTop:10,
        height:30,
        lineHeight:30,
        marginLeft:20,
        color:'rgb(85,255,0)',
    },
    volumePriceText:{
        fontSize:10,
        marginLeft:20,
        height:20,
        lineHeight:20,
        color:'rgb(196,199,201)'
    },
    rightView:{
        marginLeft:20,
        marginRight:20,
        height:30,
        marginTop:20,
        borderRadius:10
    },
    interest:{
        backgroundColor:'rgb(62,107,0)',
        color:'white',
        lineHeight:30,
        textAlign:'center',
    },
    interest_red:{
        backgroundColor:'red',
        color:'white',
        lineHeight:30,
        textAlign:'center',

    }
});