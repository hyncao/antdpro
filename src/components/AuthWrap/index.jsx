import { connect } from 'dva';
import { getLS } from '@/utils/utils';

const authorityArr = ['user', 'admin'];

function AuthWrap({ authLimit, children, user }) {
  let { currentUser: { authority } } = user;
  if (!authority) {
    authority = JSON.parse(getLS('currentUser')).currentAuthority;
  }
  const limitSort = authorityArr.indexOf(authLimit);
  const currentSort = authorityArr.indexOf(authority);
  if (currentSort < limitSort) {
    return null;
  }
  return children;
}

export default connect(({ user }) => ({ user }))(AuthWrap);
