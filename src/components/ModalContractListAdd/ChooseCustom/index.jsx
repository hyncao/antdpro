import React, { Component } from 'react';
import {
  Form, Modal, Input, Button, Table, Row, Col,
} from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ contractList }) => ({ contractList }))
@Form.create()
class ChooseCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseCustomArr: [],
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
          type: 'contractList/chooseCustomList',
          payload: { ...values, pageNum },
        });
      }
    });
  }

  modalOk() {
    const { dispatch } = this.props;
    const { chooseCustomArr } = this.state;
    dispatch({
      type: 'contractList/chooseCustomArr',
      payload: { chooseCustomArr },
    });
    this.modalClose();
  }

  modalClose() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contractList/controlChooseCustom',
      payload: { chooseCustomModalVisible: false },
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

  render() {
    const {
      form: { getFieldDecorator },
      contractList: {
        chooseCustomModalVisible, chooseCustomListLoading,
        chooseCustomList, chooseCustomPagination,
      },
    } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const chooseCustomArr = selectedRows;
        this.setState({ chooseCustomArr });
      },
    };
    chooseCustomPagination.onChange = this.getList;
    chooseCustomPagination.onShowSizeChange = this.getList;

    const dataSource = chooseCustomList.map(i => ({
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
        visible={chooseCustomModalVisible}
        onOk={this.modalOk}
        onCancel={this.modalClose}
      >
        <Form onSubmit={this.submitForm}>
          <Row gutter={10}>
            <Col span={14}>
              <Form.Item label="客户经理" className={styles.formItem}>
                {getFieldDecorator('accountCustom')(
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
          loading={chooseCustomListLoading}
          dataSource={dataSource}
          columns={columns}
          pagination={chooseCustomPagination}
        />
      </Modal>
    );
  }
}

export default ChooseCustom;
