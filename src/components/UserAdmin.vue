<!-- UserAdmin.vue -->
<template>
  <div>
    <h2>User Administration</h2>
    <form @submit.prevent="createUser">
      <div class="mr-bt-10">
        <label for="name">Name:</label>
        <input type="text" v-model="newUser.name" id="name" />
      </div>
      <div class="mr-bt-10">
        <label for="email">Email:</label>
        <input type="email" v-model="newUser.email" id="email" />
      </div>
      <div class="mr-bt-10">
        <label for="password">Password:</label>
        <input type="password" v-model="newUser.password" id="password" />
      </div>
      <button type="submit">Create User</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="viewUser(user)">View</button>
            <button @click="editUser(user)">Edit</button>
            <button @click="deleteUser(user)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent
      :totalPages="totalPages"
      :currentPage="currentPage"
      @page-changed="fetchUsers"
    />
  </div>
</template>

<script>
import axios from "axios"; // Import axios ở đây
import PaginationComponent from "./PaginationComponent.vue"; // Import component Pagination

export default {
  components: {
    PaginationComponent, // Đăng ký component Pagination
  },
  data() {
    return {
      users: [],
      newUser: {
        name: "",
        email: "",
        password: "",
      },
      totalPages: 1,
      currentPage: 1,
    };
  },
  mounted() {
    // Gọi API để lấy dữ liệu người dùng khi component được mount
    this.fetchUsers(1);
  },
  methods: {
    createUser() {
      axios
        .post("http://localhost/exApiBE/public/api/users/add", this.newUser)
        .then((response) => {
          console.log("User created successfully:", response.data);
          // Cập nhật lại danh sách người dùng sau khi tạo thành công
          this.fetchUsers();
          // Xóa dữ liệu trong form sau khi tạo thành công
          this.newUser.name = "";
          this.newUser.email = "";
          this.newUser.password = "";
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    },
    fetchUsers(page) {
      axios
        .get("http://localhost/exApiBE/public/api/users", {
          params: {
            perPage: this.perPage,
            page: page, // Truyền số trang mới
          },
        })
        .then((response) => {
          this.users = response.data.data; // Dữ liệu người dùng
          this.totalPages = response.data.last_page; // Tổng số trang
          this.currentPage = page;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },

    viewUser(user) {
      this.$router.push({ name: "UserDetail", params: { id: user.id } });
    },
    editUser(user) {
      this.$router.push({ name: "UserEdit", params: { id: user.id } });
    },
    deleteUser(user) {
      if (confirm("Are you sure you want to delete this user?")) {
        axios
          .delete(`http://localhost/exApiBE/public/api/users/${user.id}`)
          .then((response) => {
            console.log("User deleted successfully:", response.data);
            // Xóa người dùng khỏi danh sách hiển thị
            const index = this.users.findIndex((u) => u.id === user.id);
            if (index !== -1) {
              this.users.splice(index, 1); // Xóa người dùng khỏi mảng
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      }
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
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
button {
  margin: 2px;
  cursor: pointer;
}
</style>
