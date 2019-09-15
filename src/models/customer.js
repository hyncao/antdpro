import { getCustomerList } from '@/services/ad';

const UserModel = {
  namespace: 'customer',
  state: {
    loading: false,
    modalVisible: false,
    list: [],
  },
  effects: {
    * getList({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: { loading: true, modalVisible: true, list: [] },
      });
      const res = yield call(getCustomerList, payload);
      if (res.code === 200) {
        yield put({
          type: 'save',
          payload: {
            loading: false,
            list: res.data,
          },
        });
      }
    },
    * closeModal(_, { put }) {
      yield put({
        type: 'save',
        payload: {
          modalVisible: false,
        },
      })
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

export default UserModel;
