<template>
  <button type="button" @click="click"><slot></slot></button>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({
  name: "base-button"
})
export default class BaseButton extends Vue {
  @Emit("click")
  public click() {}
}
</script>
