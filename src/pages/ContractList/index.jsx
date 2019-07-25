import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import {
  Row, Col, Form, Input, DatePicker, Select, Button, Table,
} from 'antd';
import { BlankLine } from '@/components';
import { delay } from '@/utils/utils';
import styles from './index.less';

const { Option } = Select;

@connect(({ contractList }) => ({ contractList }))
@Form.create()
class SearchInList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getList = this.getList.bind(this);
    this.tableSearch = this.tableSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  getList(pageNum = 1) {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { signeddate } = values;
        const data = { ...values, signeddate: signeddate && signeddate.format('YYYY-MM-DD') };
        dispatch({
          type: 'contractList/list',
          payload: { ...data, pageNum },
        });
      }
    });
  }

  tableSearch(e) {
    e.preventDefault();
    this.getList();
  }

  handleReset() {
    const { form: { resetFields } } = this.props;
    resetFields();
  }

  render() {
    const { form: { getFieldDecorator }, contractList: { tableLoading, list, paginationOption } } = this.props;
    paginationOption.onChange = this.getList;
    paginationOption.onShowSizeChange = this.getList;

    // 设置映射关系
    const dataSource = list.map(i => ({
      id: i.id,
      key: i.id,
      contractId: i.contractId,
      businessId: i.businessId,
      contractType: i.contractType,
      customAKA: i.customAKA,
      timestrap: i.timestrap,
      during: i.during,
      fee: i.fee,
      number: i.number,
    }));
    const columns = [
      {
        title: '合同编号',
        dataIndex: 'contractId',
        key: 'contractId',
        render: (text, record) => <Link to={`/user/detail?id=${record.id}`}>{text}</Link>,
      },
      {
        title: '业务编号',
        dataIndex: 'businessId',
        key: 'businessId',
      },
      {
        title: '合同类型',
        dataIndex: 'contractType',
        key: 'contractType',
      },
      {
        title: '客户简称',
        dataIndex: 'customAKA',
        key: 'customAKA',
      },
      {
        title: '签约日期',
        dataIndex: 'timestrap',
        key: 'timestrap',
      },
      {
        title: '有效期',
        dataIndex: 'during',
        key: 'during',
      },
      {
        title: '合同金额',
        dataIndex: 'fee',
        key: 'fee',
      },
      {
        title: '订单个数',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: () => 1,
      },
    ];

    return (
      <>
        {/* 搜索部分 */}
        <Form onSubmit={this.tableSearch}>
          <BlankLine />
          <Row gutter={10}>
            <Col span={5}>
              <Form.Item className={styles.searchItem} label="合同编号">
                {getFieldDecorator('concode', {})(
                  <Input
                    placeholder="请输入合同编号"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item className={styles.searchItem} label="客户名称">
                {getFieldDecorator('accountall', {})(
                  <Input
                    placeholder="请输入客户名称"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item className={styles.searchItem} label="合同类型">
                {getFieldDecorator('contype', { initialValue: '' })(
                  <Select style={{ width: 140 }}>
                    <Option value="">全部</Option>
                    <Option value="1">普通合同</Option>
                    <Option value="2">框架合同</Option>
                    <Option value="3">代理合同</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item className={styles.searchItem} label="签约日期">
                {getFieldDecorator('signeddate', {})(
                  <DatePicker />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={2}>
              <Button loading={tableLoading} htmlType="submit" type="primary">搜索</Button>
            </Col>
            <Col span={2}>
              <Button type="danger" onClick={this.handleReset}>清空</Button>
            </Col>
          </Row>
        </Form>
        <BlankLine len={2} />
        {/* 列表部分 */}
        <Table
          loading={tableLoading}
          rowKey={record => record.key}
          dataSource={dataSource}
          columns={columns}
          pagination={paginationOption}
        />
      </>
    );
  }
}

export default SearchInList;
