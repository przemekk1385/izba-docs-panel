<template>
  <el-header>
    <el-row>
      <el-col :span="12"
        >&gt; <span style="color: #409eff">izba</span>Docs</el-col
      >
      <el-col :span="12" style="text-align: right"
        ><el-button
          v-if="isAuthenticated"
          type="primary"
          icon="el-icon-switch-button"
          circle
          @click="logout"
        ></el-button
      ></el-col>
    </el-row>
  </el-header>
  <el-main style="min-height: calc(100vh - 120px)">
    <router-view></router-view>
  </el-main>
  <el-footer style="font-size: var(--el-font-size-extra-small)">
    &copy; 2021 PK
  </el-footer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  computed: {
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
    }),
  },
  watch: {
    isAuthenticated(val) {
      if (!val) {
        this.$router.push({ name: "Login" });
      }
    },
  },
  methods: {
    ...mapActions({ logout: "logout" }),
  },
};
</script>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #303133;
}
</style>
