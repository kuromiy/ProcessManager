<template>
  <BaseTable
    :headers="headers"
    :datas="execs">
    <template v-slot:default="slotProps">
      <td>{{slotProps.data._id}}</td>
      <td>{{slotProps.data._name}}</td>
      <td>{{slotProps.data._path}}</td>
    </template>
  </BaseTable>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import BaseTable from "../../atoms/BaseTable.vue";
import { Exec } from "../../../../database/models/Exec";

@Component({
  name: "setting-page-content",
  components: { BaseTable }
})
export default class SettingPageContent extends Vue {
  @Prop({ type: Array, required: true }) readonly execs: Array<Exec>;
  private headers: Array<string> = [
    "No.", "名前", "パス"
  ];
}
</script>
