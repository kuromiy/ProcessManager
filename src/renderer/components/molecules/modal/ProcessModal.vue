<template>
  <BaseModal @clickOutsideWindow="clickOutsideWindow">
    <template v-slot:header>
      <BaseTitle>新規プロセス</BaseTitle>
    </template>
    <template v-slot:content>
      <div class="process-modal-content">
        <BaseLabel>名前</BaseLabel>
        <BaseInput v-model="processName"/>
        <BaseLabel>引数</BaseLabel>
        <BaseInput v-model="processArgs"/>
        <BaseLabel>実行</BaseLabel>
        <BaseSelect
          :opts="execs"
          v-model="processExecId"
        >
          <template v-slot:default="slotProps">
            <option v-for="(opt, index) in slotProps.opts" :key="index" :value="opt._id">{{opt._name}}</option>
          </template>
        </BaseSelect>
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
import BaseSelect from "../../atoms/BaseSelect.vue";
import { Exec } from "../../../../database/models/Exec";
import { Process } from "../../../../database/models/Process";

@Component({
  name: "process-modal",
  components: { BaseModal, BaseTitle, BaseButton, BaseLabel, BaseInput, BaseSelect }
})
export default class ProcessModal extends Vue {
  // プロセス名
  private processName: string = "";
  // 引数
  private processArgs: string = "";
  // 実行ID
  private processExecId: any = "";
  // 実行一覧
  @Prop({ type: Array, required: true }) readonly execs: Array<Exec>;

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
    const process: Process = new Process();
    process._name = this.processName;
    process._args = this.processArgs;
    process._exec_id = Number.parseInt(this.processExecId[0], 10);
    return process;
  }
}
</script>

<style lang="scss" scoped>
.process-modal-content {
  display: flex;
  flex-direction: column;
}
</style>

