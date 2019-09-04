import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import {
  Row, Col, Form, Input, DatePicker, Select, Button, Table,
} from 'antd';
import { BlankLine, ModalContractListAdd } from '@/components';
import styles from './index.less';

const { Option } = Select;

@connect(({ adList }) => ({ adList }))
@Form.create()
class AdList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getList = this.getList.bind(this);
    this.tableSearch = this.tableSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.addContract = this.addContract.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  getList(pageNum = 1) {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { signeddate } = values;
        const data = { ...values, signeddate: signeddate && signeddate.format('YYYY-MM-DD') };
        dispatch({
          type: 'adList/list',
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

  addContract() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adList/controlModal',
      payload: { modalVisible: true },
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      adList: {
        tableLoading, list, paginationOption, reloadFlag,
      },
    } = this.props;
    paginationOption.onChange = this.getList;
    paginationOption.onShowSizeChange = this.getList;

    if (reloadFlag) {
      this.getList();
    }

    // 设置映射关系
    const dataSource = list.map(i => ({
      id: i.id,
      key: i.id,
      createDate: i.createDate,
      title: i.title,
      videoTitle: i.videoTitle,
      dcpTitle: i.dcpTitle,
      channelNum: i.channelNum,
      dcpSource: i.dcpSource,
      adState: i.adState,
      type: i.type,
      state: i.state,
    }));
    const columns = [
      {
        title: '添加日期',
        dataIndex: 'createDate',
        key: 'createDate',
      },
      {
        title: '广告名称',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '视频名称',
        dataIndex: 'videoTitle',
        key: 'videoTitle',
      },
      {
        title: 'DCP名称',
        dataIndex: 'dcpTitle',
        key: 'dcpTitle',
      },
      {
        title: '通道个数',
        dataIndex: 'channelNum',
        key: 'channelNum',
      },
      {
        title: 'DCP来源',
        dataIndex: 'dcpSource',
        key: 'dcpSource',
      },
      {
        title: '广告状态',
        dataIndex: 'adState',
        key: 'adState',
      },
      {
        title: '广告类别',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '审核状态',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => <Link to={`/ad/detail?id=${record.id}`}>详情</Link>,
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
                    className={styles.ipt}
                    placeholder="请输入合同编号"
                    maxLength={16}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item className={styles.searchItem} label="客户名称">
                {getFieldDecorator('accountall', {})(
                  <Input
                    className={styles.ipt}
                    placeholder="请输入客户名称"
                    maxLength={32}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item className={styles.searchItem} label="合同类型">
                {getFieldDecorator('contype', { initialValue: '' })(
                  <Select style={{ width: 140 }} className={styles.ipt}>
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
                  <DatePicker className={styles.ipt} />,
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
            <Col span={3}>
              <Button type="primary" onClick={this.addContract}>新增合同</Button>
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
        {/* <ModalContractListAdd /> */}
      </>
    );
  }
}

export default AdList;
