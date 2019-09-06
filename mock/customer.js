import { delay } from '@/utils/utils';

export default {
  'POST /api/customer/getList': async (req, res) => {
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
