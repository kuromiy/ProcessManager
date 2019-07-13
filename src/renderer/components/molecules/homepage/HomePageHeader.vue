<template>
  <div>
    <BaseTitle>Home Page</BaseTitle>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseTitle from "../../atoms/BaseTitle.vue";

@Component({
  name: "home-page-header",
  components: { BaseTitle }
})
export default class HomePageHeader extends Vue {

}
</script>
