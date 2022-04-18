<template>
  <PageWrapper>
    <StdTable
      @register="register"
      :table-config="supplierTableConfig"
      :defaultAction="false"
      @new="handleEdit"
    >
      <template #bodyCell="{ column, record: supplier }">
        <template v-if="column.key === 'mainProducts'">
          <div class="tag-container-cell">
            <a-tag
              v-for="type in supplier.mainProducts"
              :key="type"
              color="processing"
              class="child-tag"
            >
              {{ type }}
            </a-tag>
          </div>
        </template>
        <template v-if="column.key === 'drRequirement'">
          <a-descriptions size="small" :column="1">
            <a-descriptions-item label="早期不良率(150天内)">{{ percent(supplier.drThr150d, 1) }}</a-descriptions-item>
            <a-descriptions-item label="1年内不良率">{{ percent(supplier.drThr1y, 1) }}</a-descriptions-item>
            <a-descriptions-item label="2年内不良率">{{ percent(supplier.drThr2y, 1) }}</a-descriptions-item>
            <a-descriptions-item label="3年内不良率">{{ percent(supplier.drThr3y, 1) }}</a-descriptions-item>
          </a-descriptions>
        </template>
        <template v-if="column.key === 'companyInfoZh'">
          <a-descriptions size="small" :column="1">
            <a-descriptions-item label="公司名称">
              <div class="text-start-cell">{{ supplier.compNameZh }}</div>
            </a-descriptions-item>
            <a-descriptions-item label="公司地址">
              <div class="text-start-cell">{{ supplier.addressZh }}</div>
            </a-descriptions-item>
          </a-descriptions>
        </template>
        <template v-if="column.key === 'companyInfoEn'">
          <a-descriptions size="small" :column="1">
            <a-descriptions-item label="公司名称">
              <div class="text-start-cell">{{ supplier.compNameEn }}</div>
            </a-descriptions-item>
            <a-descriptions-item label="公司地址">
              <div class="text-start-cell">{{ supplier.addressEn }}</div>
            </a-descriptions-item>
          </a-descriptions>
        </template>
      </template>

      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </StdTable>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { getCurrentInstance, provide, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { StdTable } from '/@/views/components/StdTable';
  import supplierTableConfig from '/@/views/quality/suppliers/supplierTableConfig';
  import {
    TableAction,
    ActionItem,
    BasicColumn,
    EditRecordRow,
    useTable,
  } from '/@/components/Table';
  import { SupplierModel } from '/@/api/quality/model/supplierModel';
  import { percent } from '/@/utils/filter';
  import { deleteSupplierById } from '/@/api/quality/supplier';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { notification } = useMessage();

  const [register, { reload }] = useTable({});

  function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
    return [
      {
        label: '编辑',
        icon: 'ant-design:form',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '删除',
        icon: 'ant-design:delete',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }

  const handleEdit = (supplier: Recordable<SupplierModel>) => {
    console.log(`editing ${supplier.abbr}`);
    // openDrawer(true);
    // editingTaskNo.value = (task?.taskNo as unknown as string) ?? 'new';
  };

  const handleDelete = async (supplier: Recordable<SupplierModel>) => {
    console.log(`deleting ${supplier.abbr}`);
    let count = await deleteSupplierById(supplier.id as unknown as string);
    notification.success({
      message: `成功删除 ${count} 条记录`,
      description: `${supplier.abbr} 已删除`,
    });
    await reload();
  };
</script>

<style scoped>
  /deep/ .ant-descriptions-row > td {
    padding-bottom: 0;
  }
</style>
