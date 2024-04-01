<template>
  <div>
    <h2>User Detail</h2>
    <div v-if="user">
      <p>Id: {{ user.user.id }}</p>
      <p>Name: {{ user.user.name }}</p>
      <p>Email: {{ user.user.email }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      axios
        .get(
          `http://localhost/exApiBE/public/api/users/${this.$route.params.id}`
        )
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    },
  },
};
</script>
