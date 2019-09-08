import React, { Component } from 'react';
import { Modal, Radio } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ customer }) => ({ customer }))
class ModalChooseCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.chooseId,
    }
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.radioChange = this.radioChange.bind(this);
  }

  handleOk() {
    const { value } = this.state;
    const { handleChoose, customer: { list } } = this.props;
    const [chooseCustom] = list.filter(i => i.id === value);
    handleChoose(chooseCustom);
    this.handleCancel();
  }

  handleCancel() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/closeModal',
    })
  }

  radioChange(e) {
    const { value } = e.target;
    this.setState({ value });
  }

  render() {
    const { customer: { modalVisible, list, loading } } = this.props;
    const { value } = this.state;
    const radioList = list.map(i => ({ label: i.name, value: i.id }));
    return (
      <Modal
        title="请选择客户"
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={loading}
      >
        <Radio.Group options={radioList} onChange={this.radioChange} value={value} />
      </Modal>
    )
  }
}

export default ModalChooseCustomer;
