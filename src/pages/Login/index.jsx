import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import { connect } from 'dva';
import { getLS, setLS, removeLS } from '../../utils/utils';
import styles from './index.less';

@connect(({ userLogin }) => ({ userLogin }))
@Form.create({ name: 'login' })
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.rememberMe = this.rememberMe.bind(this);
    this.forgetMe = this.forgetMe.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields, getFieldValue },
    } = this.props;
    validateFields(async (err, values) => {
      if (!err) {
        const remember = getFieldValue('remember');
        if (remember) {
          this.rememberMe();
        } else {
          this.forgetMe();
        }
        const { dispatch } = this.props;
        const result = await dispatch({
          type: 'user/login',
          payload: values,
        });
        if (result.status === 'error') {
          this.setState({ text: '用户名或密码错误，应为admin，123' });
        } else {
          const { history } = this.props;
          setLS('authority', result.currentAuthority);
          history.push('/ad/list');
        }
      }
    });
  };

  rememberMe() {
    const {
      form: { getFieldValue },
    } = this.props;
    const userName = getFieldValue('userName');
    const password = getFieldValue('password');
    setLS('adUserName', userName);
    setLS('adPassword', password);
  }

  forgetMe() {
    removeLS('adUserName');
    removeLS('adPassword');
  }

  render() {
    const { text } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.box}>
        {text && <Alert message={text} type="info" showIcon />}
        <Form.Item>
          {getFieldDecorator('userName', {
            initialValue: getLS('adUserName'),
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
            initialValue: getLS('adPassword'),
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
          <Button type="primary" htmlType="submit" className={styles.btn}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;
