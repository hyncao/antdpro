import React, { Component } from 'react';
import {
  Form, Icon, Input, Button, Checkbox, Alert,
} from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ userLogin }) => ({ userLogin }))
@Form.create({ name: 'login' })
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields(async (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const result = await dispatch({
          type: 'userLogin/login',
          payload: values,
        });
        if (result.status === 'error') {
          this.setState({ text: '用户名或密码错误，应为user，ant.design' });
        } else {
          const { history } = this.props;
          history.push('/contract/list');
        }
      }
    });
  };

  render() {
    const { text } = this.state;
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.box}>
        {text && <Alert message={text} type="info" showIcon />}
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
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
