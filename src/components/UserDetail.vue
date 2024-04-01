<template>
  <div>
    <div class="tile">
      <h2>User Administration</h2>
    </div>

    <div class="user-info">
      <div v-if="user">
        <p>Id: {{ user.user.id }}</p>
        <p>Name: {{ user.user.name }}</p>
        <p>Email: {{ user.user.email }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
      <button class="edit-button" @click="editUser()">Edit</button>
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
        .get(`${process.env.VUE_APP_API_URL}/${this.$route.params.id}`)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    },
    editUser() {
      const userId = this.$route.params.id;
      this.$router.push({ name: "UserEdit", params: { id: userId } });
    },
  },
};
</script>
<style scoped>
/* CSS cho container của thông tin người dùng */
.user-info {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* CSS cho hình ảnh người dùng */
.user-info img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: block;
}

/* CSS cho tên người dùng */
.user-info h2 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
}

/* CSS cho email người dùng */
.user-info p {
  font-size: 16px;
  color: #666;
  text-align: center;
}

/* CSS cho nút sửa thông tin */
.edit-button {
  display: block;
  width: 100px;
  margin: 20px auto 0;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* CSS cho nút sửa thông tin hover */
.edit-button:hover {
  opacity: 0.8;
}
</style>