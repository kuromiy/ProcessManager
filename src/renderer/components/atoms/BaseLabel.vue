<template>
  <label><slot></slot></label>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "base-label"
})
export default class BaseLabel extends Vue {}
</script>
