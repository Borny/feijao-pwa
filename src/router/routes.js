
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // meta: {requiresAuth: true},
    children: [
      {
        path: '/home', component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/picture/:id', component: () => import('pages/PicturePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/bet', component: () => import('pages/BetPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/gift', component: () => import('pages/GiftPage.vue'),
        meta: { requiresAuth: true },
      },

      // { path: '/admin',
      //   component: () => import('pages/AdminPage.vue'),
      //   meta: {requiresAuth: true}
      // },
    ]
  },

  // Log in
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: { requiresUnAuth: true }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
