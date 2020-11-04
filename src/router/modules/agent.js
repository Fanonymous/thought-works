export default [
  {
    path: '/agent',
    component: () => import('@/views/layouts/index'),
    meta: {
      title: 'AGENT',
      keepAlive: false
    },
    children: [
      {
        path: '/agent-list',
        name: 'agent-list',
        component: () => import('@/views/agent/index'),
        meta: {
          title: 'AGENT LIST',
          keepAlive: true
        }
      }
    ]
  }
]
