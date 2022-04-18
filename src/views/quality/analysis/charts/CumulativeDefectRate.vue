<template>
  <a-card size="small" title="累计不良率" style="height: 100%">
    <div :id="chartId" style="height: 100%"></div>
  </a-card>
</template>

<script setup lang="ts" name="CumulativeDefectRate">
  import { ref, onMounted } from 'vue';
  import { Column } from '@antv/g2plot';
  import DataSet from '@antv/data-set';
  import { getCumulativeDefectRate } from '/@/api/quality/chart';
  import { buildUUID } from '/@/utils/uuid';
  import { percent } from '/@/utils/filter';

  const chartId = ref(buildUUID());

  const unfoldData = (data) => {
    let dv = new DataSet().createView().source(data);
    dv.transform({
      type: 'rename',
      map: {
        device: '整机',
        accessory: '配件',
      },
    }).transform({
      type: 'fold',
      fields: ['整机', '配件'],
      key: 'scope',
      value: 'defectRate',
      retains: ['type'],
    });
    return dv.rows;
  };

  onMounted(async () => {
    let data = unfoldData(await getCumulativeDefectRate());
    let column = new Column(chartId.value, {
      data,
      isGroup: true,
      xField: 'type',
      yField: 'defectRate',
      seriesField: 'scope',
      /** 设置颜色 */
      theme: {
        colors10: ['#54585A', '#DBDCDD'],
      },
      /** 设置间距 */
      // marginRatio: 0.1,
      legend: {
        layout: 'horizontal',
        position: 'bottom',
      },
      yAxis: {
        tickInterval: 0.02,
        label: {
          formatter: (value) => percent(value),
        },
      },
      tooltip: {
        formatter(item) {
          return {
            name: item.scope,
            value: percent(item.defectRate, 2),
          };
        },
      },
      label: {
        // 可手动配置 label 数据标签位置
        position: 'top', // 'top', 'middle', 'bottom'
        // 可配置附加的布局方法
        layout: [
          // 柱形图数据标签位置自动调整
          { type: 'interval-adjust-position' },
          // 数据标签防遮挡
          { type: 'interval-hide-overlap' },
          // 数据标签文颜色自动调整
          { type: 'adjust-color' },
        ],
        content: (item) => percent(item.defectRate, 2),
      },
    });
    column.render();
  });
</script>

<style scoped>
  /deep/ .ant-card-body {
    height: calc(100% - 38px);
  }
</style>
