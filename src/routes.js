// import homePage from "./components/Home.vue";
import addBlog from "./components/addBlog.vue";
import Logout from "./components/auth/logout.vue";
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";
import ForgotPassword from './components/auth/forgotPassword.vue';
import AdminPanel from './components/auth/admin.vue';

export default [
  { path: "/", component: Login },
  { path: "/addBlog", component: addBlog },
  {
    path: "/logout",
    component: Logout,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/admin",
    component: AdminPanel,
  }
];