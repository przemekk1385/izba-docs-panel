<template>
  <el-header> &gt; <span style="color: #409eff">izba</span>Docs </el-header>
  <el-main style="min-height: calc(100vh - 120px)">
    <router-view></router-view>
  </el-main>
  <el-footer style="font-size: var(--el-font-size-extra-small)">
    &copy; 2021 PK
  </el-footer>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #303133;
}
</style>
