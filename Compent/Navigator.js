import React, { Component } from 'react';

import {
    Image
} from 'react-native';
import  {
    TabNavigator,
    TabBarBottom,
    StackNavigator
} from 'react-navigation';
import BaseTabbar from './BaseTabbar';
import MarkView from '../src/Mark/MarkView';
import TradingView from '../src/Trading/TradingView';
import AssetView from '../src/Asset/AssetView';
import SystemView from '../src/System/SystemView';
import LoginView from '../src/Login/LoginView';
import RegisterView from '../src/Login/RegisterView';
import ProtectView from '../src/Login/ProtectView';
import ForgetPWDView from '../src/Login/ForgetPWDView';
import EmailTextView from '../src/Login/EmailTextView';
import ResetPWDView from '../src/Login/ResetPWDView';
import ResetSucessView from '../src/Login/ResetSucessView';
import CollectionView from '../src/Mark/CollectionView';
import MyClinchView from '../src/Trading/MyClinchView';
import RechargeView from '../src/Asset/RechargeView';
import DrawalView from '../src/Asset/DrawalView';
import RecordView from '../src/Asset/RecordView';
import AddAddressView from '../src/Asset/AddAddressView';
import AddressListView from '../src/Asset/AddressListView';
import SafeConfirmView from '../src/Asset/SafeConfirmView';
import ChangeLoginPWDView from '../src/System/ChangeLoginPWDView';
import ProveView from '../src/System/ProveView';
import SettingView from '../src/System/SettingView';
import LanguageView from '../src/System/LanguageView';
import UploadDocumentsView from '../src/System/UploadDocumentsView';
import CertificationSucView from '../src/System/CertificationSucView';
import CertificationErrorView from '../src/System/CertificationErrorView';


/**
 * CardStackStyleInterpolator
 * forHorizontal:从右向左进入、forVertical:从下向上进入、forFadeFromBottomAndroid:从底部淡出
 */
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';


/*设置页面的动画效果*/
const TransitionConfiguration = () =>({
    screenInterpolator:(sceneProps) =>{
        const {scene} = sceneProps;
        const {route} = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
    }
});

const Tap = TabNavigator(
    {
        MarkView:{
            screen:MarkView,
            navigationOptions:() => ({
                tabBarLabel:'市场',
                title:'市场',
                tabBarIcon:({focused,tintColor}) => (
                    <BaseTabbar
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../Images/图标/市场当前.png')}
                        selectedImage={require('../Images/图标/市场.png')}
                    />
                )
            })
        },
        TradingView:{
            screen:TradingView,
            navigationOptions:() => ({
                tabBarLabel:'交易',
                title:'交易',
                tabBarIcon:({focused,tintColor}) => (
                    <BaseTabbar
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../Images/图标/交易当前.png')}
                        selectedImage={require('../Images/图标/交易.png')}
                    />
                )
            })
        },
        AssetView:{
            screen:AssetView,
            navigationOptions:() => ({
                tabBarLabel:'资产',
                title:'资产',
                tabBarIcon:({focused,tintColor}) => (
                    <BaseTabbar
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../Images/图标/资产当前.png')}
                        selectedImage={require('../Images/图标/资产.png')}
                    />
                )
            })
        },
        SystemView:{
            screen:SystemView,
            navigationOptions:() => ({
                tabBarLabel:'我的',
                title:'我的',
                tabBarIcon:({focused,tintColor}) => (
                    <BaseTabbar
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../Images/图标/我的当前.png')}
                        selectedImage={require('../Images/图标/我的.png')}
                    />
                )
            })
        }
    },
    {
        tabBarComponent:TabBarBottom,//用作标签栏的组件
        tabBarPosition:'bottom',//显示在底部，android默认是在页面的顶端
        swipeEnabled:false,//是否左右滑动
        animationEnabled:false,//切换页面时不显示动画
        backBehavior:'none',//按back键是否跳转到第一个tab
        lazy:true,//懒加载
        tabBarOptions:{
            activeTintColor:'rgb(255,182,0)',
            inactiveTintColor:'#ffffff',//未选中的颜色
            style:{
                backgroundColor:'rgb(38,54,64)'
            },
            labelStyle:{
                fontSize:10
            }
        }
    }
)


const Navigator = StackNavigator(
    {
        //页面的注册，任何界面都要注册
        MarkView:{screen:Tap},
        LoginView:{screen:LoginView},
        RegisterView:{screen:RegisterView},
        ProtectView:{screen:ProtectView},
        ForgetPWDView:{screen:ForgetPWDView},
        EmailTextView:{screen:EmailTextView},
        ResetPWDView:{screen:ResetPWDView},
        ResetSucessView:{screen:ResetSucessView},
        CollectionView:{screen:CollectionView},
        MyClinchView:{screen:MyClinchView},
        DrawalView:{screen:DrawalView},
        RechargeView:{screen:RechargeView},
        RecordView:{screen:RecordView},
        AddAddressView:{screen:AddAddressView},
        AddressListView:{screen:AddressListView},
        SafeConfirmView:{screen:SafeConfirmView},
        ChangeLoginPWDView:{screen:ChangeLoginPWDView},
        ProveView:{screen:ProveView},
        SettingView:{screen:SettingView},
        LanguageView:{screen:LanguageView},
        UploadDocumentsView:{screen:UploadDocumentsView},
        CertificationSucView:{screen:CertificationSucView},
        CertificationErrorView:{screen:CertificationErrorView},
    },
    {
        navigationOptions:{
            cardStack:{
                //配置card stack
                gesturesEnabled:true//是否允许右键返回，在iOS上默认为true，在Android上默认为false

            },
            headerBackTitle:null,
            headerStyle:{
                backgroundColor:'rgb(38,54,64)'//导航背景色
            },
            headerTintColor:'rgb(196,199,201)',//导航字的颜色
            
        },
        initialRouteName:'LoginView',//默认显示界面
        transitionConfig:TransitionConfiguration,//页面动画
        onTransitionStart:()=>{ console.log('导航栏切换开始'); },  // 回调
        onTransitionEnd: ()=>{ console.log('导航栏切换结束'); },  // 回调
        headerMode:'float',//导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    }
)


export default class Nav extends Component{

    /*构造函数*/
      constructor(props) {
        super(props);
        this.state = {
           
        };
        
      }
       
      render(){
        return(
           <Navigator />
          )
      }
  }







