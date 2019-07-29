import request from '@/utils/request';

export function getList(data) {
  return request('/api/contract/getList', {
    method: 'POST',
    data,
  });
}

export function getChooseManager(data) {
  return request('/api/contract/getChooseManager', {
    method: 'POST',
    data,
  });
}

export function getChooseCustom(data) {
  return request('/api/contract/getChooseCustom', {
    method: 'POST',
    data,
  });
}
