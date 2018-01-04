<template>
  <div id="new-employee">
    <h3 class="center-align">New Employee</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="id" type="text" v-model="id" required>
            <label class="active" for="id">ID</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="name" type="text" v-model="name" required>
            <label class="active" for="name">Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="dept" type="text" v-model="dept" required>
            <label class="active" for="dept">Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="position" type="text" v-model="position" required>
            <label class="active" for="position">Position</label>
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <button type="submit" class="btn">Submit</button>
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
  name: 'new-employee',
  data () {
    return {
      
    }
  },
  methods: {
    saveEmployee () {
      // Add a new document with a generated id.
      db.collection("employees").add({
          id: this.id,
          name: this.name,
          dept: this.dept,
          position: this.position
      })
      .then(docRef => {
          this.$router.push('/')
          console.log("Document written with ID: ", docRef.id)
      })
      .catch(error => {
          console.error("Error adding document: ", error)
      });
    }
  }
}
</script>

<style>

</style>
