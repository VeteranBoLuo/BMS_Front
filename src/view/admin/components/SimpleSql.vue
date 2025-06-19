<template>
  <div class="simple-sql-container">
    <div class="flex-align-center-gap" style="width: 100%; height: 300px">
      <BInput type="textarea" v-model:value="sql" :rows="16"  />
      <div>
        <div class="quick-area">
          <div style="width: 100%">
            <p>快捷sql</p>
            <div style="overflow: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 10px">
              <div
                v-for="item in sqlOptions"
                :key="item.value"
                class="common-tag dom-hover"
                @click="sqlSelect(item.value)"
                >{{ item.label }}</div
              >
            </div></div
          >
          <div style="width: 100%">
            <p>关键词</p>
            <div style="overflow: auto; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px">
              <div v-for="item in keyWords" :key="item" class="common-tag dom-hover" @click="sqlSelect(item)">{{
                item
              }}</div>
            </div>
          </div>
        </div>
        <div>
          <p>表</p>
          <div class="flex-align-center-gap">
            <div v-for="item in tables" :key="item" class="common-tag dom-hover" @click="sqlSelect(item)">{{
              item
            }}</div>
          </div>
        </div>
      </div>
    </div>

    <b-button @click="runSql">运行</b-button>
    <div class="log-result">
      {{ result }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import request from '@/http/request.ts';
  import BInput from '@/components/base/BasicComponents/BInput.vue';
  import BButton from '@/components/base/BasicComponents/BButton.vue';

  const sql = ref('');
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

  const sqlOptions = [
    {
      label: '物理删除所有攻击日志',
      value: 'delete from attack_logs',
    },
    {
      label: '逻辑删除指定id书签',
      value: 'update bookmark set del_flag=1  where id=',
    },
    {
      label: '逻辑删除指定id标签',
      value: 'update tag set del_flag=1  where id=',
    },
  ];
  function sqlSelect(e) {
    sql.value += ` ${e}`;
  }

  const keyWords = ['add', 'select', 'delete', 'update', 'where', 'insert', 'order by'];

  const tables = ['api_logs', 'bookmark', 'note', 'note_images', 'operation_logs', 'opinion', 'tag', 'user', 'files'];
</script>

<style lang="less" scoped>
  .simple-sql-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .quick-area {
    display: flex;
    height: 100%;
    gap: 10px;
  }
  .log-result {
    border: 1px solid #ccc;
    padding: 12px;
    white-space: pre-wrap;
    font-size: 14px;
    height: 400px;
    box-sizing: border-box;
    width: 100%;
    overflow: auto;
  }
</style>
