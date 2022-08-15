import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import User from './components/User.vue'


Vue.use(Router)

export default new Router({ 
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/user',
      component: User
    },
    {
      path: "/static",
      Dictionary: "/src/assets/"
    }
    
  ]
})

