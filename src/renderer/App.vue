<template>
  <IndexPage />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IndexPage from "./components/pages/IndexPage.vue";
import { projectModule } from "./store/modules/ProjectModule";
import { execModule } from "./store/modules/ExecModule";
import { processModule } from "./store/modules/ProcessModule";
import { messageModule } from "./store/modules/MessageModule";

@Component({
  name: "app",
  components: { IndexPage }
})
export default class App extends Vue {
  public created() {
    projectModule.initProject();
    execModule.initExec();
    processModule.initProcess();
    messageModule.initMessage();
  }
}
</script>

<style lang="scss" scoped>
</style>
