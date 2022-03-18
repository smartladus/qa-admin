<template>
  <a-button preIcon="ant-design:plus" type="dashed" block @click="showNewRecEditor">
    新建一条记录
  </a-button>
  <MarkDownEditor
    v-if="newRecEditorVisible"
    mode="edit"
    class="newRecEditor"
    @save="handleCreate(toRaw(newRecord))"
    @cancel="handleCancel"
    v-model:value="newRecord.content"
  >
    <template #action-of-edit>
      <a-date-picker
        v-model:value="newRecord.recordTime"
        show-time
        valueFormat="YYYY-MM-DD HH:mm:ss"
      />
      <a-select v-model:value="newRecord.taskStat" style="width: 100px" :options="taskStats" />
    </template>
  </MarkDownEditor>
  <a-divider />
  <a-empty v-if="taskRecords.length === 0">
    <template #description>
      <a-typography-text disabled>暂无记录</a-typography-text>
    </template>
  </a-empty>
  <a-timeline v-else>
    <a-timeline-item v-for="record in taskRecords" :key="record.id">
      <MarkDownEditor
        mode="preview"
        v-model:value="record.content"
        @save="handleUpdate(record)"
      >
        <template #title>
          <a-space>
            <span>{{ dateFormat(record.recordTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            <TaskStatTag :taskStat="record.taskStat" />
          </a-space>
        </template>
        <template #action-of-preview>
          <a-popconfirm
            title="确认删除记录？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="handleDelete(record)"
          >
            <a-button danger size="small">删除</a-button>
          </a-popconfirm>
        </template>
      </MarkDownEditor>
    </a-timeline-item>
  </a-timeline>
</template>

<script setup lang="ts" name="TaskRecord">
  import { ref, reactive, toRaw, Ref, inject, watchEffect, onMounted } from 'vue';
  import dayjs from 'dayjs';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { MarkDownEditor } from '/@/views/components/MarkDownEditor';
  import {
    getCertTaskRecordsByTaskNo,
    deleteCertTaskRecord,
    updateCertTaskRecord,
    insertCertTaskRecord,
  } from '/@/api/cert/taskRecord';
  import { TaskRecordModel } from '/@/api/cert/model/taskRecordModel';
  import { dateFormat } from '/@/utils/filter';
  import { TaskStat } from '/@/api/cert/model/taskModel';
  import { useCertStore } from '/@/store/modules/cert';
  import { storeToRefs } from 'pinia';
  import TaskStatTag from '../TaskStatTag/TaskStatTag.vue';

  const certStore = useCertStore();
  const { taskStats } = storeToRefs(certStore);

  const { notification } = useMessage();

  const taskRecords = ref<TaskRecordModel[]>([]);

  const taskNo: Ref<string | undefined> = inject('editingTaskNo') as Ref<string | undefined>;

  onMounted(() => {
    watchEffect(() => {
      loadRecords();
    });
  });

  const loadRecords = async () => {
    if (!taskNo.value) return;
    taskRecords.value = await getCertTaskRecordsByTaskNo(taskNo.value as string);
    // console.log(taskNo.value, taskRecords.value);
  };

  const emptyRecord = {
    taskNo: taskNo.value,
    taskStat: 'NEW' as TaskStat,
    content: '',
    recordTime: dayjs(),
  };
  const newRecEditorVisible = ref(false);
  const newRecord = reactive(emptyRecord);

  const showNewRecEditor = () => {
    newRecEditorVisible.value = true;
    Object.assign(newRecord, emptyRecord);
  };

  const handleCreate = async (record: Partial<TaskRecordModel>) => {
    try {
      newRecEditorVisible.value = false;
      const pass = await insertCertTaskRecord(record);
      notification.success({
        message: '记录创建成功',
        description: `任务记录 ${pass.recordNo} 已保存`,
      });
    } catch (e) {
      console.log('新建记录失败', e);
    } finally {
      await loadRecords();
    }
  };

  const handleCancel = () => {
    console.log('取消新建任务');
    newRecEditorVisible.value = false;
  };

  const handleUpdate = async (record: TaskRecordModel) => {
    try {
      await updateCertTaskRecord(record as TaskRecordModel);
      notification.success({
        message: '记录更新成功',
        description: `任务记录 ${record.recordNo} 已更新`,
      });
    } catch (e) {
      console.log('记录更新失败', e);
      await loadRecords();
    }
  };

  const handleDelete = async (record: TaskRecordModel) => {
    await deleteCertTaskRecord(record.recordNo);
    notification.success({
      message: '记录删除成功',
      description: `任务记录 ${record.recordNo} 已删除`,
    });
    await loadRecords();
  };
</script>

<style scoped>
  .newRecEditor {
    margin-top: 12px;
  }
</style>
