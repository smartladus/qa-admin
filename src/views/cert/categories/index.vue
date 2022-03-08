<template>
  <div class="p-4">
    <CategoryTable v-if="tableIndex === 'category'" @change-table="changeTable" />
    <RegionTable v-if="tableIndex === 'region'" @change-table="changeTable" />
  </div>
</template>

<script setup lang="ts" name="Categories">
  import { ref, onMounted } from 'vue';

  import CategoryTable from '/@/views/cert/categories/CategoryTable/CategoryTable.vue';
  import RegionTable from '/@/views/cert/categories/RegionTable/RegionTable.vue';
  import { useCertStore } from '/@/store/modules/cert';

  const tableIndex = ref('category');
  const changeTable = (index) => {
    tableIndex.value = index;
  };

  onMounted(() => useCertStore().init());
</script>

<style scoped></style>
