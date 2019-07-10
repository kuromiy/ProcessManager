<template>
  <h1><slot></slot></h1>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "base-title"
})
export default class BaseTitle extends Vue {}
</script>
