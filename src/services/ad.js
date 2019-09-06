import request from '@/utils/request';

export function getList(data) {
  return request('/api/ad/getList', {
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
