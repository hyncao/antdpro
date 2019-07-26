import React, { Component } from 'react';
import {
  Form, Modal, Input, Select, Button,
} from 'antd';
import { connect } from 'dva';
import ChooseManager from './ChooseManager';
import styles from './index.less';

const { Option } = Select;

@connect(({ contractList }) => ({ contractList }))
@Form.create()
class ModalContractListAdd extends Component {
  constructor(props) {
    super(props);
    this.modalClose = this.modalClose.bind(this);
    this.validateConcode = this.validateConcode.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.chooseManager = this.chooseManager.bind(this);
  }

  modalClose() {
    const { dispatch, form: { resetFields } } = this.props;
    resetFields();
    dispatch({
      type: 'contractList/controlModal',
      payload: { modalVisible: false },
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
    form.validateFields((err, values) => {
      if (!err) {
        this.modalClose();
      }
    });
  }

  chooseManager() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contractList/controlChooseManager',
      payload: { chooseManagerModalVisible: true },
    });
  }

  render() {
    const { form: { getFieldDecorator }, contractList: { modalVisible } } = this.props;
    const prefixSelector = getFieldDecorator('date', {
      initialValue: '2019',
    })(
      <Select>
        <Option value="2018">2018</Option>
        <Option value="2019">2019</Option>
        <Option value="2020">2020</Option>
      </Select>,
    );

    return (
      <Modal
        title="新增合同"
        visible={modalVisible}
        onOk={this.submitForm}
        onCancel={this.modalClose}
      >
        <Form onSubmit={this.submitForm}>
          <Form.Item className={styles.item} label="合同编号">
            {getFieldDecorator('concode', {
              rules: [
                { required: true, message: '请输入合同编号' },
                { validator: this.validateConcode },
              ],
            })(
              <Input
                addonBefore={prefixSelector}
                placeholder="合同编号"
                maxLength={4}
              />,
            )}
          </Form.Item>
          <Form.Item className={styles.item} label="业务编号">
            {getFieldDecorator('businessCode', {
              rules: [
                { required: true, message: '请输入业务编号' },
              ],
            })(
              <Input
                placeholder="业务编号"
                maxLength={4}
              />,
            )}
          </Form.Item>
          <Form.Item className={styles.item} label="客户经理">
            {getFieldDecorator('accountManager', {
              rules: [
                { required: true, message: '请选择客户经理' },
              ],
            })(
              <Button type="primary" onClick={this.chooseManager}>选择</Button>,
            )}
          </Form.Item>
        </Form>
        <ChooseManager />
      </Modal>
    );
  }
}

export default ModalContractListAdd;
