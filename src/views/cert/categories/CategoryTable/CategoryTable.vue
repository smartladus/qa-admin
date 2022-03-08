<template>
  <StdTable
    @register="register"
    :table-config="categoryTableConfig"
    add-with-new-line
  >
    <template #tableTitle>
      <a-radio-group @click="onTableChange" value="category" button-style="solid">
        <a-radio-button value="category">认证类型</a-radio-button>
        <a-radio-button value="region">认证区域</a-radio-button>
      </a-radio-group>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'region' && !record.editable">
        {{ record.region[1] }}
      </template>
      <template v-if="column.key === 'type' && !record.editable">
        <div class="typeContainer" v-if="record.type && record.type.length > 0">
          <a-tag
            v-for="type in record.type"
            :key="type"
            color="processing"
            class="certType"
          >
            {{ type }}
          </a-tag>
        </div>
      </template>
      <template v-if="column.key === 'compulsory' && !record.editable">
        <a-space>
          <Icon :icon="record.compulsory ? 'mdi:circle-slice-8' : 'mdi:circle-outline'" />
        </a-space>
      </template>
      <template v-if="column.key === 'test_domestic'">

      </template>
    </template>
    <template #selectedItem="{ row: category }">
      <span style="font-weight: bolder">{{ category.certName }}</span> ({{ category.region[1] }})
    </template>
  </StdTable>
</template>

<script setup>
  import { StdTable } from '/@/views/components/StdTable';
  import categoryTableConfig from '/@/views/cert/categories/CategoryTable/categoryTableConfig';
  import { Icon } from '/@/components/Icon';
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
  ] = useTable();

  const onTableChange = (e) => {
    emit('changeTable', e.target.value);
  };
</script>

<style scoped>
  .typeContainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .typeContainer .certType {
    min-width: 48px;
    display: block;
    margin: 4px;
  }
</style>
