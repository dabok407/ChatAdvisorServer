import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import IndexPage from '@/components/IndexPage'
import LoginPage from '@/components/LoginPage'
import Chat from '@/components/Chat'


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/loginPage',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
