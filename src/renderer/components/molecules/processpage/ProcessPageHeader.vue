<template>
  <div style="display: flex;">
    <BaseTitle>{{title}}</BaseTitle>
    <BaseButton
      @click="startProcess"
      type="success">
      起動
    </BaseButton>
    <BaseButton
      @click="closeProcess"
      type="danger">
      停止
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import BaseTitle from "../../atoms/BaseTitle.vue";
import BaseButton from "../../atoms/BaseButton.vue";

@Component({
  name: "process-page-header",
  components: { BaseTitle, BaseButton }
})
export default class ProcessPageHeader extends Vue {
  @Prop(String) readonly title!: string;
  @Emit("startProcess")
  public startProcess() {}
  @Emit("closeProcess")
  public closeProcess() {}
}
</script>
