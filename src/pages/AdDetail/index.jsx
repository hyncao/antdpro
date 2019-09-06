import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form, Card, Input, Select, Button,
} from 'antd';
import { BlankLine, AuthWrap, ModalChooseCustomer } from '@/components/index.jsx';
import styles from './index.less';

const { Item } = Form;
const { Option } = Select;

@connect(({ adDetail }) => ({ adDetail }))
@Form.create()
class AdDetail extends Component {
  constructor(props) {
    super(props);
    this.chooseCustomer = this.chooseCustomer.bind(this);
    this.submit = this.submit.bind(this);
    this.submitAudit = this.submitAudit.bind(this);
  }

  chooseCustomer() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/getList',
    })
  }

  submit() {
    const { dispatch, form: { validateFields } } = this.props;
    validateFields(async (err, values) => {
      if (!err) {
        const res = await dispatch({
          type: 'adDetail/save',
          payload: values,
        })
        console.log(res);
      }
    })
  }

  submitAudit() {
    
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const { form: { getFieldDecorator }, adDetail: { chooseCustom, loading }, history } = this.props;
    return (
      <div>
        <ModalChooseCustomer />
        <BlankLine />
        <Form {...formItemLayout}>
          <Card title="基础信息" bordered={false}>
            <Item label="广告名称" extra="一般为上刊日期+标识名称组成，如0720兰博基尼">
              {getFieldDecorator('adTitle', {
                initialValue: '',
                rules: [
                  { required: true, message: '请填写广告名称' },
                ],
              })(
                <Input placeholder="请填写广告名称" maxLength={32} />,
              )}
            </Item>
            <Item label="行业属性">
              {getFieldDecorator('attribute', {
                initialValue: '',
                rules: [
                  { required: true, message: '请选择行业属性' },
                ],
              })(
                <Select placeholder="请选择">
                  <Option value="1">房地产</Option>
                  <Option value="2">教育培训</Option>
                  <Option value="3">生活服务</Option>
                </Select>,
              )}
            </Item>
            <AuthWrap authLimit="admin">
              <Item label="所属客户">
                {getFieldDecorator('customer', {
                  initialValue: chooseCustom.name,
                  rules: [
                    { required: true, message: '请选择所属客户' },
                  ],
                })(
                  <Input placeholder="请选择所属客户" readOnly onClick={this.chooseCustomer} />,
                )}
              </Item>
            </AuthWrap>
          </Card>
          <Card bordered={false}>
            <Item>
              <Button type="primary" htmlType="submit" onClick={this.submit}>提交</Button>
              <Button type="primary" onClick={this.submitAudit}>提交并审核</Button>
              <Button type="primary" onClick={history.goBack}>取消</Button>
            </Item>
          </Card>
        </Form>
      </div>
    )
  }
}

export default AdDetail;
