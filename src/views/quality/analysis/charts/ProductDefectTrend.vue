<template>
  <a-card title="产品不良趋势_RMN49-G321">
    <div :id="chartId" style="height: 300px"></div>
  </a-card>
</template>

<script setup lang="ts" name="ProductDefectTrend">
  import { ref, onMounted } from 'vue';
  import { buildUUID } from '/@/utils/uuid';
  import { getProductDefectTrend } from '/@/api/quality/chart';
  import { DualAxes } from '@antv/g2plot';
  import { percent } from '/@/utils/filter';

  const chartId = ref(buildUUID());
  onMounted(async () => {
    let data = await getProductDefectTrend('RMN49-G321');
    let dualAxes = new DualAxes(chartId.value, {
      data: [data, data],
      xField: 'date',
      yField: ['shipment', 'defectRate'],
      yAxis: {
        defectRate: {
          min: 0,
          max: 0.1,
          label: {
            formatter: (value) => `${value[0]}%`,
          },
          tickInterval: 0.02,
        },
      },
      legend: { position: 'bottom' },
      meta: {
        defectRate: {
          formatter: (value) => percent(value, 2),
        },
      },
      geometryOptions: [{ geometry: 'column' }, { geometry: 'line' }],
    });
    dualAxes.render();
  });
</script>

<style scoped></style>
