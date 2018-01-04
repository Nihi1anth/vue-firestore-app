import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../components/Dashboard'
import NewEmployee from '../components/NewEmployee'
import ViewEmployee from '../components/ViewEmployee'
import EditEmployee from '../components/EditEmployee'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee
    },
    {
      path: '/edit/:id',
      name: 'edit-employee',
      component: EditEmployee
    },
    {
      path: '/:id',
      name: 'view-employee',
      component: ViewEmployee
    }
  ]
})
