<template>
  <div id="edit-employee">
    <h3>Edit Employee</h3>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="name" type="text" v-model="employee.name" value="" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="dept" type="text" v-model="employee.dept" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="position" type="text" v-model="employee.position" required>
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <button type="submit" class="btn">Update</button>
          </div>
          <div class="col s6">
            <router-link to="/" class="btn grey">Cancel</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'edit-employee',
  data () {
    return {
      employee: {}
    }
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
    updateEmployee () {
      db.collection('employees').where('id', '==', this.$route.params.id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            id: this.employee.id,
            name: this.employee.name,
            dept: this.employee.dept,
            position: this.employee.position
          })
          .then(() => {
            this.$router.push({ name: 'view-employee', params: { id: this.employee.id }})
          });
        })
      })
    }
  }
}
</script>

<style>

</style>
