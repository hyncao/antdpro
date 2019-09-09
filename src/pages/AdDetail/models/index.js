import {
  saveDetail,
  getDetail,
} from '@/services/ad';

export default {
  namespace: 'adDetail',

  state: {
    submitLoading: false,
    adDetailLoading: false,
  },

  effects: {
    * saveDetail({
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
      const res = yield call(saveDetail, payload);
      return res;
    },

    * getDetail({
      payload,
    }, {
      call,
      put,
    }) {
      yield put({
        type: 'save',
        payload: {
          adDetailLoading: true,
        },
      });
      const res = yield call(getDetail, payload);
      yield put({
        type: 'save',
        payload: {
          adDetailLoading: false,
        },
      });
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
