<template>
  <div class="project-page-header">
    <div class="project-page-header__row">
      <BaseTitle>{{projectTitle}}</BaseTitle>
      <BaseButton @click="clickAddProcess">追加</BaseButton>
    </div>
    <BaseDescription :description="projectDescription" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import BaseTitle from "../../atoms/BaseTitle.vue";
import BaseButton from "../../atoms/BaseButton.vue";
import BaseDescription from "../../atoms/BaseDescription.vue";

@Component({
  name: "project-page-header",
  components: { BaseTitle, BaseButton, BaseDescription }
})
export default class ProjectPageHeader extends Vue {
  @Prop(String) readonly projectTitle!: string;
  @Prop(String) readonly projectDescription!: string;

  @Emit("clickAddProcess")
  public clickAddProcess() {}
}
</script>

<style lang="scss" scoped>
.project-page-header {
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
    justify-content: space-between;
  }
}
</style>