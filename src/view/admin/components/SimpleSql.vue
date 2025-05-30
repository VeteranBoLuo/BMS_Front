<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 20px">
    <BInput type="textarea" v-model:value="sql" :rows="8" />
    <b-button @click="runSql">运行</b-button>
    <div
      style="
        border: 1px solid #ccc;
        padding: 12px;
        white-space: pre-wrap;
        font-size: 14px;
        height: 400px;
        box-sizing: border-box;
        width: 100%;
        overflow: auto;
      "
    >
      {{ result }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import request from '@/http/request.ts';
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  const sql = ref('delete from attack_logs');
  const result = ref('');
  function runSql() {
    request({
      url: '/api/common/runSql',
      method: 'post',
      data: { sql: sql.value },
    }).then((res: any) => {
      if (res.status === 200) {
        result.value = res.data;
      } else {
        result.value = res.msg;
      }
    });
  }
</script>

<style lang="less"></style>
