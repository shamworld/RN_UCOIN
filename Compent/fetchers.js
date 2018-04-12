/**基于fetch封装的网络请求工具类**/

import {  Component} from "react";

/**
 * fetch网络请求的header，可自定义header内容
 * @type{{Accept: string, Content-Type: string, accessToken: *}}
 */

let header = {
    'Accept':'application/json',
    'Content-Type':'application/json',
}

/**
 * Get请求时，拼接请求URL
 * 
*/

const handleUrl = url => params => {
    if(params){
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])));
       if(url.search(/\?/) === -1){
           typeof(params) === 'object' ?url += '?' +paramsArray.join('&'):url
       }else{
           url += '&' + paramsArray.join('&');
       }
    }

    return url;
}


/**
 * fetch网络请求超时处理
 * 
*/


const timeoutFetch = (original_fetch, timeout = 30000) => {
    let timeoutBlock = () => {}
    let timeout_primise = new Promise((resolve,reject) => {
        timeoutBlock = () => {
            //请求超时处理
            reject('timeout promise')
        }
    })

    //Promise.race(iterable)方法返回一个promise
    //这个promise在iterable中的任意一个promise被解决或者拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因拒绝
    let abortable_promise = Promise.race({
        original_fetch,
        timeout_primise
    })

    setTimeout(() => {
        timeoutBlock()
        },timeout)

        return abortable_promise;
}

//网络请求工具类

export default class HttpUtils extends Component{
   /**
    * 基于fetch封装的get请求
   */

    static getRequest = (url,params = {}) => {
        return timeoutFetch(fetch(handleUrl(url)(params),{
            method:'GET',
            headers:header
        })).then(response => {
            if(response.ok){
                return response.json();
            }else{
                alert(response);
            }
        }).then(response => {
            // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
            if(response){
                return response;
            }else{
                // 非 200，错误处理
                return response;
            }
        }).catch(error => {
            alert(error);
        })
    }
    /**
     * 基于fetch封装的post请求
    */
   static postRequest = (url,params = {}) => {
       return timeoutFetch(fetch(url,{
           method:'POST',
           header:header,
           body:JSON.stringify(params)
       })).then(response => {
        if(response.ok){
            return response.json();
        }else{
            alert('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
    }).then(response => {
        // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
        if(response){
            return response;
        }else{
            // 非 200，错误处理
            return response;
        }
    }).catch(error => {
        alert(error);
    }) 
   }


}









