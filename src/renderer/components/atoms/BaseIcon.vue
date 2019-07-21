<template>
  <div class="base-icon" @click="click"><slot></slot></div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({
  name: "base-icon"
})
export default class BaseIcon extends Vue {
  @Emit("click")
  public click() {}
}
</script>

<style lang="scss" scoped>
.base-icon {
  cursor: pointer;
  &:hover {
    background-color: #818181;
  }
}
</style>

