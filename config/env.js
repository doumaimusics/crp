//根据不同的环境更改不同的baseUrl
let baseUrl = '';

if (process.env.NODE_ENV == 'development') { // 开发
    baseUrl = 'http://api.richcrp.com';

} else if (process.env.NODE_ENV == 'production') { // 生产
    baseUrl = 'http://api.richcrp.com';
}

export {
    baseUrl, //导出baseUrl
}