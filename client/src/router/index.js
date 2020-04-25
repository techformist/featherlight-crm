import Vue from "vue";

import store from "../store/index";

import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// function requireAuth(to, from, next) {
//   if (store.state.authentication.token) next();
//   else next("/login");
// }

function dynamicHome(to, from, next) {
  // this should be ideally replaced by store.getters["auth/isAuthenticated"]
  // .. in newer versions
  if (store.state.auth.accessToken) next("/dashboard");
  else next();
}

function logout(to, from, next) {
  store.dispatch("auth/logout");
  next("/login");
}

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: dynamicHome,
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: logout,
  },
  {
    path: "/terms",
    name: "Terms",
    component: () =>
      import(/* webpackChunkName: "terms" */ "../views/Terms.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
  },
  {
    path: "/contacts",
    name: "Contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "/activities",
    name: "Activity",
    component: () => import("../views/Activity.vue"),
  },
  {
    path: "/contact-us",
    name: "Contact Us",
    component: () =>
      import(/* webpackChunkName: "contact-us" */ "../views/ContactUs.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    // catch all 404
    path: "*",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
