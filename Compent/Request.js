import React, { Component } from 'react';

let header = {
    'Accept':'application/json',
    'Content-Type':'application/json',
    'Authorization':'Bearer def50200e4f92719be90931fbe3cee60006317845e7e6327f0c9379b6f33eb52c57d06422b314e402786ad76f83f4f0d7c12a3c21b5e34472682b715f60e7b1be54109df5701aeb1e13b227e7fc56fd0e44721f0c637177c68f16ff99a4d583652bc84d526210b985e801ae98767d2956fe25f947a6887b9bb86008b833352e855cbcc30d959407ebb2fce70547cdf9a2245723882f67fca8548d83e4e5cac34c60fc1516890c6c4e8048305aa5bb4c67aa56d567cdccbca0d9f08aa7adccaf14981311ee9694895d3ed30e16e4b54158fbc2c45c21b87f8b5e61017c2db71f439bb80ec6527f073db4bb7cd2ecfaefe43021355419b425b2bdc8707954709c0e2b16f855a4f1afd6424cef8d7021db8a182a1cb48543e5a275dbe92224fb666091b1e8d6f14f09af5b9292cced1c2c1711ac522ded5d2ae56fbaa7490dccc5899d845ff796094717804da1bf3d332147a9fadd4a5c09c97376cebc71a847bb5d4006edb4ae91dbc',
     'X-Requested-With':'XMLHttpRequest'
}


const Requests = {
    get:(url,successCallBack,failCallBack) => {
        console.log('链接地址'+url+'header'+header.Authorization);
        return fetch(url,{
            method: 'get',
            headers: header
        })
        .then((response) => response.json())
        .then((response) => {
            successCallBack(response);
        })
        .catch((error) => {
            failCallBack(error);
        })
    },
    post:(url,params,callback) =>{
        //fetch请求
        return  fetch(url,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization':'Bearer def50200e4f92719be90931fbe3cee60006317845e7e6327f0c9379b6f33eb52c57d06422b314e402786ad76f83f4f0d7c12a3c21b5e34472682b715f60e7b1be54109df5701aeb1e13b227e7fc56fd0e44721f0c637177c68f16ff99a4d583652bc84d526210b985e801ae98767d2956fe25f947a6887b9bb86008b833352e855cbcc30d959407ebb2fce70547cdf9a2245723882f67fca8548d83e4e5cac34c60fc1516890c6c4e8048305aa5bb4c67aa56d567cdccbca0d9f08aa7adccaf14981311ee9694895d3ed30e16e4b54158fbc2c45c21b87f8b5e61017c2db71f439bb80ec6527f073db4bb7cd2ecfaefe43021355419b425b2bdc8707954709c0e2b16f855a4f1afd6424cef8d7021db8a182a1cb48543e5a275dbe92224fb666091b1e8d6f14f09af5b9292cced1c2c1711ac522ded5d2ae56fbaa7490dccc5899d845ff796094717804da1bf3d332147a9fadd4a5c09c97376cebc71a847bb5d4006edb4ae91dbc',
              'X-Requested-With':'XMLHttpRequest'
            },
            body:JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            })
            .catch((error) => {
                console.log("error = " + error)
            });
    }
}

module.exports = Requests;