<template>
  <el-row class="row-bg" justify="center">
    <el-col :span="8">
      <el-form label-position="right" label-width="100px">
        <el-form-item label="Użytkownik">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="Hasło">
          <el-input v-model="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Zaloguj</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      username: undefined,
      password: undefined,
    };
  },
};
</script>
