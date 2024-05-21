import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const handleBeforeEach = (to, from, next) => {
  const sessionId = localStorage.getItem('session_id')
  if (to.path === '/login') {
    if (sessionId) {
      next({ path: '/' })
    } else {
      next()
    }
  } else if (to.path === '/logout') {
    localStorage.clear()
    next({ path: '/login' })
  } else if (to.meta.noLayout) {
    next()
  } else {
    if (sessionId) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
}

router.beforeEach(handleBeforeEach);

export default router
