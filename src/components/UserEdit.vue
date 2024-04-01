<!-- EditUser.vue -->
<template>
  <div>
    <h2>Edit User</h2>
    <form @submit.prevent="submitForm">
      <div class="mr-bt-10">
        <label for="name">Name:</label>
        <input type="text" v-model="editedUser.name" id="name" />
      </div>
      <div class="mr-bt-10">
        <label for="email">Email:</label>
        <input type="email" v-model="editedUser.email" id="email" />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      editedUser: {
        id: null,
        name: "",
        email: "",
      },
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      const userId = this.$route.params.id;
      axios
        .get(`${process.env.VUE_APP_API_URL}/${userId}`)
        .then((response) => {
          this.editedUser = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    },
    submitForm() {
      const userId = this.$route.params.id;
      axios
        .put(`${process.env.VUE_APP_API_URL}/${userId}`, this.editedUser)
        .then((response) => {
          console.log("User updated successfully:", response.data);
          this.$router.push({ name: "UserAdmin" });
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    },
  },
};
</script>
<style scoped>
form {
  margin: 20px 0;
}
label {
  width: 100px;
  display: inline-block;
}
.mr-bt-10 {
  margin-bottom: 10px;
}
</style>