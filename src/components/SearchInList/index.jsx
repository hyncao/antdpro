import React, { Component } from 'react';
import {
  Row, Col, Form, Input, DatePicker, Select,
} from 'antd';

const { Option } = Select;

@Form.create()
class SearchInList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(date, dateString) {
    console.log(date, dateString);
  }

  selectChange(a, b) {
    console.log(a, b);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={10}>
            <Col span={4}>
              <Form.Item label="合同编号">
                {getFieldDecorator('concode', {
                  rules: [],
                })(
                  <Input
                    placeholder="请输入合同编号"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="客户名称">
                {getFieldDecorator('accountall', {
                  rules: [{}],
                })(
                  <Input
                    placeholder="请输入客户名称"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="合同类型">
                {getFieldDecorator('signeddate', {
                  rules: [{ type: 'object' }],
                })(
                  <Select onChange={this.selectChange}>
                    <Option value="55">全部</Option>
                    <Option value="1">普通合同</Option>
                    <Option value="2">框架合同</Option>
                    <Option value="3">代理合同</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="签约日期">
                {getFieldDecorator('signeddate', {
                  rules: [{ type: 'object' }],
                })(
                  <DatePicker onChange={this.handleChange} />,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default SearchInList;
