<template>
  <BasicDrawer v-bind="$attrs" @register="register" :title="title" :isDetail="true">
    <a-card title="任务信息" size="small">
      <TaskEditForm :taskNo="taskNo" />
    </a-card>
    <template v-if="taskNo !== 'new'">
      <a-divider />
      <a-card title="历史记录" size="small">
        <TaskRecord :taskNo="taskNo" />
      </a-card>
    </template>
  </BasicDrawer>
</template>

<script setup lang="ts" name="TaskEditDrawer">
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import TaskEditForm from './TaskEditForm.vue';
  import TaskRecord from './TaskRecord.vue';
  const title = ref('');
  const taskNo = ref('');
  const [register] = useDrawerInner(async (taskNumber) => {
    title.value = taskNumber === 'new' ? '新建任务' : '任务编辑';
    taskNo.value = taskNumber;
  });
</script>

<style scoped lang="less">

</style>
