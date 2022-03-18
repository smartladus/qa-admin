<template>
  <a-card size="small" title="按报修时间">
    <div :id="idByRepairment" style="height: 300px"></div>
  </a-card>
  <a-divider />
  <a-card size="small" title="按发货时间">
    <div :id="idByDelivery" style="height: 300px"></div>
  </a-card>
</template>

<script setup lang="ts" name="CumulativeDefectTrend">
  import { ref, onMounted } from 'vue';
  import { getCumulativeDefectTrend } from '/@/api/quality/chart';
  import { buildUUID } from '/@/utils/uuid';
  import { Area, DualAxes } from '@antv/g2plot';
  import DataSet from '@antv/data-set';
  import { percent } from '/@/utils/filter';

  const idByRepairment = ref(buildUUID());
  const idByDelivery = ref(buildUUID());

  onMounted(async () => {
    const { byRepairment, byDelivery } = await getCumulativeDefectTrend();
    let dataByRepairment = new DataSet()
      .createView()
      .source(byRepairment)
      .transform({
        type: 'fold',
        fields: Object.keys(byRepairment[0]).filter((item) => item !== 'supplier'),
        key: 'date',
        value: 'defectRate',
        retains: ['supplier'],
      }).rows;

    let area = new Area(idByRepairment.value, {
      data: dataByRepairment,
      xField: 'date',
      yField: 'defectRate',
      seriesField: 'supplier',
      slider: {},
      legend: { position: 'bottom' },
      tooltip: {
        formatter(item) {
          return {
            name: item.supplier,
            value: percent(item.defectRate, 2),
          };
        },
      },
      yAxis: {
        label: {
          formatter: (value) => percent(value),
        },
      },
    });
    area.render();

    let dualAxes = new DualAxes(idByDelivery.value, {
      data: [byDelivery, byDelivery],
      xField: 'date',
      yField: ['defectRate', 'shipment'],
      legend: {
        position: 'bottom',
        itemName: {
          formatter(value) {
            switch (value) {
              case 'defectRate':
                return '不良率';
              case 'shipment':
                return '出货量';
              default:
                return '未定义';
            }
          },
        },
      },
      yAxis: {
        defectRate: {
          min: 0,
          max: 0.04,
          label: {
            formatter: (value) => `${value[0]}%`,
          },
          tickInterval: 0.01,
        },
        shipment: { min: 0, max: 1000 },
      },
      meta: {
        defectRate: {
          formatter: (value) => percent(value, 2),
        },
      },
      geometryOptions: [
        {
          geometry: 'line',
          smooth: false,
          color: '#54585A',
          lineStyle: { lineWidth: 3 },
        },
        { geometry: 'line', color: '#DBDCDD' },
      ],
    });
    dualAxes.render();
  });
</script>

<style scoped>

</style>
