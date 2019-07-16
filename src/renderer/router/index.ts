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
      component: require("../components/organisms/ProjectPage.vue").default,
      name: "project-page",
      path: "/project/:projectId",
      props: true,
    },
    {
      component: require("../components/organisms/ProcessPage.vue").default,
      name: "process-page",
      path: "/process/:processId",
      props: true,
    },
    {
      component: require("../components/organisms/SettingPage.vue").default,
      name: "setting-page",
      path: "/setting",
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
