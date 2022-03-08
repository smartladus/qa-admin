<template>
  <StdTable
    @register="register"
    :table-config="regionTableConfig"
    add-with-new-line
  >
    <template #tableTitle>
      <a-radio-group @click="onTableChange" value="region" button-style="solid">
        <a-radio-button value="category">认证类型</a-radio-button>
        <a-radio-button value="region">认证区域</a-radio-button>
      </a-radio-group>
    </template>
    <template #selectedItem="{ row: region }">
      <span style="font-weight: bolder">{{ region.country }}</span>
    </template>
  </StdTable>
</template>

<script setup name="RegionTable">
  import { defineEmits } from 'vue';
  import { StdTable } from '/@/views/components/StdTable';
  import regionTableConfig from '/@/views/cert/categories/RegionTable/regionTableConfig';
  import { useTable } from '/@/components/Table';

  const emit = defineEmits(['changeTable']);

  const [
    register,
    {
      insertTableDataRecord,
      scrollTo,
      setProps,
      deleteTableDataRecord,
      getRowKey,
      setLoading,
      reload,
    },
  ] = useTable({});

  const onTableChange = (e) => {
    emit('changeTable', e.target.value);
  };
</script>

<style scoped>

</style>
