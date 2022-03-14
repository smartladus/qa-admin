<template>
  <a-tag :color="tagProps.color">
    {{ tagProps.label }}
  </a-tag>
</template>

<script setup lang="ts" name="TaskStatTag">
  import { useCertStore } from '/@/store/modules/cert';
  import { storeToRefs } from 'pinia';
  import { TaskStat } from '/@/api/cert/model/taskModel';

  const props = defineProps({
    taskStat: {
      type: String as PropType<TaskStat>,
      required: true,
    },
  });
  const certStore = useCertStore();
  const { getTaskStatByVal } = storeToRefs(certStore);
  const tagProps = getTaskStatByVal.value(props.taskStat);
</script>

<style scoped>

</style>
