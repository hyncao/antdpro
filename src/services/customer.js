import request from '@/utils/request';

export function getList(data) {
  return request('/api/customer/getList', {
    method: 'POST',
    data,
  });
}
