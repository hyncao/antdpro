import { ajax } from '@/utils/utils';

export function getList(data) {
  return ajax('/api/ad/queryAdList', {
    method: 'POST',
    data,
  });
}

export function saveDetail(data) {
  return ajax('/api/ad/add', {
    method: 'POST',
    data,
  });
}

export function getDetail(data) {
  return ajax('/api/ad/detail', {
    method: 'POST',
    data,
  });
}

export function getCustomerList(data) {
  return ajax('/api/ad/queryCustomerList', {
    method: 'POST',
    data,
  });
}

export function getVideoList(data) {
  return ajax('/api/ad/list', {
    method: 'POST',
    data,
  });
}
