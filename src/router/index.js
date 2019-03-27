import Vue from 'vue'
import Router from 'vue-router'
// @指src
import Home from '../components/Home.vue'
import Analysis from '../components/Analysis.vue'
import Statistics from '../components/Statistics.vue'
import Manage from '../components/Manage.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home

    },
    {
      path: '/analysis',
      name: 'analysis',
      component: Analysis,
      meta: {
        requireAuth: true // 访问此url需要通过token进行auth认证
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      meta: {
        requireAuth: true // 访问此url需要通过token进行auth认证
      },
      children: [
        {
          // /statistics/id
          path: ':id',
          component: Statistics,
          meta: {
            requireAuth: true // 访问此url需要通过token进行auth认证
          }
        }
      ]
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      meta: {
        requireAuth: true // 访问此url需要通过token进行auth认证
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: 'other',
      component: Home
    }
  ]
})
// 全局导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    if (['login', 'register'].indexOf(to.name) >= 0) { // 已经登录了耍心机还想去登录
      next('/') // 不允许
    } else {
      next() // 想去哪就去哪
    }
  } else { // 没有token，到login页面登录取token
    if (to.meta.requireAuth) { // 并且要访问的页面需要token验证
      next('/login') // 去login登录获取token
    } else {
      next() // 并不需要token，直接跳转
    }
  }
})
export default router
