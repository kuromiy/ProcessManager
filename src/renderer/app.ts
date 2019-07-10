import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// tslint:disable-next-line:no-var-requires
require("../scss/style.scss");

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
