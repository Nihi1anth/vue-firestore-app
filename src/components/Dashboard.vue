<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header"><h4>First Names</h4></li>
      <li class="collection-item" 
      v-for="employee in employees" 
      :key="employee.id">
        <div class="chip">{{employee.dept}}</div>{{employee.id}}:{{employee.name}}
        <router-link class="secondary-content" :to="{name: 'view-employee', params: {id: employee.id}}">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'dashboard',
  data () {
    return {
      employees: []
    }
  },
  created () {
    db.collection('employees').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          this.employees.push(doc.data())
      })
    })
  }
}
</script>

<style>

</style>
