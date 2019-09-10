import request from '@/utils/request';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = path => urlReg.test(path);

export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const {
    NODE_ENV
  } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

export const delay = t => new Promise(res => setTimeout(res, t));

export const getLS = key => {
  const ls = window.localStorage;
  if (ls.getItem(key)) {
    return ls.getItem(key);
  }
  return '';
};

export const setLS = (key, value) => {
  const ls = window.localStorage;
  ls.setItem(key, value);
};

export const removeLS = key => {
  const ls = window.localStorage;
  ls.removeItem(key);
};

export const getUrlQuery = name => {
  if ((typeof name).toLowerCase() !== 'string') {
    return '';
  }
  const search = window.location.search.substr(1);
  const query = search.split('&');
  let result;
  for (let i = 0; i < query.length; i += 1) {
    if (query[i].indexOf(`${name}=`) > -1) {
      const arr = query[i].split(`${name}=`);
      ([, result] = arr);
      break;
    }
  }
  if (result) return result;
  return '';
};

export const ajax = (url, data) => request(url, {
  ...data,
  headers: {
    Authorization: 'token',
  },
});
