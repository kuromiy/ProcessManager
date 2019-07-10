<template>
  <select :value="value" @input="updateSelect">
    <slot v-bind:opts="opts"></slot>
  </select>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "base-select"
})
export default class BaseSelect extends Vue {
  @Prop(String) readonly value!: string;
  @Prop({ type: Array, required: true }) readonly opts!: Array<string>;

  @Emit("input")
  public updateSelect(e: any) {
    return e.target.value;
  }
}
</script>
