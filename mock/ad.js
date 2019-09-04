import { delay } from '@/utils/utils';

export default {
  'POST /api/ad/getList': async (req, res) => {
    await delay(2000);
    const { body } = req;
    res.send({
      code: 200,
      list: [
        {
          id: '1',
          createDate: '2019-07-24',
          title: '广告1',
          videoTitle: '视频名称',
          dcpTitle: 'shipin',
          channelNum: 5,
          dcpSource: '平台',
          adState: '转码完成',
          type: '商业',
          state: '审核通过',
        },
        {
          id: '2',
          createDate: '2019-07-24',
          title: '广告2',
          videoTitle: '视频名称',
          dcpTitle: 'shipin',
          channelNum: 2,
          dcpSource: '平台',
          adState: '转码完成',
          type: '商业',
          state: '审核通过',
        },
        {
          id: '3',
          createDate: '2019-07-24',
          title: '广告3',
          videoTitle: '视频名称',
          dcpTitle: 'shipin',
          channelNum: 8,
          dcpSource: '平台',
          adState: '转码完成',
          type: '商业',
          state: '审核通过',
        },
      ],
      currentPage: 0,
      total: 50,
    });
  },

  'POST /api/ad/getChooseCustom': async (req, res) => {
    await delay(2000);
    const { body: { accountCustom } } = req;
    let list;
    if (accountCustom) {
      list = [
        { id: '1', name: '客户一', aka: '一' },
      ];
    } else {
      list = [
        { id: '1', name: '客户一', aka: '一' },
        { id: '2', name: '客户二', aka: '二' },
        { id: '3', name: '客户三', aka: '三' },
        { id: '4', name: '客户四', aka: '四' },
        { id: '5', name: '客户五', aka: '五' },
        { id: '6', name: '客户六', aka: '六' },
        { id: '7', name: '客户七', aka: '七' },
        { id: '8', name: '客户八', aka: '八' },
      ];
    }
    res.send({
      code: 200,
      list,
      currentPage: 0,
      total: 30,
    });
  },
};
