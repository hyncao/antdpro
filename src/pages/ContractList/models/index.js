import {
  getList, getChooseManager,
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
    modalVisible: false,
    chooseManagerModalVisible: false,
    chooseManagerList: [],
    chooseManagerPagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30'],
    },
    chooseManagerListLoading: false,
  },

  effects: {
    * list({ payload }, { call, put }) {
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

    * controlModal({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          modalVisible: payload.modalVisible,
        },
      });
    },

    * controlChooseManager({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          chooseManagerModalVisible: payload.chooseManagerModalVisible,
        },
      });
    },

    * chooseManagerList({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          chooseManagerListLoading: true,
        },
      });
      const res = yield call(getChooseManager, payload);
      yield put({
        type: 'save',
        payload: {
          chooseManagerList: res.list,
          chooseManagerPagination: {
            current: payload.pageNum,
            total: res.total,
          },
          chooseManagerListLoading: false,
        },
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
