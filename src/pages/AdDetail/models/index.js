import {
  save,
} from '@/services/ad';

export default {
  namespace: 'adDetail',

  state: {
    submitLoading: false,
  },

  effects: {
    * save({
      payload,
    }, {
      call,
      put,
    }) {
      yield put({
        type: 'save',
        payload: {
          submitLoading: true,
        },
      });
      const res = yield call(save, payload);
      return res;
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
