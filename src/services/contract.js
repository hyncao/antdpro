import request from '@/utils/request';

export function getList(data) {
  return request('/api/contract/getList', {
    method: 'POST',
    data,
  });
}
