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
    const { body: { keyword } } = req;
    let list;
    list = [
      { id: '1', name: '赵经理' },
    ];
    console.log(keyword);
    res.send({
      code: 200,
      list,
      currentPage: 0,
      total: 30,
    });
  },
};
