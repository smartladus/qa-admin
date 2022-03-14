<template>
  <PageWrapper title="抽屉组件使用示例">
    <a-button type="primary" class="my-4" @click="openDrawer(true)"> 打开详情Drawer </a-button>
    <BasicDrawer @register="drawerRegister" :isDetail="true" title="Drawer Title">
      <p class="h-20">Content Message</p>
      <template #titleToolbar> toolbar </template>
    </BasicDrawer>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDrawer, useDrawer } from '/@/components/Drawer';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { PageWrapper, BasicDrawer },
    setup() {
      // 抽屉
      const [drawerRegister, { openDrawer }] = useDrawer();
      return {
        drawerRegister,
        openDrawer,
      };
    },
  });
</script>

<style scoped></style>
