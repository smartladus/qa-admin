<template>
  <BasicTable
    v-bind="$attrs"
    @register="register"
    :rowSelection="
      operateInBatch
        ? { type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onRowSelectionChange }
        : null
    "
    @edit-change="onEditChange"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #toolbar>
      <a-button
        type="primary"
        :ghost="currentEditKeyRef === ''"
        preIcon="ant-design:plus"
        @click="handleCreate"
        :disabled="currentEditKeyRef !== ''"
      >
        新建
      </a-button>
      <a-button preIcon="ant-design:upload" @click="openUploadModal">批量上传</a-button>
      <UploadModal
        @register="regUploadModal"
        v-bind="tableConfig.uploadSetting"
        @unload-succeed="onUnloadSucceed"
      />
      <a-button
        preIcon="mdi:checkbox-multiple-blank-outline"
        @click="handleOperateInBatch"
        :color="operateInBatch ? 'error' : undefined"
        >{{ operateInBatch ? '关闭批量操作' : '批量操作' }}</a-button
      >
      <a-button @click="print">打印</a-button>
    </template>
    <template #headerTop v-if="operateInBatch">
      <div style="margin: 8px -4px">
        <a-alert type="info" show-icon>
          <template #message>
            <template v-if="checkedKeys.length > 0">
              <span>已选中</span>
              <a-popover placement="bottom" trigger="click" arrow-point-at-center>
                <a-button type="link" size="small" style="font-weight: bolder">
                  {{ checkedKeys.length }}
                </a-button>
                <template #title>
                  <span>已选择</span>
                </template>
                <template #content>
                  <div style="max-width: 480px">
                    <a-tag
                      closable
                      v-for="row in checkedRows"
                      @close="handleDeselect(row)"
                      :key="row[getRowKey()]"
                    >
                      <slot name="selectedItem" :row="row">raw data: {{ row }}</slot>
                    </a-tag>
                  </div>
                </template>
              </a-popover>
              <span>条记录(可跨页)</span>
              <a-divider type="vertical" />
              <a-button type="link" @click="clearSelectedRowKeys" size="small">清空</a-button>
              <a-button type="link" @click="invertSelectedRowKeys" size="small">反选</a-button>
              <slot name="batchActions"></slot>
            </template>
            <template v-else>
              <span>未选中任何项目</span>
            </template>
          </template>
        </a-alert>
      </div>
    </template>
    <template v-if="defaultAction" #action="{ record, column }">
      <TableAction :actions="createActions(record, column)" />
    </template>
  </BasicTable>
</template>

