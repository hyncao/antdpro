import { delay } from '@/utils/utils';

export default {
  'POST /api/ad/queryAdList': async (req, res) => {
    await delay(2000);
    res.send({
      code: 200,
      data: {
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
      },
      currentPage: 0,
      total: 50,
    });
  },

  'POST /api/ad/save': async (req, res) => {
    await delay(2000);
    res.send({
      code: 200,
    });
  },

  'POST /api/ad/upload': async (req, res) => {
    await delay(2000);
    res.send({
      code: 200,
      url: 'http://www.baidu.com',
    });
  },

  'POST /api/ad/detail': async (req, res) => {
    await delay(2000);
    const { id } = req.body;
    const data = {
      adTitle: `广告${id}`,
      attribute: id,
      chooseCustom: {
        name: `客户${id}`,
        id,
      },
      file: {
        id,
        name: `视频${id}`,
        size: 812123200,
        url: 'http://www.baidu.com',
      },
      zTitle: `zhuanma${id}`,
      wideChannel: 'S_JPEG2K,S_3D,S_MPEG2',
      blockChannel: 'F_JPEG2K',
      cutHead: 20,
    };
    res.send({
      code: 200,
      data,
    });
  },

  'POST /api/ad/queryCustomerList': async (req, res) => {
    await delay(2000);
    res.send({
      code: 200,
      list: [
        {
          id: '1',
          name: '客户1',
        },
        {
          id: '2',
          name: '客户2',
        },
        {
          id: '3',
          name: '客户3',
        },
        {
          id: '4',
          name: '客户4',
        },
        {
          id: '5',
          name: '客户5',
        },
      ],
    });
  },
};
