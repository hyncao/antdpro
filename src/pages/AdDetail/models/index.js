import {
  saveDetail,
  getDetail,
  getVideoList,
} from '@/services/ad';

export default {
  namespace: 'adDetail',

  state: {
    submitLoading: false,
    adDetailLoading: false,
    videoList: [],
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

    * getVideoList({
      payload,
    }, {
      call,
      put,
    }) {
      const res = yield call(getVideoList, payload);
      if (res.code === 200) {
        yield put({
          type: 'save',
          payload: {
            videoList: res.data,
          },
        })
      }
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
