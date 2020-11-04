import Vue from 'vue'
import VueRouter from 'vue-router'
import agent from './modules/agent'
Vue.use(VueRouter)

const common = [
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
  next()
})

export default router
