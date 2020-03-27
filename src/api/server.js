import axios from 'axios'
import QS from 'qs';
import { Toast } from 'antd-mobile';
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = ' http://easy-mock.liuup.com/mock/5e7a1637b7eeed4e76fec766/myshop'
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = ' http://easy-mock.liuup.com/mock/5e7a1637b7eeed4e76fec766/myshop'
}
axios.defaults.timeout = 10000;
// 请求头信息是为post请求设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  
  // 请求拦截器
axios.interceptors.request.use(
    config => {
        const token = "store.state.token"
      // 每次发送请求之前判断是否存在token
      // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
      token && (config.headers.Authorization = token)
      return config
    },
    error => {
      return Promise.error(error)
    })
  // 响应拦截器
axios.interceptors.response.use(response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      if (response.data.code === 511) {
        // 未授权调取授权接口
      } else if (response.data.code === 510) {
        // 未登录跳转登录页
      } else {
        return Promise.resolve(response)
      }
    } else {
      return Promise.reject(response)
    }
  }, error => {
    // 我们可以在这里对异常状态作统一处理
    if (error.response.status) {            
        switch (error.response.status) {                
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。                
            case 401:                    
                // router.replace({                        
                //     path: '/login',                        
                //     query: { 
                //         redirect: router.currentRoute.fullPath 
                //     }
                // });
                break;

            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面                
            case 403:
                Toast.fail('登录过期，请重新登录',1)
                // 清除token
                // localStorage.removeItem('token');
                // store.commit('loginSuccess', null);
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                setTimeout(() => {                        
                    // router.replace({                            
                    //     path: '/login',                            
                    //     query: { 
                    //         redirect: router.currentRoute.fullPath 
                    //     }                        
                    // });                    
                }, 1000);                    
                break; 

            // 404请求不存在
            case 404:
                Toast.offline('Network connection failed !!!', 1);
                break;
            // 其他错误，直接抛出错误提示
            default:
                // Toast({
                //     message: error.response.data.message,
                //     duration: 1500,
                //     forbidClick: true
                // });
        }
        return Promise.reject(error.response);
    }
  })
  

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}


/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
        // toLogin();
        break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
        // tip('登录过期，请重新登录');
        // localStorage.removeItem('token');
        // store.commit('loginSuccess', null);
        setTimeout(() => {
            // toLogin();
        }, 1000);
        break;
    // 404请求不存在
    case 404:
        // tip('请求的资源不存在'); 
        break;
    default:
        console.log(other);   
}}