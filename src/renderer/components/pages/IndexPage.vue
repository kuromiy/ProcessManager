<template>
  <div class="index-page">
    <SideBar></SideBar>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideBar from "../organisms/SideBar.vue";

@Component({
  name: "index-page",
  components: { SideBar }
})
export default class IndexPage extends Vue {
  
}
</script>

<style lang="scss" scoped>
.index-page {
  display: grid;
  grid-template-columns: 100px 1fr;
  height: 100%;
}
</style>
