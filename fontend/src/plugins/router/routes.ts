export const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'typography',
        component: () => import('@/pages/typography.vue'),
      },
      {
        path: 'icons',
        component: () => import('@/pages/icons.vue'),
      },
      {
        path: 'cards',
        component: () => import('@/pages/cards.vue'),
      },
      {
        path: 'tables',
        component: () => import('@/pages/tables.vue'),
      },
      {
        path: 'form-layouts',
        component: () => import('@/pages/form-layouts.vue'),
      },
        {
          path: 'Report',
          component: () => import('@/pages/AccountReport.vue'),
        },
        {
          path: 'SocialTrading',
          component: () => import('@/pages/SocialTrading.vue'),
        },
        {
          path: 'Strategy',
          component: () => import('@/pages/CopyStrategies.vue'),
        },
        {
          path: 'TradingManager',
          component: () => import('@/pages/TradeOrders.vue'),
        },
        {
          path: 'EaManager',
          component: () => import('@/pages/EaManager.vue'),
        },
        {
          path: 'UserManager',
          component: () => import('@/pages/UserManager.vue'),
        },
        {
          path: 'ConnectionManager',
          component: () => import('@/pages/ConnectionManager.vue'),
        },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
