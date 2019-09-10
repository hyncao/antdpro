import {
  getList,
} from '@/services/ad';

export default {
  namespace: 'adList',

  state: {
    tableLoading: false,
    list: [],
    paginationOption: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30'],
    },
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
      if (res.code === 200) {
        const result = {
          list: res.data.list,
          paginationOption: {
            current: payload.pageNum,
            total: res.size,
          },
          tableLoading: false,
          reloadFlag: false,
        };
        yield put({
          type: 'save',
          payload: result,
        });
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
