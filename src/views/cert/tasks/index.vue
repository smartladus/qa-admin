<template>
  <PageWrapper>
    <StdTable
      @register="register"
      :table-config="taskTableConfig"
      :defaultAction="false"
      @new="handleEdit"
    >
      <template #bodyCell="{ column, record: task }">
        <template v-if="column.key === 'oaNo'">
          <span>{{ task.oaNo ?? '-' }}</span>
        </template>
        <template v-if="column.key === 'cost'">
          <span>￥ {{ numberFormat(task.cost) }}</span>
        </template>
        <template v-if="column.key === 'region'">
          <span>{{ task.region[1] ?? '未知区域' }}</span>
        </template>
        <template v-if="column.key === 'certMethod'">
          <span>{{ getCertMethodLabelByVal(task.certMethod) }}</span>
        </template>

        <template v-if="column.key === 'supModel'">
          <a-popover placement="topLeft">
            <template #content>
              <div class="model_pop">
                {{ replaceDivider(task.supModel, '|', ', ') }}
              </div>
            </template>
            <span>{{ replaceDivider(task.supModel, '|', ', ') }}</span>
          </a-popover>
        </template>
        <template v-if="column.key === 'jvModel'">
          <a-popover placement="topLeft">
            <template #content>
              <div class="model_pop">
                {{ replaceDivider(task.jvModel, '|', ', ') }}
              </div>
            </template>
            <span>{{ replaceDivider(task.jvModel, '|', ', ') }}</span>
          </a-popover>
        </template>
        <template v-if="column.key === 'taskStat'">
          <TaskStatTag :task-stat="task.taskStat" />
        </template>
        <template v-if="column.key === 'startDate'">
          <span>{{ dateFormat(task.startDate, 'YYYY-MM-DD') }}</span>
        </template>
        <template v-if="column.key === 'endDate'">
          <span>{{ dateFormat(task.endDate, 'YYYY-MM-DD') }}</span>
        </template>
        <template v-if="column.key === 'certNo'">
          <a-button type="link" :disabled="!task.certNo">{{ task.certNo || '暂无' }}</a-button>
        </template>
      </template>
      <template #selectedItem="{ row: task }">
        <span style="font-weight: bolder">{{ task.taskNo }}</span>
      </template>
      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </StdTable>
    <TaskEditDrawer destroyOnClose @register="drawerReg" />
  </PageWrapper>
</template>

<script setup lang="ts" name="Tasks">
  import { getCurrentInstance, provide, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { TaskModel } from '/@/api/cert/model/taskModel';
  import { useDrawer } from '/@/components/Drawer';
  import { StdTable } from '/@/views/components/StdTable';
  import TaskEditDrawer from './TaskEditDrawer/TaskEditDrawer.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import taskTableConfig from '/@/views/cert/tasks/taskTableConfig';
  import TaskStatTag from './TaskStatTag/TaskStatTag.vue';
  import {
    TableAction,
    ActionItem,
    BasicColumn,
    EditRecordRow,
    useTable,
  } from '/@/components/Table';
  import { useFilter } from '/@/hooks/useFilter';
  import { useCertStore } from '/@/store/modules/cert';
  import { storeToRefs } from 'pinia';
  import { deleteCertTaskByTaskNo } from '/@/api/cert/task';

  let { proxy } = getCurrentInstance();
  const { notification } = useMessage();

  const [register, { reload }] = useTable({});

  const { numberFormat, replaceDivider, dateFormat } = useFilter();

  const certStore = useCertStore();
  certStore.init();
  const { getCertMethodLabelByVal } = storeToRefs(certStore);

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

  const [drawerReg, { openDrawer }] = useDrawer();

  proxy.$bus.on('TASK_UPDATE', () => reload());

  const editingTaskNo = ref<string | undefined>(undefined);
  provide('editingTaskNo', editingTaskNo);

  const handleEdit = (task?: Recordable<TaskModel>) => {
    openDrawer(true);
    editingTaskNo.value = (task?.taskNo as unknown as string) ?? 'new';
  };

  const handleDelete = async (task: Recordable) => {
    let count = await deleteCertTaskByTaskNo(task.taskNo);
    notification.success({
      message: `成功删除 ${count} 条记录`,
      description: `${task.taskNo} 已删除`,
    });
    await reload();
  };
</script>

<style scoped>
  .model_pop {
    max-width: 300px;
    max-height: 120px;
    word-wrap: break-word;
    overflow-y: auto;
  }
</style>
