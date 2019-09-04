import {
  getList, getChooseManager, getChooseCustom,
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
    chooseManagerArr: [],
    chooseManagerPagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30'],
    },
    chooseManagerListLoading: false,
    chooseCustomModalVisible: false,
    chooseCustomList: [],
    chooseCustomArr: [],
    chooseCustomPagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30'],
    },
    chooseCustomListLoading: false,
    reloadFlag: false,
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
        reloadFlag: false,
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
          chooseManagerArr: [],
          chooseCustomArr: [],
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

    * chooseManagerArr({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          chooseManagerArr: payload.chooseManagerArr,
        },
      });
    },

    * controlChooseCustom({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          chooseCustomModalVisible: payload.chooseCustomModalVisible,
        },
      });
    },

    * chooseCustomList({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          chooseCustomListLoading: true,
        },
      });
      const res = yield call(getChooseCustom, payload);
      yield put({
        type: 'save',
        payload: {
          chooseCustomList: res.list,
          chooseCustomPagination: {
            current: payload.pageNum,
            total: res.total,
          },
          chooseCustomListLoading: false,
        },
      });
    },

    * chooseCustomArr({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          chooseCustomArr: payload.chooseCustomArr,
        },
      });
    },

    * reloadContractList({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          reloadFlag: true,
          modalVisible: payload.modalVisible,
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
