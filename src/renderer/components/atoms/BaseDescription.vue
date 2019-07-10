<template>
  <p><slot></slot></p>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "base-description"
})
export default class BaseDescription extends Vue {}
</script>
