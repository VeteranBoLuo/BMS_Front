<template>
  <div class="card-body" @click="toNewPage">
    <div class="card-title">
      <div style="display: flex; align-items: center; gap: 10px">
        <div class="card-img-container">
          <img :id="cardInfo.id" :src="getIcon(cardInfo)" width="22" height="22" alt=" " />
        </div>
        <span class="card-title-text">{{ cardInfo.name }}</span></div
      >
    </div>
    <div class="card-description">{{ cardInfo.description }}</div>
    <div class="footer-tag">
      <div class="common-tag" @click="handleToTagPage(tag)" v-for="tag in cardInfo.tagList" @click.stop>
        <span>{{ tag.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { bookmarkStore, useUserStore } from '@/store';
  import router from '@/router';
  import { onMounted } from 'vue';

  const bookmark = bookmarkStore();
  const props = defineProps({
    cardInfo: {
      type: Object as () => {
        id?: string;
        name: string;
        description: string;
        url: string;
        tags: any;
        tagList?: any;
      },
      default: () => ({
        id: '',
        name: '哔哩哔哩',
        description: '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili',
        url: 'https://www.bilibili.com/',
        tags: [],
        tagList: undefined, // 你可以根据实际情况决定是否需要提供默认值
      }),
    },
  });

  function toNewPage() {
    if (!props.cardInfo.url.includes('https') || !props.cardInfo.url.includes('http')) {
      props.cardInfo.url = 'https://' + props.cardInfo.url;
    }
    window.open(props.cardInfo.url, '_blank');
  }

  function handleToTagPage(tag) {
    router.push(`/home/${tag.id}`);
    bookmark.type = 'normal';
  }

  function getIcon(bookmark: any) {
    if (bookmark.iconUrl) {
      return bookmark.iconUrl;
    } else {
      return 'https://icon.bqb.cool?url=' + bookmark.url;
    }
  }

  const user = useUserStore();
  onMounted(() => {
    const imgElement = document.getElementById(props.cardInfo.id);
    if (imgElement) {
      // 监听图片加载错误事件
      imgElement.onerror = function () {
        // 设置默认图片
        this.src =
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjhlbSIgaGVpZ2h0PSIwLjhlbSIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBmaWxsPSIjNWI1YjViIiBkPSJNMTAgMjBhMTAgMTAgMCAxIDEgMC0yMGExMCAxMCAwIDAgMSAwIDIwbTcuNzUtOGE4IDggMCAwIDAgMC00aC0zLjgyYTI5IDI5IDAgMCAxIDAgNHptLS44MiAyaC0zLjIyYTE0LjQgMTQuNCAwIDAgMS0uOTUgMy41MUE4LjAzIDguMDMgMCAwIDAgMTYuOTMgMTRtLTguODUtMmgzLjg0YTI0LjYgMjQuNiAwIDAgMCAwLTRIOC4wOGEyNC42IDI0LjYgMCAwIDAgMCA0bS4yNSAyYy40MSAyLjQgMS4xMyA0IDEuNjcgNHMxLjI2LTEuNiAxLjY3LTR6bS02LjA4LTJoMy44MmEyOSAyOSAwIDAgMSAwLTRIMi4yNWE4IDggMCAwIDAgMCA0bS44MiAyYTguMDMgOC4wMyAwIDAgMCA0LjE3IDMuNTFjLS40Mi0uOTYtLjc0LTIuMTYtLjk1LTMuNTF6bTEzLjg2LThhOC4wMyA4LjAzIDAgMCAwLTQuMTctMy41MWMuNDIuOTYuNzQgMi4xNi45NSAzLjUxem0tOC42IDBoMy4zNGMtLjQxLTIuNC0xLjEzLTQtMS42Ny00UzguNzQgMy42IDguMzMgNk0zLjA3IDZoMy4yMmMuMi0xLjM1LjUzLTIuNTUuOTUtMy41MUE4LjAzIDguMDMgMCAwIDAgMy4wNyA2Ii8+PC9zdmc+';
      };
    }
  });
</script>

<style lang="less">
  @import 'src/assets/css/theme';

  .card-body {
    border: 2px solid var(--card-border-color);
    height: 150px;
    border-radius: 1rem;
    padding: 14px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;

    &:hover {
      box-shadow: 0 8px 8px rgba(59, 130, 246, 0.5);
      border: 2px solid var(--primary-h-color);

      .del-icon {
        opacity: 1;
      }

      .edit-icon {
        opacity: 1;
      }
    }
  }

  .card-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .card-title-text {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .card-img-container {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.125rem;
    background-color: rgb(255, 255, 255);
    border-radius: 0.5rem;
    flex-shrink: 0;
  }

  .card-description {
    word-break: break-all;
    overflow: hidden;
    width: 100%;
    font-size: 12px;
    color: var(--desc-color);
    margin-top: 8px;
    height: 50px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* 显示的行数，根据需要调整 */
  }

  .footer-tag {
    position: absolute;
    bottom: 14px;
    display: flex;
    gap: 8px;
  }

  .del-icon {
    opacity: 0;
    position: absolute;
    right: -10px;
    top: -10px;
    z-index: 10;
  }

  .edit-icon {
    opacity: 0;
  }

  @media (max-width: 600px) {
    .card-body {
      height: 140px;
      &:hover {
        box-shadow: none; /* 移除 :hover 状态下的阴影 */
        border: 2px solid var(--card-border-color);
      }
    }

    .card-title {
      .card-title-text {
        width: 280px;
      }
    }

    .footer-tag {
      bottom: 12px;
    }

    .card-description {
      height: 2rem;
      -webkit-line-clamp: 2; /* 显示的行数，根据需要调整 */
    }
  }
</style>
