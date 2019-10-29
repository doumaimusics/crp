import { baseUrl } from "../config/env"; //引入baseUrl
import axios from 'axios';

// axios.defaults.timeout = 5000;
axios.defaults.baseURL = baseUrl;


//http request 拦截器
axios.interceptors.request.use(
    config => {
        
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'token' : window.localStorage.token ? window.localStorage.token : ''
        }
        
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.errCode == 2) {
            router.push({
                path: "/login",
                querry: {
                    redirect: router.currentRoute.fullPath
                } //从哪个页面跳转
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            data: data ? data : "",
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}

//POST请求
47
// export const $post = function (url, param) {
//     return new Promise((resolve, reject) => {
//          axios({
//             50 method: 'post',
//             51 url: url,
//             52 headers: ...,
//             53 data: param ? param : "", //数据体
//             54 baseURL: ...
//                 55
//         }).then(res => {
//             56 resolve(res)
//             57
//         }).catch(error => {
//             58 reject(error)
//             59
//         })
//         60
//     })
//     61
// }

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}









