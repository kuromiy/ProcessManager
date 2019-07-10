<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(header, index) in headers"
          :key="index">
          {{header}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(data, index) in datas"
        :key="index">
        <slot v-bind:data="data"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "base-table"
})
export default class BaseTable extends Vue {
  @Prop({ type: Array, required: true }) readonly headers!: Array<string>;
  @Prop({ type: Array, required: true }) readonly datas!: Array<any>;
}
</script>
