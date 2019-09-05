import {
  getList,
} from '@/services/ad';

export default {
  namespace: 'adDetail',

  state: {
    loading: false,
  },

  effects: {
    * list({
      payload,
    }, {
      call,
      put,
    }) {
      yield put({
        type: 'save',
        payload: {
          tableLoading: true,
        },
      });
      const res = yield call(getList, payload);
      const result = {
        list: res.list,
        paginationOption: {
          current: payload.pageNum,
          total: res.total,
        },
        tableLoading: false,
        reloadFlag: false,
      };
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
