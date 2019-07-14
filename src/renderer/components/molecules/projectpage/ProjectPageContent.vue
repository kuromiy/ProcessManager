<template>
  <BaseTable
    :headers="headers"
    :datas="processes">
    <!-- slotProps.dataはProcessクラスが格納されている -->
    <template v-slot:default="slotProps">
      <td>{{slotProps.data._id}}</td>
      <td>{{slotProps.data._name}}</td>
      <td>
        <BaseButton
          type="success"
          @click="startProcess(slotProps.data)">
          起動
        </BaseButton>
        <BaseButton
          type="danger"
          @click="endProcess(slotProps.data)">
          停止
        </BaseButton>
      </td>
      <td class="project-page-content__message">{{getMessage(slotProps.data)}}</td>
      <td>
        <BaseButton
          type="success"
          @click="updateProcess(slotProps.data)">
          編集
        </BaseButton>
        <BaseButton
          type="danger"
          @click="deleteProcess(slotProps.data)">
          削除
        </BaseButton>
      </td>
    </template>
  </BaseTable>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Process } from "../../../../database/models/Process";
import BaseTable from "../../atoms/BaseTable.vue";
import BaseButton from "../../atoms/BaseButton.vue";
import BaseIcon from "../../atoms/BaseIcon.vue";
import { messageModule } from "../../../store/modules/MessageModule";
import { Message } from "../../../../database/models/Message";

@Component({
  name: "project-page-content",
  components: { BaseTable, BaseButton, BaseIcon }
})
export default class ProjectPageContent extends Vue {
  @Prop({ type: Array, required: true }) readonly processes!: Array<Process>;
  private headers: Array<string> = [
    "No.", "プロセス名", "操作", "メッセージ", "削除"
  ];

  /**
   * 最新プロセスメッセージを返す
   * TODO Vuexと通信しているのでorganismsに移動する
   */
  public getMessage(process: Process) {
    const messages: Array<Message> = messageModule.messages.filter((message: Message) => message._process_id === process._id);
    const message: Message = messages[messages.length-1];
    if (message) return message._context;
  }

  /**
   * 起動ボタンクリックイベント
   */
  @Emit("startProcess")
  public startProcess(process: Process) {
    return process;
  }

  /**
   * 停止ボタンクリックイベント
   */
  @Emit("endProcess")
  public endProcess(process: Process) {
    return process;
  }

  @Emit("updateProcess")
  public updateProcess(process: Process) {
    return process;
  }

  /**
   * 削除ボタンクリックイベント
   */
  @Emit("deleteProcess")
  public deleteProcess(process: Process) {
    return process;
  }
}
</script>

<style lang="scss" scoped>
.project-page-content__message {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 150px;
}
</style>

