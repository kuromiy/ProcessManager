<template>
  <div>
    <!-- モーダル -->
    <ExecModal
      v-if="execModalFlag"
      @clickOutsideWindow="closeExecModal"
      @clickCancel="closeExecModal"
      @clickRegist="registExec">
    </ExecModal>
    <ExecModalEdit
      :pExecId="execId"
      :pExecName="execName"
      :pExecPath="execPath"
      v-if="execModalEditFlag"
      @clickOutsideWindow="closeExecModalEdit"
      @clickCancel="closeExecModalEdit"
      @clickRegist="updateExec">
    </ExecModalEdit>
    <!-- 設定画面ヘッダー -->
    <SettingPageHeader
      @clickAddExec="openExecModal">
    </SettingPageHeader>
    <!-- 設定画面コンテンツ -->
    <SettingPageContent
      :execs="execs"
      @clickEditButton="openExecModalEdit"
      @clickDeleteButton="deleteExec">
    </SettingPageContent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SettingPageHeader from "../molecules/settingpage/SettingPageHeader.vue";
import SettingPageContent from "../molecules/settingpage/SettingPageContent.vue";
import ExecModal from "../molecules/modal/ExecModal.vue";
import ExecModalEdit from "../molecules/modal/ExecModalEdit.vue";
import { execModule } from "../../store/modules/ExecModule";
import { modalModule } from "../../store/modules/ModalModule";
import { Exec } from "../../../database/models/Exec";

@Component({
  name: "setting-page",
  components: { ExecModal, SettingPageHeader, SettingPageContent, ExecModalEdit }
})
export default class SettingPage extends Vue {
  private execId: number = 0;
  private execName: string = "";
  private execPath: string = "";
  /**
   * ストアのExec一覧を返す
   */
  public get execs() {
    return execModule.execs;
  }

  /**
   * ExecModalの状態
   */
  public get execModalFlag() {
    return modalModule.execModal;
  }

  public get execModalEditFlag() {
    return modalModule.execModalEdit;
  }

  /**
   * ストアにExecを閉じる
   */
  public registExec(exec: Exec) {
    execModule.addExec(exec);
    modalModule.closeExecModal();
  }

  /**
   * 実行モーダルを閉じる
   */
  public closeExecModal() {
    modalModule.closeExecModal();
  }

  /**
   * 実行モーダルを開く
   */
  public openExecModal() {
    modalModule.openExecModal();
  }

  public closeExecModalEdit() {
    modalModule.closeExecModalEdit();
  }

  public updateExec(exec: Exec) {
    execModule.updateExec(exec);
    modalModule.closeExecModalEdit();
  }

  public openExecModalEdit(exec: Exec) {
    this.execId = exec._id;
    this.execName = exec._name;
    this.execPath = exec._path;
    modalModule.openExecModalEdit();
  }

  public deleteExec(exec: Exec) {
    execModule.deleteExec(exec);
  }
}
</script>
