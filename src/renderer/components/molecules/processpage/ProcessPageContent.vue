<template>
  <div id="ddd" class="process-page-content">
    <div
      v-for="(msg, index) in messages"
      :key="index">
      {{convert(msg._context)}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Message } from "../../../../database/models/Message";

@Component({
  name: "process-page-content"
})
export default class ProcessPageContent extends Vue {
  @Prop({ type: Array, required: true }) readonly messages!: Array<Message>;

  public mounted() {
    const d = this.$el;
    d.scroll(0, d.scrollHeight);
  }

  public convert(target: any) {
    return Buffer.from(target);
  }

  public updated() {
    const d: Element = this.$el;
    d.scroll(0, d.scrollHeight);
  }
}
</script>

<style lang="scss" scoped>
.process-page-content {
  overflow: auto;
  height: 95vh;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

