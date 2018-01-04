<template>
  <div id="view-employee">
    <h3>View Employee</h3>
    <div class="row">
      <div class="col s12">
        <table class="responsive-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{{employee.id}}</td>
              <td>{{employee.name}}</td>
              <td>{{employee.dept}}</td>
              <td>{{employee.position}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col s6">
        <button @click="deleteEmployee" class="btn red">Delete</button>
      </div>
    </div>
    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-employee', params: { id: employee.id }}" class="btn-floating btn-large blue">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'view-employee',
  data () {
    return {
      employee: {}
    }
  },
  created () {
    // db.collection("employees").where("id", "==", this.$route.params.id)
    // .get()
    // .then(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     console.log(doc.data())
    //     this.employee = doc.data()
    //   })
    // })
  },
  beforeRouteEnter (to, from, next) {
    db.collection("employees").where("id", "==", to.params.id).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        next(vm => {
          vm.employee = doc.data()
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection("employees").
      where("id", "==", this.$route.params.id).
      get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.employee = doc.data()
        })
      })
    },
    deleteEmployee () {
      if(confirm ('Вы уверены?')) {
        db.collection('employees').
        where("id", "==", this.$route.params.id).get().
        then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete()
            this.$router.push('/')
          })
        })
      }
    }
  }
}
</script>

<style>

</style>
