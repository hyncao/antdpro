import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Form, Popconfirm, Button, Table } from 'antd';
import { BlankLine, SearchBox } from '@/components/index.jsx';
import { getDataSource, columnsArr } from './config';
import styles from './index.less';

@connect(({ couponList }) => ({ couponList }))
@Form.create()
class CouponList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const { dispatch } = this.props;
    // 获取渠道列表
    dispatch({
      type: 'couponList/getChannelList',
    });
    // 获取运营商列表
    dispatch({
      type: 'couponList/getOperatorList',
    });
    // 获取优惠券类型列表
    dispatch({
      type: 'couponList/getCouponType',
    });
    // 获取优惠券状态列表
    dispatch({
      type: 'couponList/getCouponStatus',
    });
    this.getList();
  }

  async getList(pageNum = 1) {
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'couponList/list',
          payload: { ...values, pageNum, pageSize: 10 },
        });
      }
    });
  }

  render() {
    const {
      form,
      couponList: {
        tableLoading,
        list,
        channelList,
        operatorList,
        couponTypeList,
        couponStatusList,
        paginationOption,
      },
    } = this.props;

    // 定义搜索组件数据组
    const searchArr = [
      {
        name: 'channelIds',
        label: '发布渠道',
        initialValue: '',
        options: channelList.map(i => ({ text: i.title, value: i.channel })),
      },
      {
        name: 'operatorCodes',
        label: '运营商',
        initialValue: [],
        options: operatorList.map(i => ({ text: i.name, value: i.id })),
        mode: 'multiple',
      },
      {
        name: 'name',
        label: '优惠券名称',
        initialValue: '',
      },
      {
        name: 'queryTypes',
        label: '优惠券类型',
        initialValue: [],
        options: couponTypeList.map(i => ({ text: i.name, value: i.id })),
        mode: 'multiple',
      },
      {
        name: 'statusList',
        label: '状态',
        initialValue: [],
        options: couponStatusList.map(i => ({ text: i.name, value: i.id })),
        mode: 'multiple',
      },
    ];

    // 设置接口映射
    const dataSource = getDataSource(list);

    // 设置表格内容渲染规则
    const columns = columnsArr.map(i => {
      if (i.key === 'type') {
        return {
          ...i,
          render: (text, record) =>
            couponTypeList.length && couponTypeList.filter(item => item.id === record.type)[0].name,
        };
      }
      if (i.key === 'mapStatus') {
        return {
          ...i,
          render: (text, record) =>
            couponStatusList.length &&
            couponStatusList.filter(item => item.id === record.mapStatus)[0].name,
        };
      }
      if (i.key === 'operate') {
        return {
          ...i,
          render: (text, record) => (
            <>
              <Link to={`/market/couponDetail?id=${record.id}`}>查看</Link>
              {['WAIT_ONLINE', 'SUSPEND'].indexOf(record.mapStatus) > -1 && (
                <Link to={`/market/couponDetail?id=${record.id}&edit=true`}>修改</Link>
              )}
              {['WAIT_ONLINE', 'SUSPEND'].indexOf(record.mapStatus) > -1 && (
                <Popconfirm
                  title="确定删除？"
                  onConfirm={() => this.handleOperator('delete', record)}
                >
                  <span style={{ color: 'red' }}>删除</span>
                </Popconfirm>
              )}
              {['ONLINE', 'GOING'].indexOf(record.mapStatus) > -1 && (
                <Popconfirm
                  title="确定下架？"
                  onConfirm={() => this.handleOperator('down', record)}
                >
                  <span style={{ color: 'red' }}>下架</span>
                </Popconfirm>
              )}
              {['WAIT_ONLINE', 'SUSPEND'].indexOf(record.mapStatus) > -1 && (
                <Popconfirm
                  title="确定上架？"
                  onConfirm={() => this.handleOperator('down', record)}
                >
                  <span style={{ color: 'red' }}>上架</span>
                </Popconfirm>
              )}
              <span onClick={() => this.handleOperator('copy', record)}>复制</span>
            </>
          ),
        };
      }
      return { ...i };
    });

    return (
      <>
        {/* 搜索部分 */}
        <SearchBox
          form={form}
          handleSearch={this.getList}
          searchLoading={tableLoading}
          searchArr={searchArr}
        />
        <BlankLine />
        <Card bordered={false}>
          <Link to="/market/couponDetail">
            <Button type="primary" icon="plus" size="large">
              新建
            </Button>
          </Link>
          <BlankLine />
          {/* 列表部分 */}
          <Table
            loading={tableLoading}
            rowKey={record => record.key}
            dataSource={dataSource}
            scroll={{ x: true }}
            columns={columns}
            pagination={paginationOption}
          />
        </Card>
      </>
    );
  }
}

export default CouponList;
