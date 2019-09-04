import request from '@/utils/request';

export function getList(data) {
  return request('/api/ad/getList', {
    method: 'POST',
    data,
  });
}

export function getChooseManager(data) {
  return request('/api/ad/getChooseManager', {
    method: 'POST',
    data,
  });
}

export function getChooseCustom(data) {
  return request('/api/ad/getChooseCustom', {
    method: 'POST',
    data,
  });
}
