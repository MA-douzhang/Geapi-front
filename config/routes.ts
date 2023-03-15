export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '接口管理页', icon: 'table', path: '/admin/interface_info', component: './InterfaceInfo' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
