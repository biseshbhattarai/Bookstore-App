import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Book from '@/components/Book'
import Add from '@/components/Add'
import Details from '@/components/Details'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'book',
      component: Book
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/:id',
      name: 'details',
      component: Details
    },
    {
      path: '/book/:id',
      name: 'edit',
      component: Edit
    },
   
  ]
})
