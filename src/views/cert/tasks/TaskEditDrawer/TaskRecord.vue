<template>
  <a-button preIcon="ant-design:plus" type="dashed" block @click="showNewRecEditor">新建一条记录</a-button>
  <MarkDownEditor
    v-if="newRecEditorVisible"
    mode="edit"
    class="newRecEditor"
    @save="handleSave"
    @cancel="handleCancel"
  >
    <template #action-of-edit>
      <a-date-picker show-time></a-date-picker>
      <a-select></a-select>
    </template>
  </MarkDownEditor>
  <a-divider />
  <a-empty v-if="taskRecords.length === 0">
    <template #description>
      <a-typography-text disabled>暂无记录</a-typography-text>
    </template>
  </a-empty>
</template>

<script setup lang="ts" name="TaskRecord">
  import { ref, toRefs, onUpdated } from 'vue';
  import { MarkDownEditor } from '/@/views/components/MarkDownEditor';

  const taskRecords = ref([]);
  const props = defineProps({
    taskNo: {
      type: String,
      required: true,
    },
  });
  const { taskNo } = toRefs(props);
  onUpdated(() => {
    console.log('taskNo: ', taskNo?.value);
  });

  const newRecEditorVisible = ref(false);
  const showNewRecEditor = () => {
    newRecEditorVisible.value = true;
  };

  const handleSave = (val) => {
    console.log('保存数据：', val);
    newRecEditorVisible.value = false;
  };

  const handleCancel = () => {
    newRecEditorVisible.value = false;
  };
</script>

<style scoped>
  .newRecEditor {
    margin-top: 12px;
  }
</style>
