import request from '@/http/request';

const userApi = {
  validateUser(user) {
    return request.post('/api/user/login', user);
  },
  registerUser(user) {
    return request.post('/api/user/registerUser', user);
  },
  getUserInfoById(data) {
    return request.get('/api/user/getUserInfo', { params: data });
  },
  updateUserInfo(user) {
    return request.post('/api/user/saveUserInfo', user);
  },
  deleteUserById(id) {
    return request.get(`/api/user/deleteUserById?id=${id}`);
  },
};

export default userApi;
