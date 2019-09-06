import { getList } from '@/services/customer';

const UserModel = {
  namespace: 'customer',
  state: {
    loading: false,
    modalVisible: false,
    list: [],
  },
  effects: {
    * getList(_, { call, put }) {
      yield put({
        type: 'save',
        payload: { loading: true, modalVisible: true, list: [] },
      });
      const response = yield call(getList);
      yield put({
        type: 'save',
        payload: {
          loading: false,
          list: response.list,
        },
      });
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
