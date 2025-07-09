import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/store';
import { getBrowserType, getUserOsInfo } from '@/utils/common.ts';

const request = axios.create({
  timeout: 60000,
});
//请求拦截
request.interceptors.request.use(
  async (config) => {
    if (config.url.includes('/api')) {
      config.headers['OS'] = getUserOsInfo();
      config.headers['Browser'] = getBrowserType();
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
        config.headers['role'] = user.role;
      } else {
        console.log('uerIdIsNull');
        config.headers['role'] = 'visitor';
      }
      config.headers['fingerprint'] = window['fingerprint'];
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const apiQueryPost = async (
  url: string,
  data?: {
    pageSize?: number; // 每页数量
    currentPage?: number; // 当前页码
    level?: number;
    order?: {
      [key: string]: 'DESC' | 'ASC';
    }; // 排序对象，属性名和属性分别是字段名和排序方法（ASC/DESC）
    filters?: any; // 通过指定条件筛选数据
  },
  options?: AxiosRequestConfig,
) => {
  const res = await request({
    url: url,
    method: 'post',
    data: {
      pageSize: data?.pageSize ?? 10,
      currentPage: data?.currentPage ?? 1,
      level: data?.level ?? 0,
      filters: data?.filters ?? {},
      order: data?.order ?? {},
    },
    ...options,
  });
  return handleErrorResponse(res.data);
};
export const apiBasePost = async (url: string, data?: any, options?: AxiosRequestConfig) => {
  const res = await request({
    url: url,
    method: 'post',
    data,
    ...options,
  });
  return handleErrorResponse(res.data);
};

export const apiBaseGet = async (url: string, params?: any, options?: AxiosRequestConfig) => {
  const res = await request({
    url: url,
    method: 'get',
    params: params,
    ...options,
  });
  return handleErrorResponse(res.data);
};

export function handleErrorResponse(res: any): {
  status: number;
  msg: string;
  data: any;
} {
  const errorMessages: { [key: number]: string } = {
    500: '服务器错误',
    403: '服务器拒绝请求',
    401: '无权限，请登录',
    400: '客户端请求异常',
    404: '请求资源不存在',
    504: '服务器异常',
    505: 'HTTP 版本不受支持',
  };
  // 如果状态码在映射中，则显示错误消息
  if (errorMessages[res.status]) {
    const errorMsg = res.msg ?? errorMessages[res.status];
    message.error(errorMsg).then();
  }
  return res;
}

export default request;
