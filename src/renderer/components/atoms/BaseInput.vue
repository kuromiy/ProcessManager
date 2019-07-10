<template>
  <input type="text" :value="value" @input="updateText" />
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
