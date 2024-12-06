<template>
  <div class="area-container">
    <div class="area-qa" id="area-qa">
      <div
        v-for="(item, index) in words"
        :kye="index"
        :class="item.contentType"
        style="margin-bottom: 16px"
      >
        <div style="white-space: pre-wrap">{{ item.content }}</div>
      </div>
    </div>
    <div class="area-submit">
      <a-textarea
        v-model:value="inputValue"
        style="height: 100%; width: 100%; resize: none"
        placeholder="请在这里输入内容"
        @keydown.enter="handleEnter"
      />
      <div class="setting-btn">
        <img src="@/assets/icons/setting.svg" style="height: 16px; width: 16px" />
        <span>设置</span>
      </div>
      <div class="retrieve_clear-btn" @click="clearContent">
        <img src="@/assets/icons/retrieve_clear.svg" style="height: 16px; width: 16px" />
        <span>清空</span>
      </div>
      <img src="@/assets/icons/send.svg" class="send-btn" @click="submit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, ref } from 'vue';
  import { checkEndCondition, endCondition } from '@/utils/validator';
  const inputValue = ref('');
  const words = ref([
    {
      content: '你好，请在下方编辑框输入内容进行提问 (点击设置按钮进行问答配置)',
      contentType: 'answer',
    },
  ]);
  const loading = ref(false);
  async function submit() {
    const conditions: endCondition[] = [
      {
        endCondition: loading.value,
        message: '当前对话进行中',
      },
      {
        endCondition: !inputValue.value,
        message: '请输入',
      },
    ];
    if (checkEndCondition(conditions)) {
      return;
    }
    loading.value = true;
    words.value.push({
      content: inputValue.value,
      contentType: 'question',
    });
    inputValue.value = '';

    // 获取回答语句，同时进入加载状态
    words.value.push({
      content: '正在搜索并生成回答',
      contentType: 'loading',
    });
    await scrollToBottom();
    const sentPost = await new Promise((resolve, reject) => {
      let dotCount = 3;
      const interVal = setInterval(() => {
        dotCount = (dotCount + 1) % 4; // 4 states: 0, 1, 2, 3 dots
        let dots = '';
        for (let i = 0; i < dotCount; i++) {
          dots += '. ';
        }
        words.value[words.value.length - 1].content = `正在搜索并生成回答${dots}`;
      }, 300);
      const timer = setTimeout(() => {
        clearTimeout(timer);
        clearInterval(interVal);
        resolve([
          {
            metadata: [
              {
                id: '848',
                cfdName: '内部员工',
                input: '在3GPP TS 33.501中，Key refresh和Key re-keying的具体触发条件是什么？',
                outputs:
                  '根据3GPP TS 33.501，Key refresh的触发条件是任一SRB或DRB的上行或下行PDCP COUNT即将发生翻转，而Key re-keying的触发条件是核心网对UE重新认证或KAMF变化等场景（由核心网判断），具体如下：\n1. Key refresh（gNodeB触发）：当任一SRB或DRB的上行或下行PDCP COUNT即将发生翻转时，为防止重复密钥流，会触发gNodeB和UE进行密钥更新。\n2. Key re-keying（AMF触发）：核心网对UE重新认证或KAMF变化等场景（由核心网判断），AMF会根据KAMF以及NAS SMC中重新获得的NAS uplink COUNT，派生出新的KgNB。AMF通过NGAP UE CONTEXT MODIFICATION REQUEST消息将新的KgNB下发给gNodeB，触发gNodeB和UE进行密钥更新。',
                instruction: null,
                docFragmentSource: null,
                docFragmentUrl: null,
                engineRes: {
                  score: 0.22725888296639846,
                  product: '',
                  data_id: 848,
                  granularity: '',
                  data_type: 'QA',
                  text: '在3gpp ts 33.501中，key refresh和key re-keyi g的具体触发条件是什么？',
                  query_type: 'input',
                  doc_id: '',
                  security_level: 1,
                  scene: '',
                },
              },
            ],
            dataType: 'QA',
            text: '在3GPP TS 33.501中，Key refresh和Key re-keying的具体触发条件是什么？',
          },
        ]);
      }, 2000);
    });
    // 获取到回答内容后，将加载语句转换为回答语句
    const charts = JSON.stringify(sentPost, null, 2).split('');
    let len = 0;
    words.value[words.value.length - 1].content = '';
    if (charts.includes('\n')) {
      words.value[words.value.length - 1].contentType = 'wrap-answer';
    } else {
      words.value[words.value.length - 1].contentType = 'answer';
    }
    const replyInterval = setInterval(() => {
      if (len < charts.length) {
        words.value[words.value.length - 1].content += charts[len];
        len++;
        if (charts[len] === '\n') {
          scrollToBottom();
        }
      } else {
        clearInterval(replyInterval);
        scrollToBottom();
        loading.value = false;
      }
    }, 1);
  }
  // scroll to bottom
  async function scrollToBottom() {
    await nextTick(() => {
      qaDiv!.scrollTop = qaDiv!.scrollHeight;
    });
  }
  function handleEnter(e: KeyboardEvent) {
    e.preventDefault();
    submit();
  }

  function clearContent() {
    words.value = [
      {
        content: '正在搜索并生成回答',
        contentType: 'loading',
      },
    ];
  }
  let qaDiv: any;
  onMounted(() => {
    qaDiv = document.getElementById('area-qa');
  });
