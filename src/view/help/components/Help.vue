<template>
  <div class="help-container">
    <b-button
      style="position: absolute; right: 20px"
      :style="{ left: bookmark.isPhone ? '' : '187px' }"
      @click="handleToBack"
      v-click-log="{ module: '帮助中心', operation: `返回` }"
      >返回</b-button
    >
    <b-space style="width: 100%">
      <b-input
        v-model:value="searchValue"
        :style="{ width: bookmark.isPhone ? 'calc(100% - 80px)' : '145px' }"
        placeholder="目录名..."
      />
    </b-space>
    <div class="help-body">
      <div
        v-if="bookmark.isPhone"
        class="help-title"
        style="position: relative; top: 10px"
        @click="checkId = ''"
        v-click-log="{ module: '帮助中心', operation: `使用介绍` }"
        >使用介绍</div
      >
      <div v-if="!bookmark.isPhone" :style="{ width: '150px' }">
        <div class="help-title" @click="checkId = ''" v-click-log="{ module: '帮助中心', operation: `使用介绍` }"
          >使用介绍</div
        >
        <BList style="font-size: 12px" :listOptions="viewOptions" @nodeClick="logItem" :check-id="checkId">
          <template #icon>
            <svg-icon :src="icon.help_document" />
          </template>
        </BList>
      </div>
      <div v-else class="phone-help-menu">
        <div
          v-for="item in viewOptions"
          :style="{
            background: checkId === item.id ? '#4e4b46' : '',
            color: checkId === item.id ? 'white' : '',
          }"
          class="phone-help-menu-item"
          @click="checkId = item.id"
          v-click-log="{ module: '帮助中心', operation: `${item.title}` }"
        >
          {{ item.title }}
        </div>
      </div>
      <div
        id="view-body"
        :style="{ width: bookmark.isPhone ? 'calc(100% - 40px)' : 'calc(100% - 150px)' }"
        style="
          height: 100%;
          border: 1px solid var(--card-border-color);
          border-radius: 4px;
          padding: 20px;
          overflow: auto;
          line-height: 2rem;
          flex-grow: 1;
        "
        v-html="content"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
  import BList from '@/components/BasicComponents/BList/BList.vue';
  import icon from '@/config/icon.ts';
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import { bookmarkStore } from '@/store';
  import BInput from '@/components/BasicComponents/BInput/BInput.vue';
  import BButton from '@/components/BasicComponents/BButton/BButton.vue';
  import BSpace from '@/components/BasicComponents/BSpace/BSpace.vue';

  import tagAndBookmark from '@/assets/img/help/tag_bookmark_relation.jpg';
  import addTagAndBookmark from '@/assets/img/help/add_data.jpg';
  import tagEdit from '@/assets/video/tag_edit.webm';
  import bookmarkEdit from '@/assets/video/bookmark_edit.webm';
  import tagMg from '@/assets/img/help/tagMg.jpg';
  import bookmarkMg from '@/assets/img/help/bookmarkMg.jpg';
  import opinionMg from '@/assets/img/help/opinionMg.png';

  import 'viewerjs/dist/viewer.css'; //样式文件不要忘了
  import Viewer from 'viewerjs';
  import BViewer from '@/components/Viewer/BViewer.vue';
  import router from '@/router';

  const bookmark = bookmarkStore();
  const checkId = ref('');
  function logItem(item) {
    checkId.value = item.id;
    nextTick(() => {
      const dom = document.getElementById('view-body');
      if (dom) {
        dom.scrollTop = 0;
      }
    });
  }
  const searchValue = ref('');
  const viewOptions = computed(() => {
    if (searchValue.value) {
      return listOptions.value.filter((data) => {
        return data.title.includes(searchValue.value);
      });
    }
    return listOptions.value;
  });
  function handleToBack() {
    if (bookmark.isPhone) {
      router.push('/personCenter');
    } else {
      router.push('/home');
    }
  }
  const listOptions = ref([
    {
      id: '书签与标签',
      title: '书签与标签',
      content: `<div class="tag-explanation">
    <h2>理解标签与书签</h2>

      <div class="bookmark-definition">
      <h3>什么是标签？</h3>
     <p>标签是用于描述内容、分类或属性的关键词，它帮助我们组织和分类信息。在本网站中，标签用于对书签进行分类，使得查找和浏览更加高效。</p>
    </div>
    <div class="bookmark-definition">
      <h3>什么是书签？</h3>
      <p>书签是保存网站链接以便快速访问的一种方式。你可以将喜欢的网页或资源添加到书签中，以便日后快速检索。</p>
    </div>

    <h3>标签与书签的关系</h3>
    <p>一个标签下可以有多个书签。例如，"文档"标签可能包含各种文档网站的书签，菜鸟教程、Vue官方网站等。</p>
    <p>同样，一个书签也可以属于多个标签。例如，Vue的官方网站可能同时属于"Vue"和"文档"这两个标签，因为它既与Vue相关，又是一个文档网站。</p>

    <div class="bookmark-example">
      <h3>关系示例</h3>
      <img src="${tagAndBookmark}"  alt="书签示例" class="bookmark-image"   />
      <p style="font-size: 12px">
      <i>书签标签关系图</i>
  </p>
    </div>
  </div>`,
    },
    {
      id: '数据管理',
      title: '数据管理',
      content: `<div class="tag-explanation">
    <div class="bookmark-example">
      <img src="${addTagAndBookmark}" alt="书签示例" class="bookmark-image">
      <p style="font-size: 12px">
      <i>快速新增示意图</i>
  </p>
    </div>
    <div class="bookmark-example">
      <img style="width: 80%" src="${tagMg}" alt="标签管理示例" class="bookmark-image">
      <p style="font-size: 12px">
      <i>标签管理页面</i>
  </p>
    </div>
    <div class="bookmark-example">
      <img style="width: 80%" src="${bookmarkMg}" alt="书签管理" class="bookmark-image">
      <p style="font-size: 12px">
      <i>书签管理页面</i>
  </p>
    </div>
  </div>`,
    },
    {
      id: '标签管理',
      title: '标签管理',
      content: `<div class="tag-explanation">
    <div class="bookmark-example">
     <video width="85%" controls>
    <source src="${tagEdit}" />
  </video>
      <p style="font-size: 12px">
      <i>标签管理演示视频</i>
  </p>
    </div>
    <p>1、标签图标支持手动填写和文件上传</p>
    <p>2、手动填写时，图标网站强烈推荐 <a target="_blank" href="https://icon-sets.iconify.design/"><b>Iconify</b></a>，视频演示中获取图标的网站就是Iconify。
    Iconify提供了大量的开源图标集，适用于各种项目。这些图标集涵盖了多种风格和主题，如Material Design、UI设计、编程标志、表情符号等。<br/>
    网站支持筛选功能，便于快速找到所需图标。此外，Iconify提供的图标具有多种尺寸和格式，灵活适应不同的设计需求。最重要的是，这些图标都是开源的，
    使用起来非常方便。</p>
  <p>3、设置标签图标时，可支持的格式有svg、base64、图标在线地和iconfy的vue组件等，直接复制即可，例如：</p>
   <ul style="text-align: left">
      <li>svg：<div class="svg-code">&lt;svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
  \t&lt;rect width="24" height="24" fill="none" />
  \t&lt;path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2m-1 0h7m-1 14h-5" />
  &lt;/svg></div>
  </li>
      <li>base64：<div class="svg-code">data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdo
      dD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0i
      bm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRo
      PSIyIiBkPSJNMTQuNSAydjE3LjVjMCAxLjQtMS4xIDIuNS0yLjUgMi41cy0yLjUtMS4xLTIuNS0yLjVWMm0tMSAwaDdtLTEgMTRoLTUiIC8+Cjwvc3Z
      nPg==</div</li>
      <li>在线地址：<div class="svg-code">https://img2.baidu.com/it/u=399286100,2135569916&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=625<div/></li>
      <li>iconfy的vue组件：<div class="svg-code">&lt;Icon icon="lucide:test-tube" /></div</li>
    </ul>
  </div>`,
    },
    {
      id: '书签管理',
      title: '书签管理',
      content: `<div class="tag-explanation">
    <div class="bookmark-example">
       <div class="bookmark-example">
     <video width="85%" controls>
    <source src="${bookmarkEdit}" />
  </video>
      <p style="font-size: 12px">
      <i>书签管理演示视频</i>
  </p>
    </div>
  <p>系统会根据书签的网站地址，自动获取网站图标</p>
  </div>`,
    },
    {
      id: '意见反馈',
      title: '意见反馈',
      content: `<div class="tag-explanation" >
     <div class="bookmark-example">
      <img style="width: 80%" src="${opinionMg}" alt="标签管理示例" class="bookmark-image">
      <p style="font-size: 12px">
      <i>意见反馈页面</i>
  </p>
    </div>
  <p><li>模块宗旨</li><span style="font-size: 14px">意见反馈模块旨在搭建一个用户与项目开发人员之间沟通的桥梁，便于您及时向我反映在使用过程中遇到的问题、提出的建议以及期望的功能，帮助我不断优化产品，为您提供更优质的服务。</span>
<br/>
<li>模块功能</li>
<span style="font-size: 14px">问题反馈：您可以在此提交在使用项目过程中遇到的问题，如功能异常、操作不便等，我将尽快为您解决。<br/>
建议征集：欢迎您提出宝贵建议，包括功能优化、界面美化、操作简化等方面，我会认真倾听并积极采纳。<br/>
点赞与鼓励：如果您对我的项目表示满意，也可以在此给予我肯定和鼓励，激励我继续努力。<br/>
实时跟进：提交反馈后，您可以实时查看反馈处理进度，了解解决结果。</span>

<br/>

<li>使用指南</li>
<span style="font-size: 14px">进入意见反馈模块：项目右上角头像下拉框中找到“意见反馈”入口，点击进入。
填写反馈内容：根据提示，详细描述您遇到的问题或建议，以便我更快地为您解决问题。<br/>
提交反馈：确认无误后，点击“提交”按钮，您的反馈将实时发送至项目团队。<br/>
查看反馈进度：在“我的反馈”页面，您可以查看已提交反馈的处理进度及回复。</span>

<br/>

<li>温馨提示</li>
<span style="font-size: 14px">请确保反馈内容真实、客观、具体，以便我更好地为您解决问题。
为保护您的隐私，请勿在反馈内容中透露个人信息。
我会尽快处理您的反馈，请您耐心等待。</span>
<br/>
感谢您对项目的支持与关注，您的意见是我不断进步的动力！让我们共同努力，打造更优质的产品和服务。</p>
  </div>`,
    },
  ]);
  const content = computed(() => {
    const item = listOptions.value.find((data) => data.id === checkId.value);
    if (item) {
      return item.content || '';
    }
    return helpInfo;
  });

  const helpInfo = `<div class="help-document-intro">
    <h2>欢迎来到帮助中心</h2>
    <p>您好！感谢您使用【智汇云书签】。本帮助文档旨在为您提供详细的使用指南和解答常见问题，帮助您更高效地使用此平台。在这里，您可以找到关于以下方面的详细介绍：</p>
    <ul>
      <li><strong>账号管理</strong>：如何注册、登录、找回密码及修改个人信息。</li>
      <li><strong>功能操作</strong>：平台各项功能的操作步骤和注意事项。</li>
      <li><strong>常见问题解答</strong>：针对用户在使用过程中遇到的问题提供解决方案。</li>
    </ul>
    <p>为了更好地帮助您，请根据左侧目录或搜索框查找您需要了解的内容。如果您在使用过程中遇到任何问题，请通过意见反馈，提出您宝贵的的建议。也可以通过以下方式联系我：</p>
    <ul>
      <li>邮箱：1902013368@qq.com</li>
    </ul>
    <p>感谢您的理解与支持！</p>
  </div>`;

  function setupClickListener() {
    document.addEventListener('click', imgClick);
  }
  function removeClickListener() {
    document.removeEventListener('click', imgClick);
  }
  function imgClick(e: any) {
    if (e.target?.className === 'bookmark-image') {
      bookmark.refreshViewer(e.target.src, {});
    }
  }
  onMounted(() => {
    setupClickListener();
  });

  onUnmounted(() => {
    removeClickListener();
  });
</script>

<style lang="less" scoped>
  .help-container {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    display: flex;
    gap: 10px;
  }
  .help-title {
    height: 30px;
    line-height: 1rem;
    background-color: #fe2c55;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .help-body {
    display: flex;
    gap: 20px;
    height: calc(100% - 80px);
  }

  .tag-explanation {
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }
  .bookmark-definition {
    background-color: var(--background-color);
    border-left: 4px solid #007bff;
    padding: 10px 20px;
    margin: 20px 0;
  }
  .bookmark-example {
    text-align: center;
  }
  .bookmark-image {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    padding: 5px;
  }
  .svg-code {
    font-family: 'Courier New', Courier, monospace;
    overflow-wrap: break-word;
    background-color: var(--background-color);
    padding: 10px;
    border: 1px solid #ccc;
  }
</style>
