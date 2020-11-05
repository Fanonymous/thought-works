import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import agent from './modules/agent'
Vue.use(VueRouter)

const common = [
  {
    path: '/',
    redirect: 'agent-list'
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/common/404'),
    meta: {
      title: '页面不见了'
    }
  }
]
const staticRouters = [
  ...agent,
  ...common
]

const createRouter = () =>
  new VueRouter({
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition && to.meta.keepAlive) {
        return savedPosition
      }
      return { x: 0, y: 0 }
    },
    routes: staticRouters
  })
const router = createRouter()

router.beforeEach((to, from, next) => {
  // 根据token 和store中个人信息判断是否刷新
  const menu = [
    {
      id: '1',
      label: 'DASHBOARD',
      icon: 'icon-dashboard'
    },
    {
      id: '2',
      label: 'AGENT',
      icon: 'icon-sitemap',
      url: 'agent-list'
    },
    {
      id: '3',
      label: 'MY CRUISE',
      icon: 'icon-boat'
    },
    {
      id: '4',
      label: 'HELP',
      icon: 'icon-life-bouy'
    }
  ]
  setTimeout(() =>{
    store.commit('common/SET_MENU_LIST', menu)
    next()
  }, 500)
})

export default router
