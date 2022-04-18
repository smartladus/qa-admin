<template>
  <a-card size="small" title="故障期" style="height: 100%">
    <template #extra>
      <a-switch
        checked-children="百分比"
        un-checked-children="报修数"
        v-model:checked="checked"
        size="small"
      />
    </template>
    <div :id="chartId" style="height: 100%"></div>
  </a-card>
</template>

<script setup lang="ts" name="DefectAge">
  import { ref, onMounted, watchEffect } from 'vue';
  import { nanoid } from 'nanoid';
  import { getDefectAge } from '/@/api/quality/chart';
  import { Bar, BarOptions, G2 } from '@antv/g2plot';
  import { percent } from '/@/utils/filter';

  G2.registerInteraction('element-link', {
    start: [{ trigger: 'interval:mouseenter', action: 'element-link-by-color:link' }],
    end: [{ trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink' }],
  });

  const chartId = ref(nanoid());
  const checked = ref(true);

  const commonOption = {
    xField: 'value',
    yField: 'type',
    seriesField: 'period',
    isStack: true,
    theme: { colors10: ['#ED6567', '#FF8F82', '#FFC757', '#009AD8', '#45BC7D'] },
    animation: {},
    tooltip: true,
    legend: { layout: 'horizontal', position: 'bottom' },
    interactions: [{ type: 'element-highlight-by-color' }, { type: 'element-link' }],
  };
  const valueOption = {
    isPercent: false,
    meta: {},
    label: { position: 'middle', style: { fill: '#fff' } },
  };
  const percentOption = {
    isPercent: true,
    meta: {
      value: {
        min: 0,
        max: 1,
        formatter: (value) => percent(value),
      },
    },
    label: {
      position: 'middle',
      content: (item) => percent(item.value, 2),
      style: { fill: '#fff' },
    },
  };

  onMounted(async () => {
    let bar = new Bar(chartId.value, {
      data: await getDefectAge(),
      ...commonOption,
    } as BarOptions);
    watchEffect(() => {
      Object.assign(bar.options, checked.value ? percentOption : valueOption);
      bar.render();
    });
  });
</script>

<style scoped>
  /deep/ .ant-card-body {
    height: calc(100% - 38px);
  }
</style>
