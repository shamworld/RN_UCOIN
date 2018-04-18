import React, { Component } from 'react';

let header = {
    'Accept':'application/json',
    'Content-Type':'application/json',
    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRkODJjODAyOWM3MGZkOGVlZTZhMmQyMGI3M2JhNGY1ZmQzOGNjY2JmMGE4MDVkMjk2ZGYxNWJkZDcyZmZhMzNmYzQyMDhmMmFkZmYxNzU4In0.eyJhdWQiOiI4IiwianRpIjoiNGQ4MmM4MDI5YzcwZmQ4ZWVlNmEyZDIwYjczYmE0ZjVmZDM4Y2NjYmYwYTgwNWQyOTZkZjE1YmRkNzJmZmEzM2ZjNDIwOGYyYWRmZjE3NTgiLCJpYXQiOjE1MjQwMzA0NzYsIm5iZiI6MTUyNDAzMDQ3NiwiZXhwIjoxNTI1MzI2NDc2LCJzdWIiOiI2NDk5NiIsInNjb3BlcyI6WyIqIl19.z6Eq-wEqAot3CzvUG-YvxtkH2qcQEvJpxpShGUqEeyVFnDnUjwqhGQgYumSg3A32rZwYpRp5L3fFnDN5oqi5lfHkfdHurgUMIvYRWuOsRZNLyRjqv0hK6EvmWi2CUDxkQEFGpfj5z_NXar4MIyz4dTMVhyai_xrWkQWygTRq1tk67g47nov-St5b4p6UVOeIwPWf5jrRYt2H29UigN6Xb5iwHsW2HHAkWEi0yndkCuNYa5kOuLuLcq6ubih25O0RC7irhfuL0yMn9r8qFJxOPxtqS6DFisX7M-VrEFoZtUsIE0q6NHpuvTsjwDOBZBTwxHDnsu_ReovSJpWyQhDzpURQU-kBUy2PZfGyBFKICS3qPV7DdVGaDEbFt19k-QRtP1D90uIpuNShONP6IrjeYTnvfz-iXE3kd0hLy5RuQXW7sCalGSBeg3x-43CHQqiz1Vl1q8fg6wawBg-vPZbtSafbn2S_5zexZuV8YcP4DtttUxx6gi22dF8t5od6x6nI0ZJeJSAEmd1xmbJACYchcH8py2rpbMDrhikKXoP7yE_AnDx5oplWfUV-JTLNeEmfvN7wbDw_0yi8Yt33UwNLSgmId3O5lWf0Wcl2tsD4aUH7giCj2ahKVU72KnQD6z8EEXD9kfsbuOqxFW9vPJM6FhXVFIcrLZ9KOe8FoQiQvy0',
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
              'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRkODJjODAyOWM3MGZkOGVlZTZhMmQyMGI3M2JhNGY1ZmQzOGNjY2JmMGE4MDVkMjk2ZGYxNWJkZDcyZmZhMzNmYzQyMDhmMmFkZmYxNzU4In0.eyJhdWQiOiI4IiwianRpIjoiNGQ4MmM4MDI5YzcwZmQ4ZWVlNmEyZDIwYjczYmE0ZjVmZDM4Y2NjYmYwYTgwNWQyOTZkZjE1YmRkNzJmZmEzM2ZjNDIwOGYyYWRmZjE3NTgiLCJpYXQiOjE1MjQwMzA0NzYsIm5iZiI6MTUyNDAzMDQ3NiwiZXhwIjoxNTI1MzI2NDc2LCJzdWIiOiI2NDk5NiIsInNjb3BlcyI6WyIqIl19.z6Eq-wEqAot3CzvUG-YvxtkH2qcQEvJpxpShGUqEeyVFnDnUjwqhGQgYumSg3A32rZwYpRp5L3fFnDN5oqi5lfHkfdHurgUMIvYRWuOsRZNLyRjqv0hK6EvmWi2CUDxkQEFGpfj5z_NXar4MIyz4dTMVhyai_xrWkQWygTRq1tk67g47nov-St5b4p6UVOeIwPWf5jrRYt2H29UigN6Xb5iwHsW2HHAkWEi0yndkCuNYa5kOuLuLcq6ubih25O0RC7irhfuL0yMn9r8qFJxOPxtqS6DFisX7M-VrEFoZtUsIE0q6NHpuvTsjwDOBZBTwxHDnsu_ReovSJpWyQhDzpURQU-kBUy2PZfGyBFKICS3qPV7DdVGaDEbFt19k-QRtP1D90uIpuNShONP6IrjeYTnvfz-iXE3kd0hLy5RuQXW7sCalGSBeg3x-43CHQqiz1Vl1q8fg6wawBg-vPZbtSafbn2S_5zexZuV8YcP4DtttUxx6gi22dF8t5od6x6nI0ZJeJSAEmd1xmbJACYchcH8py2rpbMDrhikKXoP7yE_AnDx5oplWfUV-JTLNeEmfvN7wbDw_0yi8Yt33UwNLSgmId3O5lWf0Wcl2tsD4aUH7giCj2ahKVU72KnQD6z8EEXD9kfsbuOqxFW9vPJM6FhXVFIcrLZ9KOe8FoQiQvy0',
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