<template>
  <div>
    <ProcessModal
      v-if="processModalFlag"
      :execs="execs"
      @clickOutsideWindow="closeProcessModal"
      @clickCancel="closeProcessModal"
      @clickRegist="registProcess"
    />
    <ProjectPageHeader
      :projectTitle="projectTitle"
      :projectDescription="projectDescription"
      @clickAddProcess="openProcessModal"
    />
    <ProjectPageContent :processes="processes"
      @startProcess="startProcess"
      @endProcess="endProcess"
      @deleteProcess="deleteProcess"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ProcessModal from "../molecules/modal/ProcessModal.vue";
import ProjectPageHeader from "../molecules/projectpage/ProjectPageHeader.vue";
import ProjectPageContent from "../molecules/projectpage/ProjectPageContent.vue";
import { Process } from "../../../database/models/Process";
import { projectModule } from "../../store/modules/ProjectModule";
import { Project } from "../../../database/models/Project";
import { modalModule } from "../../store/modules/ModalModule";
import { execModule } from "../../store/modules/ExecModule";
import { processModule } from "../../store/modules/ProcessModule";
import { ipcRenderer } from "electron";
import { Exec } from "../../../database/models/Exec";

@Component({
  name: "project-page",
  components: { ProjectPageHeader, ProjectPageContent, ProcessModal }
})
export default class ProjectPage extends Vue {
  @Prop(String) readonly projectId!: string;

  /**
   * プロセスモーダルの状態
   */
  public get processModalFlag() {
    return modalModule.processModal;
  }

  /**
   * ストアのProcess一覧を返す
   */
  public get processes() {
    return processModule.processes.filter((process: Process) => process._project_id === Number.parseInt(this.projectId, 10));
  }

  /**
   * プロジェクトタイトルを返す
   */
  public get projectTitle() {
    const id: number = Number.parseInt(this.projectId, 10);
    const projects: Array<Project> = projectModule.projects;
    const result: Project | undefined = projects.find((project: Project) => project._id === id);
    if (result) return result._name;
  }

  /**
   * プロジェクト概要を返す
   */
  public get projectDescription() {
    const id: number = Number.parseInt(this.projectId, 10);
    const projects: Array<Project> = projectModule.projects;
    const result: Project | undefined = projects.find((project: Project) => project._id === id);
    if (result) return result._description;
  }

  /**
   * ストアのExec一覧を返す
   */
  public get execs() {
    return execModule.execs;
  }

  /**
   * プロセスモーダルを開く
   */
  public openProcessModal() {
    modalModule.openProcessModal();
  }

  /**
   * プロセス開始
   */
  public startProcess(process: Process) {
    const project = projectModule.projects.find((findProject: Project) => findProject._id === Number.parseInt(this.projectId, 10));
    const exec = execModule.execs.find((findExec: Exec) => findExec._id === process._exec_id);
    if (!project || !exec) return;
    const args = {
      exec: exec._path,
      args: process._args,
      folder: project._directoryPath,
      processid: process._id
    };
    ipcRenderer.send("startExec", args);
  }

  /**
   * プロセス停止
   */
  public endProcess(process: Process) {
    const arg = {
      processid: process._id
    };
    ipcRenderer.send("closeExec", arg);
  }

  /**
   * プロセス削除
   */
  public deleteProcess(process: Process) {}

  /**
   * プロセスモーダルを閉じる
   */
  public closeProcessModal() {
    modalModule.closeProcessModal();
  }

  /**
   * Processをストアに登録する
   */
  public registProcess(process: Process) {
    process._project_id = Number.parseInt(this.projectId, 10);
    processModule.addProcess(process);
    modalModule.closeProcessModal();
  }
}
</script>
