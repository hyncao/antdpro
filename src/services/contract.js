import { ajax } from '@/utils/utils';

export function getList(data) {
  return ajax('/api/contract/getList', {
    method: 'POST',
    data,
  });
}

export function getChooseManager(data) {
  return ajax('/api/contract/getChooseManager', {
    method: 'POST',
    data,
  });
}

export function getChooseCustom(data) {
  return ajax('/api/contract/getChooseCustom', {
    method: 'POST',
    data,
  });
}
