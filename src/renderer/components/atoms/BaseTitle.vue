<template>
  <div><slot></slot></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "base-title"
})
export default class BaseTitle extends Vue {}
</script>
