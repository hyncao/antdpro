import { delay } from '@/utils/utils';

export default {
  'POST /api/market/getCouponList': async (req, res) => {
    await delay(2000);
    res.send({
      code: 200,
      data: {
        list: [
          {
            id: '07006c06aebb2e66117d9d6103cd5fd0',
            name: 'test123',
            type: 'SINGLE_DISCOUNT',
            amount: 20,
            indateStart: null,
            indateEnd: null,
            indateType: 'DAY_COUNT',
            ruleText: '123',
            price: 0,
            usablePrice: 0,
            used: null,
            expirationStatus: 0,
            usableGoodsType: 'WIDE_BAND',
            usableOperator: '0',
            couponTimes: [],
            mapStatus: 'ENDED',
            usedCount: 1,
            cashedCount: 1,
            channelIds: 'alipay',
            channelNames: '支付宝',
            areaCodes: ['110100', '120100', '130100'],
            provinceCityNames: '北京北京市，天津天津市，河北石家庄市，河北唐山市',
            startDate: 1566230400000,
            endDate: 1566403199000,
            initStock: 20,
            usableDay: 1,
            userType: 'ALL_USER',
            userExcelLink: null,
            perTimeStock: 1,
            goodsExcelLink: null,
            status: 'ONLINE',
          },
          {
            id: 'a319788fa74f8342d4b919b34abedebb',
            name: '818',
            type: 'SINGLE_DISCOUNT',
            amount: 100,
            indateStart: 1565884800000,
            indateEnd: 1568735999000,
            indateType: 'TIME_SEG',
            ruleText: '123',
            price: 0,
            usablePrice: 0,
            used: null,
            expirationStatus: 0,
            usableGoodsType: 'MCARD',
            usableOperator: '2',
            couponTimes: [],
            mapStatus: 'ENDED',
            usedCount: 2,
            cashedCount: 2,
            channelIds: 'alipay',
            channelNames: '支付宝',
            areaCodes: ['110100', '120100', '130100', '130200', '130300'],
            provinceCityNames: '北京北京市，天津天津市，河北石家庄市，河北唐山市',
            startDate: 1565884800000,
            endDate: 1568822399000,
            initStock: 300,
            usableDay: 0,
            userType: 'ALL_USER',
            userExcelLink: null,
            perTimeStock: 20,
            goodsExcelLink: null,
            status: 'ONLINE',
          },
        ],
      },
      currentPage: 0,
      total: 50,
    });
  },

  'POST /api/market/getChannelList': (req, res) => {
    res.send({
      code: 200,
      data: {
        list: [
          {
            id: '1',
            channel: 'alipay',
            title: '支付宝',
          },
          {
            id: '2',
            channel: 'samsung',
            title: '三星',
          },
          {
            id: '3',
            channel: 'oppo',
            title: 'oppo',
          },
        ],
      },
    });
  },

  'POST /api/market/getOperatorList': (req, res) => {
    res.send({
      code: 200,
      data: {
        list: [
          {
            id: '0',
            name: '中国电信',
          },
          {
            id: '1',
            name: '中国联通',
          },
          {
            id: '2',
            name: '中国移动',
          },
          {
            id: '3',
            name: '华数',
          },
        ],
      },
      currentPage: 0,
      total: 50,
    });
  },

  'POST /api/market/getCouponType': (req, res) => {
    res.send({
      code: 200,
      data: {
        list: [
          { id: 'SINGLE_DISCOUNT', name: '单品优惠券' },
          { id: 'ENOUGH_DISCOUNT', name: '满减优惠券' },
          { id: 'PURCHASABLE_DISCOUNT', name: '低价购优惠券' },
          { id: 'PRE_DISCOUNT', name: '预约优惠券' },
        ],
      },
      currentPage: 0,
      total: 50,
    });
  },

  'POST /api/market/getCouponStatus': (req, res) => {
    res.send({
      code: 200,
      data: {
        list: [
          { id: 'STASH', name: '暂存' },
          { id: 'WAIT_ONLINE', name: '待上架' },
          { id: 'ONLINE', name: '未发放' },
          { id: 'GOING', name: '发放中' },
          { id: 'ENDED', name: '已发放' },
          { id: 'SUSPEND', name: '已中止' },
        ],
      },
      currentPage: 0,
      total: 50,
    });
  },
};
