export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/',
        redirect: './user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        icon: 'login',
        component: './Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/ad',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/ad',
        name: 'ad',
        icon: 'unordered-list',
        routes: [
          {
            path: '/ad/list',
            name: 'list',
            component: './AdList',
          }
        ]
      }
    ]
  },
  {
    path: '/contract',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/contract',
        name: 'contract',
        icon: 'unordered-list',
        routes: [
          {
            path: '/contract/list',
            name: 'list',
            component: './ContractList',
          }
        ]
      }
    ]
  },
  {
    path: '/',
    routes: [
      {
        path: '/',
        redirect: './user/login',
      },
    ],
  },
  {
    component: './404',
  },
]