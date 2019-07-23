import React, { Component } from 'react';
import {
  Row, Col, Form, Input, DatePicker, Select, Button,
} from 'antd';

const { Option } = Select;

@Form.create()
class SearchInList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Row>&emsp;</Row>
          <Row gutter={10}>
            <Col span={5}>
              <Form.Item style={{ display: 'flex' }} label="合同编号">
                {getFieldDecorator('concode', {})(
                  <Input
                    placeholder="请输入合同编号"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item style={{ display: 'flex' }} label="客户名称">
                {getFieldDecorator('accountall', {})(
                  <Input
                    placeholder="请输入客户名称"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item style={{ display: 'flex' }} label="合同类型">
                {getFieldDecorator('contype', { initialValue: '' })(
                  <Select style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1">普通合同</Option>
                    <Option value="2">框架合同</Option>
                    <Option value="3">代理合同</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item style={{ display: 'flex' }} label="签约日期">
                {getFieldDecorator('signeddate', {})(
                  <DatePicker />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={2}>
              <Button htmlType="submit" type="primary">搜索</Button>
            </Col>
            <Col span={2}>
              <Button type="danger">清空</Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default SearchInList;
