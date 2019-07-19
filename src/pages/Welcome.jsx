import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ user }) => ({ user }))
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props) {
    if (props.user.currentUser.name === 'Serati Ma') {
      props.history.push('/user/login');
    }
  }

  render() {
    return (
      <p
        style={{
          textAlign: 'center',
        }}
      >
        Want to add more pages? Please refer to{' '}
        <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
          use block
        </a>
        。
      </p>
    );
  }
}

export default Welcome;
