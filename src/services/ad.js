import request from '@/utils/request';

export function getList(data) {
  return request('/api/ad/queryAdlist', {
    method: 'POST',
    data,
  });
}

export function save(data) {
  return request('/api/ad/save', {
    method: 'POST',
    data,
  });
}
