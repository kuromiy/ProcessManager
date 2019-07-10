<template>
  <IndexPage />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IndexPage from "./components/pages/IndexPage.vue";

@Component({
  name: "app",
  components: { IndexPage }
})
export default class App extends Vue {}
</script>
