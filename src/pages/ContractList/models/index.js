import {
  getList,
} from '@/services/contract';

export default {
  namespace: 'contractList',

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
      const result = {
        list: res.list,
        paginationOption: {
          current: payload.pageNum,
          total: res.total,
        },
        tableLoading: false,
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
