import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      component: require("../components/organisms/HomePage.vue").default,
      name: "home-page",
      path: "/",
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
