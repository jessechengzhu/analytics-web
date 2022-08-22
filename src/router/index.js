import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

const Login = () => import('../components/Login.vue')
const Register = () => import('../components/Register.vue')
const Home = () => import('../components/Home.vue')
const Analytics = () => import('../components/Analytics.vue')
const Custom = () => import('../components/Custom.vue')
const Manage = () => import('../components/Manage.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: 'analytics',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home

    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics,
      meta: {
        requireAuth: true // 访问此url需要通过token进行auth认证
      }
    },
    {
      path: '/custom',
      name: 'custom',
      component: Custom,
      meta: {
        requireAuth: true // 访问此url需要通过token进行auth认证
      },
      children: [
        {
          // /custom/id
          path: ':id',
          component: Custom,
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
  NProgress.start()
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
router.afterEach(() => {
  NProgress.done()
})
export default router
