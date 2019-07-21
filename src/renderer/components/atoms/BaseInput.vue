<template>
  <input class="base-input" type="text" :value="value" @input="updateText" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "base-input"
})
export default class BaseInput extends Vue {
  @Prop(String) readonly value!: string;

  @Emit("input")
  public updateText(e: any) {
    return e.target.value;
  }
}
</script>

<style lang="scss" scoped>
.base-input {
  border-radius: 3px;
  padding: 6px;
  border: 1px solid #313131;

  &:focus {
    outline: 0;
    border: 1px solid orange;
  }
}
</style>

