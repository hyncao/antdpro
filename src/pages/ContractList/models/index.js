import {
  getList,
} from '@/services/contract';

export default {
  namespace: 'contractList',

  state: {
    list: [],
  },

  effects: {
    * list({
      payload,
    }, {
      call,
      put,
    }) {
      const res = yield call(getList, payload);
      const result = {
        list: res.list,
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
