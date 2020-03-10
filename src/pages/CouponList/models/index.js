import {
  getCouponList,
  getChannelList,
  getOperatorList,
  getCouponType,
  getCouponStatus,
} from '@/services/market';

export default {
  namespace: 'couponList',

  state: {
    tableLoading: false,
    list: [],
    channelList: [],
    operatorList: [],
    couponTypeList: [],
    couponStatusList: [],
    paginationOption: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30'],
    },
  },

  effects: {
    *list({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          tableLoading: true,
        },
      });
      const res = yield call(getCouponList, payload);
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

    *getChannelList({ _ }, { call, put }) {
      const res = yield call(getChannelList);
      if (res) {
        const payload = {
          channelList: res.data.list,
        };
        yield put({
          type: 'save',
          payload,
        });
      }
    },

    *getOperatorList({ _ }, { call, put }) {
      const res = yield call(getOperatorList);
      if (res) {
        const payload = {
          operatorList: res.data.list,
        };
        yield put({
          type: 'save',
          payload,
        });
      }
    },

    *getCouponType({ _ }, { call, put }) {
      const res = yield call(getCouponType);
      if (res) {
        const payload = {
          couponTypeList: res.data.list,
        };
        yield put({
          type: 'save',
          payload,
        });
      }
    },

    *getCouponStatus({ _ }, { call, put }) {
      const res = yield call(getCouponStatus);
      if (res) {
        const payload = {
          couponStatusList: res.data.list,
        };
        yield put({
          type: 'save',
          payload,
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
