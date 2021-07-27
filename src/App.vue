<template>
  <el-header>
    <el-container style="justify-content: space-between">
      <div style="display: inherit; align-items: center">
        &gt;<span style="color: #409eff">izba</span>Docs
      </div>
      <div v-if="isAuthenticated" style="display: inherit; align-items: center">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            View<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="Document">Documents</el-dropdown-item>
              <el-dropdown-item command="Event">Events</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button
          type="primary"
          icon="el-icon-switch-button"
          circle
          @click="logout"
          style="margin-left: 1em"
        ></el-button>
      </div>
    </el-container>
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
    handleCommand(command) {
      this.$router.push({ name: command });
    },
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
