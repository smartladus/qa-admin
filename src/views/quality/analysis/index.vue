<template>
  <PageWrapper>
    <div class="layoutJSON">
      <div class="columns">
        <div v-for="item in layout">
          <b>{{ item.i }}</b>
          : [ x: {{ item.x }}, y: {{ item.y }}, w: {{ item.w }}, h: {{ item.h }} ]
        </div>
      </div>
    </div>
    <grid-layout
      v-model:layout="layout"
      :col-num="4"
      :row-height="150"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="false"
      :is-mirrored="false"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <ChartContainer v-bind="item.chart">

        </ChartContainer>
      </grid-item>
    </grid-layout>
  </PageWrapper>
</template>

<script setup lang="ts" name="QualityAnalysis">
  import { reactive, computed } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { nanoid } from 'nanoid';
  import DefectAge from './charts/DefectAge.vue';
  import CumulativeDefectRate from './charts/CumulativeDefectRate.vue';
  import CumulativeDefectTrend from './charts/CumulativeDefectTrend.vue';
  import ProductDefectTrend from './charts/ProductDefectTrend.vue';
  import { ChartContainer } from '/@/views/components/ChartContainer';

  const layout = reactive([
    { x: 0, y: 0, w: 2, h: 2, i: 1, chart: { id: nanoid(), title: '图表1' } },
    { x: 2, y: 0, w: 2, h: 2, i: 2, chart: { id: nanoid(), title: '图表2' } },
    // { x: 0, y: 2, w: 2, h: 2, i: 3, chart: CumulativeDefectTrend },
    // { x: 2, y: 2, w: 2, h: 2, i: 4, chart: ProductDefectTrend },
  ]);
  // const layout = shallowReactive([
  //   { x: 0, y: 0, w: 2, h: 2, i: 1, chart: ChartContainer },
  //   // { x: 0, y: 0, w: 2, h: 2, i: 1, chart: DefectAge },
  //   // { x: 2, y: 0, w: 2, h: 2, i: 2, chart: CumulativeDefectRate },
  //   // { x: 0, y: 2, w: 2, h: 2, i: 3, chart: CumulativeDefectTrend },
  //   // { x: 2, y: 2, w: 2, h: 2, i: 4, chart: ProductDefectTrend },
  // ]);
</script>

<style scoped lang="less">
  .layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
  }
  .columns {
    -moz-columns: 160px;
    -webkit-columns: 160px;
    columns: 160px;
  }
  /deep/ .vue-grid-item.vue-grid-placeholder {
    background: @primary-color !important;
  }
</style>