<script setup lang="ts" name="StdTable">
  import { ref, defineProps, defineExpose, computed, ComputedRef, toRefs, nextTick } from 'vue';
  import {
    ActionItem,
    BasicColumn,
    BasicTable,
    TableAction,
    BasicTableProps,
    EditRecordRow,
  } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useTable } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { buildUUID } from '/@/utils/uuid';

  import { UploadModal } from '/@/views/components/UploadModal';
  import { StdTableConfig } from './types/stdTableConfig';

  const { notification } = useMessage();

  const props = defineProps({
    tableConfig: {
      type: Object as PropType<StdTableConfig<any>>,
      default() {
        return {};
      },
    },
    defaultAction: {
      type: Boolean,
      default: true,
    },
    addWithNewLine: {
      type: Boolean,
      default: false,
    },
  });

  const { tableConfig, defaultAction, addWithNewLine } = toRefs(props);

  const defaultTableProps: ComputedRef<Partial<BasicTableProps>> = computed(() => {
    const tableProps: Partial<BasicTableProps> = {};
    if (defaultAction?.value) {
      tableProps.actionColumn = {
        width: 170,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      };
    }
    return tableProps;
  });

  const [
    register,
    {
      reload,
      clearSelectedRowKeys,
      setSelectedRowKeys,
      deleteSelectRowByKey,
      deleteTableDataRecord,
      getDataSource,
      insertTableDataRecord,
      getRowKey,
      setLoading,
      scrollTo,
    },
  ] = useTable({
    ...defaultTableProps.value,
    ...props.tableConfig?.tableProps,
  });

  const emit = defineEmits(['new', 'edit', 'cancel', 'edit', 'deselect']);

  // 新建行
  const handleCreate = () => {
    if (addWithNewLine?.value) {
      const newRecord = tableConfig?.value?.emptyRecord ?? {};
      newRecord[getRowKey()] = 'new';
      insertTableDataRecord(newRecord, 0);
      nextTick(() => {
        scrollTo('top');
        handleEdit(getDataSource()[0]);
      });
    }
    emit('new');
  };

  // 上传窗口操作
  const [regUploadModal, { openModal: openUploadModal, closeModal: closeUploadModal }] = useModal();

  const onUnloadSucceed = () => {
    closeUploadModal();
    reload();
  };

  // 批量操作
  const operateInBatch = ref(false);
  defineExpose({ operateInBatch }); // 向父元素暴露批量操作标志
  const handleOperateInBatch = () => {
    operateInBatch.value = !operateInBatch.value;
  };

  const checkedKeys = ref<Array<string | number>>([]);
  const checkedRows = ref<Array<Recordable>>([]);
  const onRowSelectionChange = (selectedRowKeys, selectedRows) => {
    checkedKeys.value = selectedRowKeys;
    checkedRows.value = selectedRows;
  };

  const invertSelectedRowKeys = () => {
    setSelectedRowKeys(
      getDataSource()
        .map((record) => record[getRowKey()])
        .filter((key) => checkedKeys.value.indexOf(key) === -1),
    );
  };

  const handleDeselect = (row) => {
    deleteSelectRowByKey(row[getRowKey()]);
    emit('deselect', row);
  };

  // 编辑行
  const currentEditKeyRef = ref('');
  function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
    if (!record.editable) {
      return [
        {
          label: '编辑',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          icon: 'ant-design:form',
          onClick: handleEdit.bind(null, record),
        },
        {
          label: '删除',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          icon: 'ant-design:delete',
          color: 'error',
          popConfirm: {
            title: '是否确认删除',
            confirm: handleDelete.bind(null, record),
          },
        },
      ];
    }
    return [
      {
        label: '保存',
        icon: 'ant-design:save',
        onClick: handleSave.bind(null, record, column),
      },
      {
        label: '取消',
        icon: 'ant-design:close-circle',
        type: 'text',
        popConfirm: {
          title: '是否取消编辑',
          confirm: handleCancel.bind(null, record, column),
        },
      },
    ];
  }

  const handleEdit = (record: EditRecordRow) => {
    currentEditKeyRef.value = record[getRowKey()];
    record.onEdit?.(true);
  };

  const handleSave = async (record: EditRecordRow) => {
    let {
      editApi: { updateApi, insertApi },
      createEditMessage,
    } = tableConfig?.value;
    notification.open({
      key: 'saving',
      message: '正在保存...',
      description: `${ createEditMessage(record) }`,
      type: 'info',
    });
    const valid = await record.onValid?.();
    if (valid) {
      try {
        const dataToSave = { ...record, ...record.editValueRefs };
        console.log('saving', dataToSave);
        let pass;
        if (record[getRowKey()] === 'new') {
          pass = await insertApi(dataToSave);
          if (pass) Object.assign(record, { key: buildUUID() });
        } else {
          pass = await updateApi(dataToSave);
        }
        if (pass) {
          Object.assign(record, { ...pass });
          pass = await record.onEdit?.(false, true);
        }
        if (pass) currentEditKeyRef.value = '';
        notification.open({
          key: 'saving',
          message: '保存成功',
          description: `${createEditMessage(record)}已保存！`,
          type: 'success',
        });
      } catch (error) {
        notification.open({
          key: 'saving',
          message: '保存失败',
          description: `${createEditMessage(record)}保存失败：${error}`,
          type: 'error',
        });
      }
    } else {
      notification.open({
        key: 'saving',
        message: '数据未提交',
        description: `当前编辑行存在非法数据，请更正！`,
        type: 'error',
      });
    }
  };

  const handleCancel = (record: EditRecordRow) => {
    currentEditKeyRef.value = '';
    record.onEdit?.(false, false);
    if (record[getRowKey()] === 'new') {
      deleteTableDataRecord('new');
    }
  };

  function onEditChange({ column, value, record }) {
    // 本例
    // if (column.dataIndex === 'id') {
    //   record.editValueRefs.name4.value = `${value}`;
    // }
    // console.log(column, value, record);
  }

  // 删除行
  const handleDelete = async (record: EditRecordRow) => {
    setLoading(true);
    let {
      editApi: { deleteApi },
      createEditMessage,
    } = tableConfig?.value;
    await deleteApi(record)
      .then((deleteCount) => {
        if (deleteCount === 1) {
          deleteTableDataRecord(record[getRowKey()]);
          notification.success({
            message: '删除成功',
            description: `${createEditMessage(record)}已删除！`,
          });
        }
      })
      .finally(() => setLoading(false));
  };

  const print = () => {
    console.log(getDataSource());
  };
</script>

<style scoped></style>
