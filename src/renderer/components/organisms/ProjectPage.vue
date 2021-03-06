<template>
  <div>
    <ProcessModal
      v-if="processModalFlag"
      :execs="execs"
      @clickOutsideWindow="closeProcessModal"
      @clickCancel="closeProcessModal"
      @clickRegist="registProcess"
    />
    <ProcessModalEdit
      :pProcessId="processId"
      :pProcessName="processName"
      :pProcessArgs="processArgs"
      :pProcessExecId="processExecId"
      v-if="processModalEditFlag"
      :execs="execs"
      @clickOutsideWindow="closeProcessModalEdit"
      @clickCancel="closeProcessModalEdit"
      @clickRegist="updateProcess">
    </ProcessModalEdit>
    <ProjectModalEdit
      v-if="projectModalEditFlag"
      :pProjectId="projectId"
      :pProjectName="projectName"
      :pProjectDescription="pProjectDescription"
      :pProjectDirectory="pProjectDirectory"
      @clickOutsideWindow="closeProjectModalEdit"
      @clickCancel="closeProjectModalEdit"
      @clickRegist="updateProject">
    </ProjectModalEdit>
    <ProjectPageHeader
      :projectTitle="projectTitle"
      :projectDescription="projectDescription"
      @clickAddProcess="openProcessModal"
      @clickEditProject="openProjectModalEdit"
    />
    <ProjectPageContent :processes="processes"
      @startProcess="startProcess"
      @endProcess="endProcess"
      @updateProcess="openProcessModalEdit"
      @deleteProcess="deleteProcess"
      @clickProcess="moveProcessPage"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ProcessModal from "../molecules/modal/ProcessModal.vue";
import ProcessModalEdit from "../molecules/modal/ProcessModalEdit.vue";
import ProjectModalEdit from "../molecules/modal/ProjectModalEdit.vue"
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
  components: { ProjectPageHeader, ProjectPageContent, ProcessModal, ProjectModalEdit, ProcessModalEdit }
})
export default class ProjectPage extends Vue {
  @Prop(String) readonly projectId!: string;

  private projectName: string = "";
  private pProjectDescription: string = "";
  private pProjectDirectory: string = "";

  private processId: number = 0;
  private processName: string = "";
  private processArgs: string = "";
  private processExecId: number = 0;

  /**
   * プロセスモーダルの状態
   */
  public get processModalFlag() {
    return modalModule.processModal;
  }

  public get projectModalEditFlag() {
    return modalModule.projectModalEdit;
  }

  public get processModalEditFlag() {
    return modalModule.processModalEdit;
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

  public get projectDirectory() {
    const id: number = Number.parseInt(this.projectId, 10);
    const projects: Array<Project> = projectModule.projects;
    const result: Project | undefined = projects.find((project: Project) => project._id === id);
    if (result) return result._directoryPath;
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
    console.log(process._id);
    processModule.startProcess(process._id);
    ipcRenderer.send("startExec", args);
  }

  /**
   * プロセス停止
   */
  public endProcess(process: Process) {
    const arg = {
      processid: process._id
    };
    console.log(process._id);
    processModule.closeProcess(process._id);
    ipcRenderer.send("closeExec", arg);
  }

  /**
   * プロセス削除
   */
  public deleteProcess(process: Process) {
    processModule.deleteProcess(process);
  }

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
    process._status = false;
    processModule.addProcess(process);
    modalModule.closeProcessModal();
  }

  public openProjectModalEdit() {
    const id: number = Number.parseInt(this.projectId, 10);
    const projects: Array<Project> = projectModule.projects;
    const result: Project | undefined = projects.find((project: Project) => project._id === id);
    if (result) {
      this.projectName = result._name;
      this.pProjectDescription = result._description;
      this.pProjectDirectory = result._directoryPath;
      modalModule.openProjectModalEdit();
    }
  }

  public closeProjectModalEdit() {
    modalModule.closeProjectModalEdit();
  }

  public updateProject(project: Project) {
    projectModule.updateProject(project);
    modalModule.closeProjectModalEdit();
  }

  public openProcessModalEdit(process: Process) {
    this.processId = process._id;
    this.processName = process._name;
    this.processArgs = process._args;
    this.processExecId = process._exec_id;
    modalModule.openProcessModalEdit();
  }

  public closeProcessModalEdit() {
    modalModule.closeProcessModalEdit();
  }

  public updateProcess(process: Process) {
    process._project_id = Number.parseInt(this.projectId, 10);
    processModule.updateProcess(process);
    modalModule.closeProcessModalEdit();
  }

  public moveProcessPage(process: Process) {
    this.$router.push({name: "process-page", params: {processId: String(process._id)}});
  }
}
</script>