</script>

<style lang="less" scoped>
  .area-container {
    width: calc(100% - 90px);
    height: 100%;
    padding: 0 45px;
  }
  .area-qa {
    background: #f1f5f8;
    height: 85%;
    overflow: auto;
    padding: 32px;
    color: rgb(113, 117, 127);
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
    font-family: HarmonyOS Sans SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0px;
  }
  .area-submit {
    position: relative;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    height: 15%;
    color: rgb(113, 117, 127);
    font-family: HarmonyOS Sans SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: left;
  }
  .answer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    word-break: break-all;
    line-height: 25px;
    min-height: 45px; // 设置answer为''时如果没有文本内容会导致高度降低，滚动条会闪一下，所有设置最小高度解决
    max-width: max-content;
    box-sizing: border-box;
    padding: 10px 16px;
    border-radius: 2px 16px 16px 16px;
    background: rgb(255, 255, 255);
  }
  .wrap-answer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    word-break: break-all;
    line-height: 25px;
    white-space: pre-wrap;
    max-width: 100%;
    box-sizing: border-box;
    padding: 10px 16px;
    border-radius: 2px 16px 16px 16px;
    background: rgb(255, 255, 255);
  }
  .loading {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    line-height: 25px;
    padding: 10px 16px;
    box-sizing: border-box;
    border-radius: 2px 16px 16px 16px;
    background: rgb(255, 255, 255);
    width: 180px;
  }
  .question {
    display: flex;
    flex-direction: row;
    line-height: 25px;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 16px;
    box-sizing: border-box;
    word-break: break-all;
    max-width: max-content;
    border-radius: 16px 2px 16px 16px;
    margin-left: auto;
    color: white;
    background: rgb(46, 134, 222);
  }

  /*滚动条样式*/
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .setting-btn {
    box-sizing: border-box;
    height: 32px;
    width: 64px;
    border-radius: 16px;
    background: rgb(255, 255, 255);
    position: absolute;
    cursor: pointer;
    display: flex;
    padding: 8px;
    gap: 4px;
    align-items: center;
    left: 16px;
    top: -50px;
  }
  .send-btn {
    height: 20px;
    width: 26px;
    position: absolute;
    right: 22px;
    bottom: 22px;
    cursor: pointer;
  }
  .retrieve_clear-btn {
    box-sizing: border-box;
    height: 32px;
    width: 64px;
    border-radius: 16px;
    background: rgb(255, 255, 255);
    position: absolute;
    cursor: pointer;
    display: flex;
    padding: 8px;
    gap: 4px;
    align-items: center;
    left: 100px;
    top: -50px;
  }
</style>
