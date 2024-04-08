import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
const sessionId = localStorage.getItem('session_id')

const handleBeforeEach = (to, from, next) => {
  if (to.path === '/login') {
    if (sessionId) {
      next({ path: '/' })
    } else {
      next()
    }
  }

  if (to.path === '/logout') {
    localStorage.clear()
    next({ path: '/login' })
  }

  if (to.meta.noLayout) {
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
