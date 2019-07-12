import {
  userLogin,
} from '@/services/user';

export default {
  namespace: 'userLogin',

  state: {
    result: {},
  },

  effects: {
    * login({
      payload,
      callback,
    }, {
      call,
      put,
    }) {
      const res = yield call(userLogin, payload);
      const result = { result: res };
      yield put({
        type: 'save',
        payload: result,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
