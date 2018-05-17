import React, { Component } from 'react';
  import {
      View,
      Text,
      StyleSheet,
      ActivityIndicator
  } from 'react-native';
  class LoadMoreFooter extends Component {
      constructor(props) {
          super(props);
      }
      render() {
          return (
              <View style={styles.footer}>
              {
                this.props.isLoadAll?'':<ActivityIndicator animating={true}   color={"#666666"} size="small" />
              }
                 
                  <Text style={styles.footerTitle}>{this.props.isLoadAll ? '已加载全部' : '正在加载更多...'}</Text>
              </View>
          )
      }
  }
  const styles = StyleSheet.create({
      footer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
      },
      footerTitle: {
          marginLeft: 10,
          fontSize: 15,
          color: 'gray'
      }
  })
  
  export default LoadMoreFooter