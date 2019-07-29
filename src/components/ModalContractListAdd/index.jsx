import React, { Component } from 'react';
import {
  Form, Modal, Input, Select, Button,
} from 'antd';
import { connect } from 'dva';
import ChooseManager from './ChooseManager';
import ChooseCustom from './ChooseCustom';
import styles from './index.less';

const { Option } = Select;

@connect(({ contractList }) => ({ contractList }))
@Form.create()
class ModalContractListAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseManagerArr: [],
    };
    this.modalClose = this.modalClose.bind(this);
    this.validateConcode = this.validateConcode.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.chooseManager = this.chooseManager.bind(this);
    this.chooseCustom = this.chooseCustom.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { contractList: { chooseManagerArr, chooseCustomArr }, form: { setFieldsValue } } = props;
    const {
      chooseManagerArr: stateChooseManagerArr, chooseCustomArr: stateChooseCustomArr,
    } = state;
    if (JSON.stringify(stateChooseManagerArr) !== JSON.stringify(chooseManagerArr)) {
      setFieldsValue({
        accountManager: chooseManagerArr.map(i => i.id),
      });
      return { chooseManagerArr };
    }
    if (JSON.stringify(stateChooseCustomArr) !== JSON.stringify(chooseCustomArr)) {
      setFieldsValue({
        accountName: chooseCustomArr.map(i => i.id),
      });
      return { chooseCustomArr };
    }
    return null;
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
        console.log(values);
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

  chooseCustom() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contractList/controlChooseCustom',
      payload: { chooseCustomModalVisible: true },
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      contractList: { modalVisible, chooseManagerArr, chooseCustomArr },
    } = this.props;
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
              <>
                {chooseManagerArr.length > 0
                  && (<input className={styles.backIpt} readOnly value={chooseManagerArr.map(i => i.managerName).join('，')} />)
                }
                <Button type="primary" onClick={this.chooseManager}>选择</Button>
              </>,
            )}
          </Form.Item>
          <Form.Item className={styles.item} label="客户名称">
            {getFieldDecorator('accountName', {
              rules: [
                { required: true, message: '请选择客户名称' },
              ],
            })(
              <>
                {chooseCustomArr.length > 0
                  && (<input className={styles.backIpt} readOnly value={chooseCustomArr.map(i => i.managerName).join('，')} />)
                }
                <Button type="primary" onClick={this.chooseCustom}>选择</Button>
              </>,
            )}
          </Form.Item>
        </Form>
        <ChooseManager />
        <ChooseCustom />
      </Modal>
    );
  }
}

export default ModalContractListAdd;
