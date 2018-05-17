import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView,
    Button,
    Image,
    Alert
}from 'react-native';
import React, { Component } from 'react';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import CollectionView from './CollectionView';
import MarkListView from './MarkListView';

const {width,height}=Dimensions.get('window');
export default class MarkView extends Component{

    constructor(props){
        super(props);
        this.state = {
            scrollList:[
                {'titile':'BTC','type':'1'},
                {'titile':'ETH','type':'2'},
                {'titile':'UT','type':'3'},
            ]
        }
    }
    componentDidMount(){
        this.props.navigation.setParams({popCollectionView:this.popCollectionView.bind(this)});
    }
    static navigationOptions = ({navigation})=>({
        headerRight:(
            <TouchableOpacity onPress = {()=>{navigation.state.params.popCollectionView()}}>
                <Image style = {{marginRight:20}} source = {require('../../Images/图标/市场收藏按钮.png')}/>
            </TouchableOpacity>
        )
    })
    popCollectionView(){
       this.props.navigation.navigate('CollectionView');
    }

    render(){

        return (
            <View style = {stypes.contains}>
                <ScrollableTabView 
                    renderTabBar = {() => <DefaultTabBar/>}
                    tabBarActiveTextColor = 'rgb(255,182,0)'
                    tabBarInactiveTextColor = 'white'
                    tabBarUnderlineStyle={{backgroundColor:'rgb(255,182,0)'}}
                    tabBarBackgroundColor = 'rgb(27,38,45)'
                    style = {{height:30}}
                >
                {
                    this.state.scrollList.map((item,i) => {
                        return (
                            <MarkListView key = {i} tabLabel = {item.titile} type = {item.type}
                                navigator = {this.props.navigator} {...this.props}/>
                        )
                    })
                }
                </ScrollableTabView>
            </View>
        );
    }

}

const stypes = StyleSheet.create({
    contains:{
        height:height,
        backgroundColor:'rgb(27,38,45)',
        flex:1
    }
});