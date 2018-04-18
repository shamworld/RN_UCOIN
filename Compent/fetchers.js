/**基于fetch封装的网络请求工具类**/

import {  Component} from "react";

/**
 * fetch网络请求的header，可自定义header内容
 * @type{{Accept: string, Content-Type: string, accessToken: *}}
 */

let header = {
    'Accept':'application/json',
    'Content-Type':'application/json',
    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRkODJjODAyOWM3MGZkOGVlZTZhMmQyMGI3M2JhNGY1ZmQzOGNjY2JmMGE4MDVkMjk2ZGYxNWJkZDcyZmZhMzNmYzQyMDhmMmFkZmYxNzU4In0.eyJhdWQiOiI4IiwianRpIjoiNGQ4MmM4MDI5YzcwZmQ4ZWVlNmEyZDIwYjczYmE0ZjVmZDM4Y2NjYmYwYTgwNWQyOTZkZjE1YmRkNzJmZmEzM2ZjNDIwOGYyYWRmZjE3NTgiLCJpYXQiOjE1MjQwMzA0NzYsIm5iZiI6MTUyNDAzMDQ3NiwiZXhwIjoxNTI1MzI2NDc2LCJzdWIiOiI2NDk5NiIsInNjb3BlcyI6WyIqIl19.z6Eq-wEqAot3CzvUG-YvxtkH2qcQEvJpxpShGUqEeyVFnDnUjwqhGQgYumSg3A32rZwYpRp5L3fFnDN5oqi5lfHkfdHurgUMIvYRWuOsRZNLyRjqv0hK6EvmWi2CUDxkQEFGpfj5z_NXar4MIyz4dTMVhyai_xrWkQWygTRq1tk67g47nov-St5b4p6UVOeIwPWf5jrRYt2H29UigN6Xb5iwHsW2HHAkWEi0yndkCuNYa5kOuLuLcq6ubih25O0RC7irhfuL0yMn9r8qFJxOPxtqS6DFisX7M-VrEFoZtUsIE0q6NHpuvTsjwDOBZBTwxHDnsu_ReovSJpWyQhDzpURQU-kBUy2PZfGyBFKICS3qPV7DdVGaDEbFt19k-QRtP1D90uIpuNShONP6IrjeYTnvfz-iXE3kd0hLy5RuQXW7sCalGSBeg3x-43CHQqiz1Vl1q8fg6wawBg-vPZbtSafbn2S_5zexZuV8YcP4DtttUxx6gi22dF8t5od6x6nI0ZJeJSAEmd1xmbJACYchcH8py2rpbMDrhikKXoP7yE_AnDx5oplWfUV-JTLNeEmfvN7wbDw_0yi8Yt33UwNLSgmId3O5lWf0Wcl2tsD4aUH7giCj2ahKVU72KnQD6z8EEXD9kfsbuOqxFW9vPJM6FhXVFIcrLZ9KOe8FoQiQvy0',
     'X-Requested-With':'XMLHttpRequest'
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
        console.log('+++'+abortable_promise.original_fetch);
        return abortable_promise;
}

//网络请求工具类

export default class HttpUtils extends Component{
   /**
    * 基于fetch封装的get请求
   */

    static getRequest = (url,params = {}) => {
        console.log('url---'+url+'params---'+params);
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
           headers:header,
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









