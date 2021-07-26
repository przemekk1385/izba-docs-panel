<template>
  <el-row class="row-bg" justify="center">
    <el-col :span="8">
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-position="right"
        label-width="100px"
      >
        <el-form-item
          label="Username"
          prop="username"
          :rules="[{ required: true, message: 'Username is required.' }]"
        >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password"
          :rules="[{ required: true, message: 'Password is required.' }]"
        >
          <el-input v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validateLoginForm">Login</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        username: undefined,
        password: undefined,
      },
    };
  },
  computed: {
    ...mapGetters({ isAuthenticated: "isAuthenticated" }),
    errorMessage() {
      return this.$store.state.errorMessage;
    },
  },
  methods: {
    ...mapActions({ login: "login" }),
    async submitLoginForm() {
      const { username, password } = this;

      await this.login({ username, password });

      if (this.isAuthenticated) {
        this.$router.push({ name: "List" });
      } else {
        this.$notify.error({
          title: "Error",
          message: this.errorMessage,
        });
      }
    },
    validateLoginForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.submitLoginForm();
        }
      });
    },
  },
};
</script>
