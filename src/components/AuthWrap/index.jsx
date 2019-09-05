import { connect } from 'dva';

const authorityArr = ['user', 'admin'];

function AuthWrap({ authLimit, children, user }) {
  const { currentUser: { authority } } = user;
  const limitSort = authorityArr.indexOf(authLimit);
  const currentSort = authorityArr.indexOf(authority);
  if (currentSort < limitSort) {
    return null;
  }
  return children;
}

export default connect(({ user }) => ({ user }))(AuthWrap);
