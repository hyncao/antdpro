import { getOperatorName, timeFormat } from '@/utils/utils';

/**
 * 接口映射规则
 * 设置映射规则好处：
 * 开发阶段不需要知道准确接口字段名
 * 联调时只需要更改规则即可
 */
export const getDataSource = list =>
  list.map(i => ({
    id: i.id,
    key: i.id,
    channelNames: i.channelNames,
    provinceCityNames: i.provinceCityNames,
    usableOperator: i.usableOperator,
    name: i.name,
    type: i.type,
    startDate: i.startDate,
    endDate: i.endDate,
    mapStatus: i.mapStatus,
    cashedCount: i.cashedCount,
    usedCount: i.usedCount,
  }));

export const columnsArr = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 100,
    textWrap: 'word-break',
    ellipsis: true,
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id2',
    width: 100,
    textWrap: 'word-break',
    ellipsis: true,
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id3',
    width: 100,
    textWrap: 'word-break',
    ellipsis: true,
  },
  {
    title: '渠道',
    dataIndex: 'channelNames',
    key: 'channelNames',
    width: 100,
  },
  {
    title: '所属省市',
    dataIndex: 'provinceCityNames',
    key: 'provinceCityNames',
  },
  {
    title: '运营商',
    dataIndex: 'usableOperator',
    key: 'usableOperator',
    render: (text, record) => getOperatorName(record.usableOperator),
  },
  {
    title: '优惠券名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '优惠券类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '有效期',
    dataIndex: 'startDate',
    key: 'startDate',
    render: (text, record) => `${timeFormat(record.startDate)} ~ ${timeFormat(record.endDate)}`,
  },
  {
    title: '状态',
    dataIndex: 'mapStatus',
    key: 'mapStatus',
  },
  {
    title: '领用数量',
    dataIndex: 'cashedCount',
    key: 'cashedCount',
  },
  {
    title: '使用数量',
    dataIndex: 'usedCount',
    key: 'usedCount',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
  },
];
