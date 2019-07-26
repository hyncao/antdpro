import React, { Component } from 'react';
import {
  Form, Modal, Input, Button, Table,
} from 'antd';
import { connect } from 'dva';

@connect(({ contractList }) => ({ contractList }))
@Form.create()
class ChooseManager extends Component {
  constructor(props) {
    super(props);
    this.modalClose = this.modalClose.bind(this);
    this.validateConcode = this.validateConcode.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.reset = this.reset.bind(this);
  }

  modalClose() {
    const { dispatch, form: { resetFields } } = this.props;
    resetFields();
    dispatch({
      type: 'contractList/controlChooseManager',
      payload: { chooseManagerModalVisible: false },
    });
  }

  validateConcode(rule, value, callback) {
    const reg = /^\d{4}$/;
    if (value && !reg.test(value)) {
      callback('编号为4位数字');
    } else {
      callback();
    }
  }

  submitForm(e) {
    e.preventDefault();
    const { form } = this.props;
    form.resetFields();
    // form.validateFields((err, values) => {
    //   if (!err) {
    //     this.modalClose();
    //   }
    // });
  }

  reset() {
    const { form } = this.props;
    form.resetFields();
  }

  render() {
    const {
      form: { getFieldDecorator },
      contractList: { chooseManagerModalVisible, chooseManagerListLoading },
    } = this.props;

    return (
      <Modal
        title="新增合同"
        visible={chooseManagerModalVisible}
        onOk={this.submitForm}
        onCancel={this.modalClose}
      >
        <Form onSubmit={this.submitForm}>
          <Form.Item label="客户经理" style={{ display: 'flex' }}>
            {getFieldDecorator('accountManager')(
              <>
                <Input
                  placeholder="搜索客户经理"
                  maxLength={8}
                  style={{ width: '150px', marginRight: '20px' }}
                />
                <Button htmlType="submit" type="primary">查询</Button>
                <Button onClick={this.reset} type="danger">清除</Button>
              </>,
            )}
          </Form.Item>
        </Form>
        <Table
          loading={chooseManagerListLoading}
        >

        </Table>
      </Modal>
    );
  }
}

export default ChooseManager;
