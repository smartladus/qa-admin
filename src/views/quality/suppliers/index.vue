<template>
  <div class="p-4">
    <a-button @click="fetchInfo">dd</a-button>
    {{ info }}
  </div>
</template>

<script setup lang="ts" name="suppliers">
  import { ref } from 'vue';
  import { getAllSuppliers } from '/@/api/quality/supplier';

  const info = ref();

  const fetchInfo = async () => {
    info.value = await getAllSuppliers();
  }
</script>

<style scoped>

</style>
