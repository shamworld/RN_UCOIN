import React, { Component } from 'react';
import storage from './StorageUtil';

let userDic={};

storage.load({
    key:'userToken',

}).then(res => {
    userDic=res;
    // console.log(userDic);
}).catch(err => {
    console.log('error:'+err);
});

const Requests = {
    get:(url,isRec) => {
        return new Promise((resolve,reject)=>{
            console.log(url);
            fetch(url,{
                method: 'get',
                headers: isRec?{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':userDic.token_type+' '+userDic.access_token,
                    'X-Requested-With':'XMLHttpRequest'
                  }:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With':'XMLHttpRequest'
                  },
            })
            .then((response) => response.json())
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    post:(url,params,isRec) =>{
        //fetch请求
        console.log(url+'  ',params);
        return  new Promise((resolve,reject)=>{
            fetch(url,{
                method: 'POST',
                headers: isRec?{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;multipart/form-data;charset=utf-8',
                    'Authorization':userDic.token_type+' '+userDic.access_token,
                    'X-Requested-With':'XMLHttpRequest',
                    
                  }:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With':'XMLHttpRequest'
                  },
                body:JSON.stringify(params)
            })
                .then((response) => response.json())
                .then((responseJSON) => {
                    resolve(responseJSON);
                    
                })
                .catch((error) => {
                    reject(error);
                    console.log("error = " + error)
                });
        })
    }
}

module.exports = Requests;