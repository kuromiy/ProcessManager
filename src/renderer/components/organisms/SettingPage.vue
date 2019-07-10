<template>
  <div>
    <!-- モーダル -->
    <ExecModal
      v-if="execModalFlag"
      @clickOutsideWindow="closeExecModal"
      @clickCancel="closeExecModal"
      @clickRegist="registExec">
    </ExecModal>
    <!-- 設定画面ヘッダー -->
    <SettingPageHeader
      @clickAddExec="openExecModal">
    </SettingPageHeader>
    <!-- 設定画面コンテンツ -->
    <SettingPageContent
      :execs="execs">
    </SettingPageContent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SettingPageHeader from "../molecules/settingpage/SettingPageHeader.vue";
import SettingPageContent from "../molecules/settingpage/SettingPageContent.vue";
import ExecModal from "../molecules/modal/ExecModal.vue";
import { execModule } from "../../store/modules/ExecModule";
import { modalModule } from "../../store/modules/ModalModule";
import { Exec } from "../../../database/models/Exec";

@Component({
  name: "setting-page",
  components: { ExecModal, SettingPageHeader, SettingPageContent }
})
export default class SettingPage extends Vue {
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
}
</script>
