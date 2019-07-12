import request from '@/utils/request';

export function query() {
  return request('/api/users');
}
export function queryCurrent() {
  return request('/api/currentUser');
}
export function queryNotices() {
  return request('/api/notices');
}
export function userLogin(data) {
  return request('/api/login/account', {
    method: 'POST',
    data,
  });
}
