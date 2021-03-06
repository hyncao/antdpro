import React, { Component } from 'react';
import {
  Form, Modal, Input, Button, Table, Row, Col,
} from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ contractList }) => ({ contractList }))
@Form.create()
class ChooseManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseManagerArr: [],
    };
    this.getList = this.getList.bind(this);
    this.modalOk = this.modalOk.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.validateConcode = this.validateConcode.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  getList(pageNum = 1) {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'contractList/chooseManagerList',
          payload: { ...values, pageNum },
        });
      }
    });
  }

  modalOk() {
    const { dispatch } = this.props;
    const { chooseManagerArr } = this.state;
    dispatch({
      type: 'contractList/chooseManagerArr',
      payload: { chooseManagerArr },
    });
    this.modalClose();
  }

  modalClose() {
    const { dispatch } = this.props;
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
    this.getList();
  }

  reset() {
    const { form: { resetFields } } = this.props;
    resetFields('accountManager');
  }

  render() {
    const {
      form: { getFieldDecorator },
      contractList: {
        chooseManagerModalVisible, chooseManagerListLoading,
        chooseManagerList, chooseManagerPagination,
      },
    } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const chooseManagerArr = selectedRows;
        this.setState({ chooseManagerArr });
      },
    };
    chooseManagerPagination.onChange = this.getList;
    chooseManagerPagination.onShowSizeChange = this.getList;

    const dataSource = chooseManagerList.map(i => ({
      id: i.id,
      key: i.id,
      managerName: i.name,
    }));
    const columns = [
      {
        title: '客户经理名称',
        dataIndex: 'managerName',
        key: 'managerName',
      },
    ];

    return (
      <Modal
        title="新增合同"
        visible={chooseManagerModalVisible}
        onOk={this.modalOk}
        onCancel={this.modalClose}
      >
        <Form onSubmit={this.submitForm}>
          <Row gutter={10}>
            <Col span={14}>
              <Form.Item label="客户经理" className={styles.formItem}>
                {getFieldDecorator('accountManager')(
                  <Input
                    placeholder="搜索客户经理"
                    maxLength={8}
                    style={{ width: '150px', marginRight: '20px' }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={4} className={styles.btnBox}>
              <Button htmlType="submit" type="primary">查询</Button>
            </Col>
          </Row>
        </Form>
        <Table
          rowSelection={rowSelection}
          loading={chooseManagerListLoading}
          dataSource={dataSource}
          columns={columns}
          pagination={chooseManagerPagination}
        />
      </Modal>
    );
  }
}

export default ChooseManager;
