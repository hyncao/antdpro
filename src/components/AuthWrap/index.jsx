import { connect } from 'dva';
import { getLS } from '@/utils/utils';

function AuthWrap({ authLimit, components }) {
  const authority = getLS('authority');
  const renderFlag = !authLimit || authLimit.indexOf(authority) > -1;
  if (renderFlag) {
    return components();
  }
  return null;
}

export default connect(({ user }) => ({ user }))(AuthWrap);
