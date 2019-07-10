<template>
  <div class="setting-page-header">
    <BaseTitle>設定画面</BaseTitle>
    <BaseButton
      @click="clickAddExec">
      追加
    </BaseButton> 
  </div>  
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import BaseTitle from "../../atoms/BaseTitle.vue";
import BaseButton from "../../atoms/BaseButton.vue";

@Component({
  name: "setting-page-header",
  components: { BaseTitle, BaseButton }
})
export default class SettingPageHeader extends Vue {
  @Emit("clickAddExec")
  public clickAddExec() {}
}
</script>

<style lang="scss" scoped>
.setting-page-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

