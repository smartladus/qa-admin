<template>
  <PageWrapper>
    <DefectAge />
    <CumulativeDefectRate />
    <CumulativeDefectTrend />
    <ProductDefectTrend />
  </PageWrapper>
</template>

<script setup lang="ts" name="QualityAnalysis">
  import { PageWrapper } from '/@/components/Page';
  import DefectAge from './charts/DefectAge.vue';
  import CumulativeDefectRate from './charts/CumulativeDefectRate.vue';
  import CumulativeDefectTrend from './charts/CumulativeDefectTrend.vue';
  import ProductDefectTrend from './charts/ProductDefectTrend.vue';
</script>

<style scoped>
</style>
