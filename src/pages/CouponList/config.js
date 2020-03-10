export const getDataSource = list =>
  list.map(i => ({
    id: i.id,
    key: i.id,
    createDate: i.createTime,
    title: i.mediaName,
    videoTitle: i.originalName,
    dcpTitle: i.dcpName,
    channelNum: i.dcpCount,
    dcpSource: i.source,
    adState: i.state,
    type: i.type,
    state: i.checkState,
  }));

export const columnsArr = [
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
  },
];
