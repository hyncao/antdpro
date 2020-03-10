import { ajax } from '@/utils/utils';

export const getCouponList = data =>
  ajax('/api/market/getCouponList', {
    method: 'POST',
    data,
  });

export const getChannelList = data =>
  ajax('/api/market/getChannelList', {
    method: 'POST',
    data,
  });

export const getOperatorList = data =>
  ajax('/api/market/getOperatorList', {
    method: 'POST',
    data,
  });

export const getCouponType = data =>
  ajax('/api/market/getCouponType', {
    method: 'POST',
    data,
  });

export const getCouponStatus = data =>
  ajax('/api/market/getCouponStatus', {
    method: 'POST',
    data,
  });
