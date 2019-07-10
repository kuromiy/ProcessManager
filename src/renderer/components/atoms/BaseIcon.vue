<template>
  <div @click="click"><slot></slot></div>
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
