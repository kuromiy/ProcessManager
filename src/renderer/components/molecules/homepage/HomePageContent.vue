<template>
  <BaseTable
    :headers="headers"
    :datas="projects">
    <template v-slot:default="slotProps">
      <td>{{slotProps.data._id}}</td>
      <td>{{slotProps.data._name}}</td>
      <td>{{slotProps.data._description}}</td>
      <td>
        <BaseButton
          type="danger"
          @click="deleteProject(slotProps.data)">
          削除
        </BaseButton>
      </td>
    </template>
  </BaseTable>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import BaseTable from "../../atoms/BaseTable.vue";
import { Project } from "../../../../database/models/Project";
import BaseButton from "../../atoms/BaseButton.vue";

@Component({
  name: "home-page-content",
  components: { BaseTable, BaseButton }
})
export default class HomePageContent extends Vue {
  @Prop({ type: Array, required: true }) readonly projects!: Array<Project>;
  private headers: Array<string> = [
    "No.", "プロジェクト名", "概要", "削除"
  ]

  @Emit("deleteProject")
  public deleteProject(project: Project) {
    return project;
  }
}
</script>
