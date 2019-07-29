import { delay } from '@/utils/utils';

export default {
  'POST /api/contract/getList': async (req, res) => {
    await delay(2000);
    const { body } = req;
    res.send({
      code: 200,
      list: [
        {
          id: '1',
          contractId: 'CON-00001',
          businessId: '00001',
          contractType: '2',
          customAKA: '某公司',
          timestrap: '2019-07-24',
          during: '2019-07-24至2020-07-24',
          fee: 458000,
          number: 2,
        },
        {
          id: '2',
          contractId: 'CON-00002',
          businessId: '00002',
          contractType: '1',
          customAKA: '某公司',
          timestrap: '2019-07-24',
          during: '2019-07-24至2020-07-24',
          fee: 668000,
          number: 9,
        },
        {
          id: '3',
          contractId: 'CON-00003',
          businessId: '00003',
          contractType: '1',
          customAKA: '某公司',
          timestrap: '2019-06-24',
          during: '2019-07-24至2022-07-24',
          fee: 1988000,
          number: 12,
        },
      ],
      currentPage: 0,
      total: 50,
    });
  },

  'POST /api/contract/getChooseManager': async (req, res) => {
    await delay(2000);
    const { body: { accountManager } } = req;
    let list;
    if (accountManager) {
      list = [
        { id: '1', name: '赵经理' },
      ];
    } else {
      list = [
        { id: '1', name: '赵经理' },
        { id: '2', name: '钱经理' },
        { id: '3', name: '孙经理' },
        { id: '4', name: '李经理' },
        { id: '5', name: '周经理' },
        { id: '6', name: '吴经理' },
        { id: '7', name: '郑经理' },
        { id: '8', name: '王经理' },
      ];
    }
    res.send({
      code: 200,
      list,
      currentPage: 0,
      total: 30,
    });
  },

  'POST /api/contract/getChooseCustom': async (req, res) => {
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
