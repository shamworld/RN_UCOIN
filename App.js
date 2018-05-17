/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Nav from './Compent/Navigator';
import storage from './Compent/StorageUtil';
import LoginView from './src/Login/LoginView';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      access_token:''
    }
    
  }
  async componentWillMount(){
   await  storage.load({
      key:'userToken',

    }).then(res => {
        this.setState({access_token:res.access_token});
        console.log(res.access_token+'111');
    }).catch(err => {
        console.log('error:'+err);
    })
  }
  render() {
    

    if(this.state.access_token==''){
        return ( 
            <LoginView /> 
          ); 
    }else{
        return (
          
          <Nav>
          </Nav>
      );
    }
    
  }
}
