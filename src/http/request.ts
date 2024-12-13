import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/store'; // 1. 引入 axios

// 2. 创建一个 axios 的实例对象
const request = axios.create({
  timeout: 60000,
});
request.defaults.withCredentials = true; //跨域请求时发送cookie
//请求拦截
request.interceptors.request.use(
  (config) => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['OS'] = getUserOsInfo();
    config.headers['Browser'] = getBrowserType();
    config.headers['Cac'] = getBrowserType();

    // 假设你有一个全局状态管理器（如Vuex）或者一个响应式的引用（如ref）来存储用户信息
    const userId = localStorage?.getItem('userId'); /* 从你的状态管理器或响应式引用中获取用户信息 */
    const user = useUserStore();
    const notNeedAuth = ['del'].some((key) => config.url.includes(key));
    if (!['admin', 'root'].includes(user.role) && notNeedAuth) {
      message.warn('没有操作权限.请登录！！！');
      return Promise.reject('接口' + config.url + '没有操作权限');
    }
    if (config.url.includes('login')) {
      config.headers['X-User-Id'] = '';
      config.headers['role'] = '';
    } else if (userId) {
      config.headers['X-User-Id'] = userId;
    } else {
      config.headers['role'] = 'visitor';
    }
    // else {
    //   if (!['/api/user/login', '/api/user/registerUser'].includes(config.url)) {
    //     router.push('/home').then((r) => {});
    //     return Promise.reject('User ID not found in local storage');
    //   }
    // }
    return config; //必须要返回config
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use((config) => {
  return config.data;
});

export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
declare interface ResponseData {
  msg: string;
  status: number; // '200'
  data: any;
}

interface postData {
  pageSize?: number;
  currentPage?: number;
  level?: number;
  filters?: any;
}

export const apiQueryPost = async (url: string, data?: postData, options?: AxiosRequestConfig) => {
  const res = await request({
    url: url,
    method: 'post',
    data: {
      pageSize: data?.pageSize ?? 10,
      currentPage: data?.currentPage ?? 1,
      level: data?.level ?? 0,
      filters: data?.filters ?? {},
    },
    ...options,
  });
  return handleBaseResponse(res);
};
export const apiBasePost = async (url: string, data?: any, options?: AxiosRequestConfig) => {
  const res = await request({
    url: url,
    method: 'post',
    data,
    ...options,
  });
  return handleBaseResponse(res);
};
export const apiBaseGet = async (url: string, params: any, options?: AxiosRequestConfig) => {
  const res = await request({
    url: url,
    method: 'get',
    params: params,
    ...options,
  });
  return handleBaseResponse(res);
};
export function handleBaseResponse(data: any) {
  if (data.status === 200) {
    return data;
  } else if (data.status === 500) {
    message.error(data.msg || '服务器错误');
  } else if (data.status === 303) {
    message.error(data.msg || '存在同名数据');
  } else if (data.status === 403) {
    message.error(data.msg);
  } else if (data.status === 401) {
  } else {
    message.error(data.msg || '服务器错误');
  }
  return;
}

function getUserOsInfo() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Windows NT 10.0') !== -1) return 'Windows 10';
  if (userAgent.indexOf('Windows NT 6.2') !== -1) return 'Windows 8';
  if (userAgent.indexOf('Windows NT 6.1') !== -1) return 'Windows 7';
  if (userAgent.indexOf('Windows NT 6.0') !== -1) return 'Windows Vista';
  if (userAgent.indexOf('Windows NT 5.1') !== -1) return 'Windows XP';
  if (userAgent.indexOf('Windows NT 5.0') !== -1) return 'Windows 2000';
  if (userAgent.indexOf('Mac') !== -1) return 'Mac/iOS';
  if (userAgent.indexOf('X11') !== -1) return 'UNIX';
  if (userAgent.indexOf('Linux') !== -1) return 'Linux';
  return 'Other';
}

// 获取浏览器类型
function getBrowserType() {
  let browserType = null;
  try {
    let ua = navigator.userAgent.toLocaleLowerCase();
    function _mime(option, value) {
      const mimeTypes = navigator.mimeTypes;
      for (let mt in mimeTypes) {
        if (mimeTypes[mt][option] == value) {
          return true;
        }
      }
      return false;
    }
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
      browserType = 'IE';
    } else if (ua.match(/firefox/) != null) {
      browserType = 'firefox';
    } else if (ua.match(/ucbrowser/) != null) {
      browserType = 'UC';
    } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
      browserType = 'opera';
    } else if (ua.match(/bidubrowser/) != null) {
      browserType = 'baidu';
    } else if (ua.match(/metasr/) != null) {
      browserType = 'sougou';
    } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
      browserType = 'QQ';
    } else if (ua.match(/maxthon/) != null) {
      browserType = 'maxthon';
    } else if (ua.match(/chrome/) != null) {
      const is360 = _mime('type', 'application/vnd.chromium.remoting-viewer');
      if (is360) {
        browserType = '360';
      } else {
        browserType = 'chrome';
      }
    } else if (ua.match(/safari/) != null) {
      browserType = 'Safari';
    } else {
      browserType = 'others';
    }
  } catch (e) {}
  return browserType;
}
export default request;
