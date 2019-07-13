<template>
  <BaseModal @clickOutsideWindow="clickOutsideWindow">
    <template v-slot:header>
      <BaseTitle>新規実行</BaseTitle>
    </template>
    <template v-slot:content>
      <div class="exec-modal-content">
        <BaseLabel>実行名</BaseLabel>
        <BaseInput v-model="execName"/>
        <BaseLabel>ファイルパス</BaseLabel>
        <BaseInput v-model="execPath"/>
        <BaseButton @click="clickSelectFile">選択</BaseButton>
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
import { remote } from "electron";
import { Exec } from "../../../../database/models/Exec";

@Component({
  name: "exec-modal",
  components: { BaseModal, BaseTitle, BaseButton, BaseLabel, BaseInput }
})
export default class ExecModalEdit extends Vue {
  // 実行名
  // private execName: string = "";
  // ファイルパス
  // private execPath: string = "";
  @Prop(Number) pExecId!: number;
  @Prop(String) pExecName!: string;
  @Prop(String) pExecPath!: string;

  private execId: number = this.pExecId;
  private execName: string = this.pExecName;
  private execPath: string = this.pExecPath;

  /**
   * ファイル選択ダイアログ表示
   * 選択時ファイルパスに設定
   */
  public clickSelectFile() {
    const file: Array<string> | undefined = remote.dialog.showOpenDialog({
      title: "ファイル選択",
      defaultPath: ".",
      properties: ["openFile"]
    });
    if (file) this.execPath = file[0];
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
    const exec: Exec = new Exec();
    exec._id = this.execId;
    exec._name = this.execName;
    exec._path = this.execPath;
    return exec;
  }
}
</script>

<style lang="scss" scoped>
.exec-modal-content {
  display: flex;
  flex-direction: column;
}
</style>
