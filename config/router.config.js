export default [
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/',
        redirect: './login',
      },
      {
        path: '/login',
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
    path: '/',
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
          },
          {
            path: '/ad/detail',
            name: 'detail',
            component: './AdDetail',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ]
      },
      {
        path: '/contract',
        name: 'contract',
        icon: 'unordered-list',
        routes: [
          {
            path: '/contract/list',
            name: 'list',
            component: './ContractList',
          },
          {
            component: './404',
          },
        ]
      },
      {
        path: '/',
        redirect: './login',
      },
      {
        component: './404',
      },
    ]
  },
]