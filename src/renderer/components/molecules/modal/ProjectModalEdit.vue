<template>
  <BaseModal @clickOutsideWindow="clickOutsideWindow">
    <template v-slot:header>
      <BaseTitle>新規プロジェクト</BaseTitle>
    </template>
    <template v-slot:content>
      <div class="project-modal-content">
        <BaseLabel>プロジェクト名</BaseLabel>
        <BaseInput v-model="projectName"></BaseInput>
        <BaseLabel>概要</BaseLabel>
        <BaseInput v-model="projectDescription"></BaseInput>
        <BaseLabel>フォルダ</BaseLabel>
        <BaseInput v-model="projectDirectory"></BaseInput>
        <BaseButton @click="clickSelectDirectory">選択</BaseButton>
      </div>
    </template>
    <template v-slot:footer>
      <BaseButton @click="clickCancel">キャンセル</BaseButton>
      <BaseButton @click="clickRegist">追加</BaseButton>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import BaseModal from "../../atoms/BaseModal.vue";
import BaseTitle from "../../atoms/BaseTitle.vue";
import BaseButton from "../../atoms/BaseButton.vue";
import BaseLabel from "../../atoms/BaseLabel.vue";
import BaseInput from "../../atoms/BaseInput.vue";
import { Project } from "../../../../database/models/Project";
import { remote } from "electron";

@Component({
  name: "project-modal-edit",
  components: { BaseModal, BaseTitle, BaseButton, BaseLabel, BaseInput }
})
export default class ProjectModalEdit extends Vue {
  @Prop(String) pProjectId!: string;
  @Prop(String) pProjectName!: string;
  @Prop(String) pProjectDescription!: string;
  @Prop(String) pProjectDirectory!: string;

  private projectId: string = this.pProjectId;
  // プロジェクト名
  private projectName: string = this.pProjectName;
  // プロジェクト概要
  private projectDescription: string = this.pProjectDescription;
  // プロジェクトCWD
  private projectDirectory: string = this.pProjectDirectory;

  /**
   * ディレクトリ選択ダイアログ表示
   * 選択時にプロジェクトCWD設定
   */
  public clickSelectDirectory() {
    const directory: Array<string> | undefined = remote.dialog.showOpenDialog({
      title: "ディレクトリ選択",
      defaultPath: ".",
      properties: ["openDirectory"]
    });
    if (directory) this.projectDirectory = directory[0];
  }

  /**
   * モーダル外クリックイベント
   */
  @Emit("clickOutsideWindow")
  public clickOutsideWindow() {}

  /**
   * キャンセルボタンクリックイベント
   */
  @Emit("clickCancel")
  public clickCancel() {}

  /**
   * 追加ボタンクリックイベント
   * 入力値を親コンポーネントに送る
   */
  @Emit("clickRegist")
  public clickRegist() {
    const project: Project = new Project();
    project._id = Number.parseInt(this.projectId);
    project._name = this.projectName;
    project._description = this.projectDescription;
    project._directoryPath = this.projectDirectory;
    return project;
  }
}
</script>

<style lang="scss" scoped>
.project-modal-content {
  display: flex;
  flex-direction: column;
}
</style>
