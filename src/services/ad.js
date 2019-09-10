import { ajax } from '@/utils/utils';

export function getList(data) {
  return ajax('/api/ad/queryAdList', {
    method: 'POST',
    data,
  });
}

export function saveDetail(data) {
  return ajax('/api/ad/save', {
    method: 'POST',
    data,
  });
}

export function getDetail(data) {
  return ajax('/ad/detail', {
    method: 'POST',
    data,
  });
}
