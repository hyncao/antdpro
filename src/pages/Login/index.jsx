import React, { Component } from 'react';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ userLogin }) => ({ userLogin }))
@Form.create({ name: 'login' })
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userLogin.result.status) {
      console.log(props.userLogin.result);
    }
    return null;
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'userLogin/login',
          payload: values,
        });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.box}>
        <Form.Item>
          {getFieldDecorator('用户名', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('密码', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="#1">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className={styles.btn}>Log in</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;
