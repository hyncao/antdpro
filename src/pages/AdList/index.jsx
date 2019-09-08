import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import {
  Form, DatePicker, Button, Table,
} from 'antd';
import { BlankLine, SearchBox } from '@/components/index.jsx';
import styles from './index.less';

const { RangePicker } = DatePicker;

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

  getList(pageNo = 1) {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { signeddate } = values;
        const data = { ...values, signeddate: signeddate && signeddate.format('YYYY-MM-DD') };
        dispatch({
          type: 'adList/list',
          payload: { ...data, pageNo, pageSize: 10 },
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
      form,
      adList: {
        tableLoading, list, paginationOption,
      },
    } = this.props;
    paginationOption.onChange = this.getList;
    paginationOption.onShowSizeChange = this.getList;

    const searchArr = [
      {
        name: 'createDate',
        label: '添加日期',
        component: <RangePicker className={styles.ranger} />,
      },
      {
        name: 'mediaName',
        label: '广告名称',
        maxLength: 16,
      },
      {
        name: 'customerName',
        label: '视频所属',
        maxLength: 16,
        authLimit: 'admin',
      },
      {
        name: 'orginalName',
        label: '视频名称',
        maxLength: 32,
      },
      {
        name: 'dcpName',
        label: 'DCP名称',
        maxLength: 32,
      },
      {
        name: 'source',
        label: 'DCP来源',
        maxLength: 32,
      },
      {
        name: 'state',
        label: '广告状态',
        initialValue: '',
        options: [{ value: '', text: '全部' }, { value: '1', text: '转码中' }, { value: '2', text: '转码完成' }],
      },
      {
        name: 'audditState',
        label: '审核状态',
        initialValue: '',
        options: [{ value: 1, text: '全部' }, { value: 2, text: '待审' }, { value: 3, text: '拒绝' }, { value: 4, text: '通过' }],
      },
      {
        name: 'publishState',
        label: '广告类别',
        initialValue: '',
        options: [{ value: '', text: '全部' }, { value: '1', text: '公益' }, { value: '2', text: '商业' }],
      },
    ]

    const bonusBtn = [{ id: '1', btn: <Link to="/ad/detail"><Button type="primary">新增合同</Button></Link> }];

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
        <SearchBox
          form={form}
          handleSearch={this.getList}
          searchLoading={tableLoading}
          searchArr={searchArr}
          bonusBtn={bonusBtn}
        />
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
