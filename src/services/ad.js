import request from '@/utils/request';

export function getList(data) {
  return request('/api/ad/queryAdlist', {
    method: 'POST',
    data,
  });
}

export function saveDetail(data) {
  return request('/api/ad/save', {
    method: 'POST',
    data,
  });
}

export function getDetail(data) {
  return request('/ad/detail', {
    method: 'POST',
    data,
  });
}
