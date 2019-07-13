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
import { ipcRenderer } from "electron";
import { Message } from "../database/models/Message";

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

    ipcRenderer.on("message", (event: Event, arg: {context: any, process_id: any}) => {
      const message: Message = new Message();
      message._context = arg.context;
      message._process_id = arg.process_id;
      messageModule.addMessage(message);
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
