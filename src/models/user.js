import {
  queryCurrent,
  userLogin,
  query as queryUsers,
} from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    * fetch(_, {
      call,
      put,
    }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * login({
      payload,
    }, {
      call,
      put,
    }) {
      const res = yield call(userLogin, payload);
      yield put({
        type: 'save',
        payload: {
          currentUser: {
            ...payload,
            currentAuthority: res.currentAuthority,
          },
        },
      });
      return res;
    },

    * fetchCurrent(_, {
      call,
      put,
    }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
