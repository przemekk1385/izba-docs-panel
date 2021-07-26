import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/list",
    name: "List",
    // route level code-splitting
    // this generates a separate chunk (list.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "list" */ "../views/List.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
