<template>
  <div class="pagination">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      // Phát ra sự kiện khi người dùng chọn một trang
      this.$emit("page-changed", page);
    },
  },
};
</script>
<style scoped>
.pagination {
  text-align: center;
  margin: 10px 0;
}
.pagination button {
  margin: 2px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: none;
  border: 1px solid #ccc;
}
.pagination button.active {
  background: #0355d9;
  border-color: #0355d9;
  color: #fff;
}
</style>