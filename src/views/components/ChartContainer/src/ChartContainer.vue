<template>
  <a-card
    v-bind="$attrs"
    size="small"
    style="height: 100%"
  >
    <slot name="title"></slot>
    <template #extra>
      <a-space>
        <slot name="extra"></slot>
        <Icon icon="ant-design:pushpin-outlined" @click="handlePin" style="cursor: pointer" />
        <Icon icon="ant-design:close-outlined" @click="handleClose" style="cursor: pointer" />
      </a-space>
    </template>
    <div :id="id" style="height: 100%"></div>
  </a-card>
</template>

<script setup lang="ts" name="ChartContainer">
  import { toRefs, onMounted } from 'vue';
  import { Icon } from '/@/components/Icon';

  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  });
  const { id } = toRefs(props);
  const handleClose = () => {
    console.log(`closing chart ${id.value}`);
  };
  const handlePin = () => {
    console.log(`pin chart ${id.value}`);
  };
</script>

<style scoped>
  :deep(.ant-card-body) {
    height: calc(100% - 38px);
  }
</style>
