<template>
  <BasicDrawer
    v-bind="$attrs"
    :title="taskNo === 'new' ? '新建任务' : '任务编辑'"
    :isDetail="true"
    @close="handleClose"
  >
    <a-card title="任务信息" size="small">
      <TaskEditForm />
    </a-card>
    <template v-if="taskNo !== 'new'">
      <a-divider />
      <a-card title="历史记录" size="small">
        <template #extra>
          <a-button preIcon="ant-design:upload" @click="openModal">批量上传</a-button>
          <UploadModal
            @register="regUploadModal"
            v-bind="uploadSetting"
            @unload-succeed="onUnloadSucceed"
          />
        </template>
        <TaskRecord />
      </a-card>
    </template>
  </BasicDrawer>
</template>

<script setup lang="ts" name="TaskEditDrawer">
  import { inject, Ref } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  import TaskEditForm from './TaskEditForm.vue';
  import TaskRecord from './TaskRecord.vue';
  import { useModal } from '/@/components/Modal';
  import { UploadModal, UploadModalSetting } from '/@/views/components/UploadModal';
  import { uploadCertTaskRecords } from '/@/api/cert/taskRecord';

  const taskNo: Ref<string | undefined> = inject('editingTaskNo') as Ref<string | undefined>;
  const handleClose = () => (taskNo.value = undefined);

  // 上传窗口操作
  const [regUploadModal, { openModal, closeModal }] = useModal();
  const uploadSetting: UploadModalSetting = {
    title: '上传任务记录',
    uploadApi: uploadCertTaskRecords,
  };

  const onUnloadSucceed = () => closeModal();
</script>

<style scoped lang="less"></style>
