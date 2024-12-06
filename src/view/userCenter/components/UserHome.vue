<template>
  <b-loading :loading="loading">
    <div class="home-container">
      <div class="flex-align-center" style="gap: 20px">
        <div
          class="user_icon"
          @click="zoomImage"
          v-click-log="{ module: '用户首页', operation: `查看头像` }"
        >
          <svg-icon
            img-id="viewUserImg"
            :src="user.headPicture || icon.navigation_user"
            size="50"
          />
        </div>
        <span>
          <b title="昵称">{{ user.alias || '默认昵称' }}</b>
          <div title="账号" style="font-size: 12px">{{ user.userName }}</div>
        </span>
      </div>
      <hr style="margin: 20px 0" />
      <div class="view-area-title">数据总览</div>
      <div class="home-detail-body">
        <div class="view-item">
          <svg-icon :src="icon.userCenter_tag" size="50" />
          <div>标签数量</div>
          {{ pageData.tagLen }}
        </div>
        <div class="view-item">
          <svg-icon :src="icon.userCenter_bookmark" size="50" />
          <div>书签数量</div>
          {{ pageData.bookmarkLen }}
        </div>
      </div>
      <div  class="modal" @click="closeModal">
        <img class="modal-content" id="modalImage" />
      </div>
    </div>
  </b-loading>
</template>

<script lang="ts" setup>
  import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue';
  import { bookmarkStore, useUserStore } from '@/store/index';
  import { onMounted, reactive, ref } from 'vue';
  import { apiQueryPost } from '@/http/request';
  import icon from '@/config/icon.ts';
  import BLoading from '@/components/BasicComponents/BLoading/BLoading.vue';
  import userApi from '@/api/userApi';
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css'; //样式文件不要忘了
  const user = useUserStore();
  const bookmark = bookmarkStore();

  const pageData = reactive({
    tagLen: 0,
    bookmarkLen: 0,
  });
  const loading = ref(false);
  onMounted(() => {
    loading.value = true;
    const userPromise = userApi.getUserInfoById({ id: localStorage.getItem('userId') });
    const tagPromise = apiQueryPost('/api/bookmark/queryTagList', {
      filters: {
        userId: localStorage.getItem('userId'),
      },
    });
    const bookmarkPromise = apiQueryPost('/api/bookmark/getBookmarkList', {
      filters: {
        userId: localStorage.getItem('userId'),
        type: 'all',
      },
    });
    Promise.all([userPromise, tagPromise, bookmarkPromise])
      .then(([userRes, tagRes, bookmarkRes]) => {
        user.setUserInfo(userRes.data);
        pageData.tagLen = tagRes.data.length;
        pageData.bookmarkLen = bookmarkRes.data.items.length;
      })
      .finally(() => {
        loading.value = false;
      });
  });
  //显示模态框
  function zoomImage() {
    const viewer = new Viewer(document.getElementById('viewUserImg'), {
      inline: false,
      hidden() {
        viewer.destroy();
      },
    });
    viewer.show();
  }
  //关闭模态框
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
</script>

<style lang="less" scoped>
  [class^='ant-spin'] {
    font-size: unset;
    font-family: 微软雅黑;
  }

  .home-container {
    height: 100%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }

  .user_icon {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #f5f5f5;
    border-radius: 30px;
    cursor: pointer;
    overflow: hidden;
  }

  .home-detail-body {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;

    .view-item {
      &:not(:last-child) {
        //border-right: 1px solid #ccc;
      }
    }
  }

  .view-area-title {
    font-size: 20px;
    font-weight: 555;
    margin-bottom: 20px;
  }

  .view-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  #image {
    width: 100%;
    max-width: 300px;
    cursor: pointer;
  }

  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    padding-top: 20px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .modal-content {
    margin: auto;
    display: block;
    height: 90%;
    width: 80%;
    max-width: 700px;
  }

  .modal-content {
    -webkit-animation-name: zoom;
    -webkit-animation-duration: 0.6s;
    animation-name: zoom;
    animation-duration: 0.6s;
    cursor: pointer;
  }

  /*兼容性写法， 确保在webkit内核的浏览器能正常使用*/
  @-webkit-keyframes zoom {
    from {
      -webkit-transform: scale(0);
    }

    to {
      -webkit-transform: scale(1);
    }
  }

  @keyframes zoom {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }

  /* 关闭按钮 */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: burlywood;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    .home-detail-body {
      display: grid;
      grid-template-columns: 0.5fr 0.5fr;
      gap: 10px;
      .view-item {
        &:not(:last-child) {
        }
      }
    }
    .modal {
      padding-top: 45%;
    }
    .modal-content {
      height: 60%;
      width: 80%;
      max-width: 700px;
    }
  }
</style>
