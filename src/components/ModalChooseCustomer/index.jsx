import React, { Component } from 'react';
import { Modal, Radio } from 'antd';
import { connect } from 'dva';

@connect(({ customer }) => ({ customer }))
class ModalChooseCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    }
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.value) {
      return { value: props.chooseId };
    }
    return null;
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

  handleClose() {
    this.setState({ value: null });
  }

  render() {
    const { customer: { modalVisible, list, loading } } = this.props;
    const { value } = this.state;
    const radioList = list.map(i => ({ label: i.customerFullName, value: i.id }));
    return (
      <Modal
        title="请选择客户"
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={loading}
        afterClose={this.handleClose}
      >
        <Radio.Group options={radioList} onChange={this.radioChange} value={value} />
      </Modal>
    )
  }
}

export default ModalChooseCustomer;
