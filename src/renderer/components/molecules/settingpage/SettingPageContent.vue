<template>
  <BaseTable
    :headers="headers"
    :datas="execs">
    <template v-slot:default="slotProps">
      <td>{{slotProps.data._id}}</td>
      <td>{{slotProps.data._name}}</td>
      <td>{{slotProps.data._path}}</td>
      <td>
        <BaseButton @click="clickEditButton(slotProps.data)">編集</BaseButton>
        <BaseButton @click="clickDeleteButton(slotProps.data)">削除</BaseButton>
      </td>
    </template>
  </BaseTable>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import BaseTable from "../../atoms/BaseTable.vue";
import { Exec } from "../../../../database/models/Exec";
import BaseButton from "../../atoms/BaseButton.vue";

@Component({
  name: "setting-page-content",
  components: { BaseTable, BaseButton }
})
export default class SettingPageContent extends Vue {
  @Prop({ type: Array, required: true }) readonly execs!: Array<Exec>;
  private headers: Array<string> = [
    "No.", "名前", "パス"
  ];
  @Emit("clickEditButton")
  public clickEditButton(exec: Exec) {
    return exec;
  }
  @Emit("clickDeleteButton")
  public clickDeleteButton(exec: Exec) {
    return exec;
  }
}
</script>
