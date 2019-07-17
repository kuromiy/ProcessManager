<template>
  <button
    class="base-button"
    type="button"
    :disabled="isDisabled"
    :class="[
      type ? 'base-button--' + type : '',
      {
        'is-disabled': isDisabled
      }
    ]"
    @click="click">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

@Component({
  name: "base-button"
})
export default class BaseButton extends Vue {
  @Prop({ type: String, default: "default"}) readonly type!: string;
  @Prop({ type: Boolean, default: false}) readonly isDisabled!: boolean;
  @Emit("click")
  public click() {}
}
</script>

<style lang="scss" scoped>
$success-color: #28bb71;
$default-color: #616161;
$primary-color: #1f79b4;
$danger-color: #b91e1e;

.base-button {
  text-decoration: none;
  padding: .1em 1em;
  background-color: #fff;
  border-radius: 3px;
  cursor: pointer;

  &--default {
    color: $default-color;
    border: solid 1px $default-color;

    &:hover {
    background: $default-color;
    color: #fff;
    }
  }

  &--success {
    color: $success-color;
    border: solid 1px $success-color;

    &:hover {
    background: $success-color;
    color: #fff;
    }
  }

  &--primary {
    color: $primary-color;
    border: solid 1px $primary-color;

    &:hover {
    background: $primary-color;
    color: #fff;
    }
  }

  &--danger {
    color: $danger-color;
    border: solid 1px $danger-color;

    &:hover {
    background: $danger-color;
    color: #fff;
    }
  }
}

.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>

