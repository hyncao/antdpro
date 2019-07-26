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
