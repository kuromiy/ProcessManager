<template>
  <div class="project-list">
    <BaseIcon
      v-for="(project, index) in projects"
      :key="index"
      @click="clickProjectIcon(project)">
      {{project._name}}
    </BaseIcon>
    <BaseIcon
      @click="clickAddProject">
      add
    </BaseIcon>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import BaseIcon from "../atoms/BaseIcon.vue";
import { Project } from "../../../database/models/Project";

@Component({
  name: "project-list",
  components: { BaseIcon }
})
export default class ProjectList extends Vue {
  @Prop({ type: Array, required: true }) readonly projects!: Array<Project>;

  @Emit("clickAddProject")
  public clickAddProject() {}

  @Emit("clickProjectIcon")
  public clickProjectIcon(project: Project) {
    return project;
  }
}
</script>

<style lang="scss" scoped>
.project-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 2;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

