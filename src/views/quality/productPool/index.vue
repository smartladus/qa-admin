<template>
  <PageWrapper>
    <StdTable
      @register="register"
      :table-config="productTableConfig"
      :defaultAction="false"
      @new="handleEdit"
    >
      <template #bodyCell="{ column, record: product }">
        <template v-if="column.key === 'size'">
          {{ product?.size?.join(', ') ?? '-' }}
        </template>
        <template v-if="column.key === 'tags'">
          <div class="typeContainer">
            <a-tag v-for="tag in product.tags" :key="tag" color="processing" class="certType">
              {{ tag }}
            </a-tag>
          </div>
        </template>
        <template v-if="column.key === 'description'">
          <div class="text-start">{{ product.description }}</div>
        </template>
      </template>
      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </StdTable>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { StdTable } from '/@/views/components/StdTable';
  import productTableConfig from '/@/views/quality/productPool/productTableConfig';
  import {
    TableAction,
    ActionItem,
    BasicColumn,
    EditRecordRow,
    useTable,
  } from '/@/components/Table';
  import { ProductModel } from '/@/api/quality/model/productModel';
  import { deleteProductByProdNo } from '/@/api/quality/product';
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

  const handleEdit = (product: Recordable<ProductModel>) => {
    console.log(`editing ${product?.prodNo ?? 'new'}`);
    // openDrawer(true);
    // editingTaskNo.value = (task?.taskNo as unknown as string) ?? 'new';
  };

  const handleDelete = async (product: Recordable<ProductModel>) => {
    console.log(`deleting ${product.prodNo}`);
    let count = await deleteProductByProdNo(product.prodNo as unknown as string);
    notification.success({
      message: `成功删除 ${count} 条记录`,
      description: `${product.prodNo} 已删除`,
    });
    await reload();
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
  .text-start {
    text-align: start;
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
  }
  /deep/ .ant-descriptions-row > td {
    padding-bottom: 0;
  }
</style>
