<template>
  <div class="modal" @click="clickOutsideWindow">
    <div class="modal__window" @click.stop>
      <div class="modal__window__header"><slot name="header"></slot></div>
      <div class="modal__window__content"><slot name="content"></slot></div>
      <div class="modal__window__footer"><slot name="footer"></slot></div>
    </div>
  </div>  
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({
  name: "base-modal"
})
export default class BaseModal extends Vue {
  @Emit("clickOutsideWindow")
  public clickOutsideWindow() {}
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0,0,0,0.5);
  z-index: 30;

  &__window {
    background: #ffffff;
    border: groove 1px #313131;
    border-radius: 5px;
    padding: 5px;

    &__header {
      font-size: 18px;
    }

    &__content {
      padding: 10px 20px;
    }

    &__footer {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
