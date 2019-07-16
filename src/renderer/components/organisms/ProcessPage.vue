<template>
  <div class="process-page">
    <ProcessPageHeader
      :title="processTitle"
      @startProcess="startProcess"
      @closeProcess="closeProcess">
    </ProcessPageHeader>
    <ProcessPageContent
      :messages="messages">
    </ProcessPageContent>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ProcessPageHeader from "../molecules/processpage/ProcessPageHeader.vue";
import ProcessPageContent from "../molecules/processpage/ProcessPageContent.vue";
import { processModule } from "../../store/modules/ProcessModule";
import { Process } from "../../../database/models/Process";
import { messageModule } from "../../store/modules/MessageModule";
import { Message } from "../../../database/models/Message";
import { Project } from "../../../database/models/Project";
import { projectModule } from "../../store/modules/ProjectModule";
import { execModule } from "../../store/modules/ExecModule";
import { Exec } from "../../../database/models/Exec";
import { ipcRenderer } from "electron";

@Component({
  name: "process-page",
  components: { ProcessPageHeader, ProcessPageContent }
})
export default class ProcessPage extends Vue {
  @Prop(String) processId!: string;

  public get processTitle() {
    const proc: Process | undefined = processModule.processes.find((process: Process) => process._id === Number.parseInt(this.processId, 10));
    if (proc) return proc._name;
  }

  public get messages() {
    return messageModule.messages.filter((message: Message) => message._process_id === Number.parseInt(this.processId, 10));
  }

  public startProcess() {
    const process: Process | undefined = processModule.processes.find((fProcess: Process) => fProcess._id === Number.parseInt(this.processId, 10));
    if (!process) return ;
    const project: Project | undefined = projectModule.projects.find((fProject: Project) => fProject._id === process._project_id);
    const exec: Exec | undefined = execModule.execs.find((fExec: Exec) => fExec._id === process._exec_id);
    if (!project || !exec) return ;
    const args = {
      exec: exec._path,
      args: process._args,
      folder: project._directoryPath,
      processid: process._id
    };
    ipcRenderer.send("startExec", args);
  }

  public closeProcess() {
    const pId = Number.parseInt(this.processId, 10);
    const arg = {
      processid: pId
    };
    ipcRenderer.send("closeExec", arg);
  }
}
</script>

<style lang="scss" scoped>
.process-page {
  overflow: hidden;
}
</style>

