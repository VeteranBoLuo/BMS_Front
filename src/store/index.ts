// src/store/user.js
import { defineStore } from 'pinia';
import { FormInstance, TourProps } from 'ant-design-vue';
import { TagInterface } from '@/config/bookmarkCfg';
import icon from '@/config/icon.ts';
import Viewer from 'viewerjs';
import { createVNode, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import { apiBasePost, apiQueryPost } from '@/http/request.ts';
const getIframeDocument = () => {
  const iframe: any = document.getElementsByClassName('tox-edit-area__iframe')[0];
  return iframe?.contentDocument || iframe?.contentWindow?.document;
};
export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    userName: '默认用户名',
    alias: '默认昵称',
    password: '',
    role: 'visitor',
    headPicture: icon.navigation.user,
    email: '',
    tagTotal: 0,
    bookmarkTotal: 0,
    noteTotal: 0,
    opinionTotal: 0,
    location: {
      province: '',
      city: '',
      rectangle: '',
    },
  }),
  actions: {
    setUserInfo(val) {
      this.id = val.id ?? '';
      this.userName = val.userName ?? '默认用户名';
      this.alias = val.alias ?? '默认昵称';
      this.password = val.password ?? '';
      this.role = val.role ?? 'visitor';
      this.headPicture = val.headPicture ?? icon.navigation.user;
      this.email = val.email ?? '';
      this.tagTotal = val.tagTotal ?? 0;
      this.bookmarkTotal = val.bookmarkTotal ?? 0;
      this.noteTotal = val.noteTotal ?? 0;
      this.opinionTotal = val.opinionTotal ?? 0;
      this.location = val.location ?? {
        province: '',
        city: '',
        rectangle: '',
      };
    },
    resetUserInfo() {
      this.id = '';
      this.userName = '默认用户名';
      this.alias = '默认昵称';
      this.password = '';
      this.role = 'visitor';
      this.headPicture = icon.navigation.user;
      this.email = '';
      this.tagTotal = 0;
      this.bookmarkTotal = 0;
      localStorage.setItem('userId', '');
    },
    getUserInfo() {
      return {
        id: this.id,
        userName: this.userName,
        alias: this.alias,
        password: this.password,
        role: this.role,
        headPicture: this.headPicture,
      };
    },
  },
});

export const bookmarkStore = defineStore('bookmark', {
  state: () =>
    <
      {
        tagData?: TagInterface;
        tagList?: TagInterface[]; // 标签列表
        bookmarkList?: []; // 书签列表
        imgList?: any; // 网站图标列表
        refreshKey?: boolean;
        refreshTagKey?: boolean;
        type: 'all' | 'normal' | 'search';
        bookmarkSearch?: any;
        screenWidth: number;
        screenHeight: number;
        isFold?: boolean; // 手机模式下菜单的折叠状态
        theme: 'day' | 'night' | 'system' | string; // 主题
        isShowLogin: boolean; // 是否弹出登录页面
        viewerKey: string;
        bookmarkLoading: boolean;
        viewer: {
          container: Viewer;
          src: string;
          options: Viewer.Options;
        };
        browserId: string; // 浏览器指纹
      }
    >{
      tagData: {
        relatedTagList: [], // 当前选中标签详情
      },
      tagList: [], // 标签列表
      bookmarkList: [], // 书签列表
      imgList: [],
      refreshKey: false,
      refreshTagKey: false,
      type: 'all',
      bookmarkSearch: '',
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      isFold: true,
      theme: 'day',
      isShowLogin: false,
      viewerKey: '',
      bookmarkLoading: false,
      viewer: {
        src: '',
        options: {},
      },
      browserId: '',
    },
  getters: {
    isMobile() {
      return this.screenWidth <= 1000;
    },
    iconColor() {
      return this.theme === 'day' ? 'black' : 'white';
    },
    currentTheme() {
      return this.theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'night'
          : 'day'
        : this.theme;
    },
  },
  actions: {
    refreshData() {
      this.refreshKey = !this.refreshKey;
    },
    refreshTag() {
      this.refreshTagKey = !this.refreshTagKey;
    },
    refreshViewer(src: string, options?: Viewer.Options) {
      console.log(src);
      this.viewer.src = src;
      this.viewer.options = options;
      this.viewerKey = (Math.random() * 9000000).toString();
    },
    reset() {
      this.tagData = {
        relatedTagList: [],
      };
      this.tagList = [];
      this.bookmarkList = [];
      this.refreshKey = false;
      this.refreshTagKey = false;
      this.type = 'all';
      this.bookmarkSearch = '';
      this.isShowLogin = false;
    },
  },
});

export const cloudSpaceStore = defineStore('dom', {
  state: () =>
    <
      {
        usedSpace: number;
        maxSpace: number;
        folderList: { name: string; id?: string; isRename?: boolean }[];
        fileList: { id: string; fileName: string; fileSize: number; uploadTime: string; folderName: string }[];
        typeCheckValue: any[];
        folder?: { id: string; name: string };
        searchFileName: string;
        loading: boolean;
        cacheImgArr: any[];// 记录需要清空缓存的图片，因为图片直接覆盖后地址不变，需要手动记录一下方便浏览器清空老图片缓存
      }
    >{
      usedSpace: 0,
      maxSpace: 500,
      folderList: [],
      fileList: [],
      typeCheckValue: ['image', 'pdf', 'word', 'audio', 'video', 'other'],
      folder: {
        name: '全部文件',
        id: 'all',
      },
      searchFileName: '',
      loading: false,
      cacheImgArr: [],
    },
  getters: {},
  actions: {
    queryFieldList() {
      this.loading = true;
      apiQueryPost('/api/file/queryFiles', {
        filters: {
          fileName: this.searchFileName,
          type: this.typeCheckValue,
          folderId: this.folder?.id ?? 'all',
        },
      })
        .then((res) => {
          this.fileList = res.data;
        })
        .finally(() => {
          this.loading = false;
          this.getUsedSpace();
        });
    },
    getUsedSpace() {
      apiBasePost('/api/file/queryTotalFileSize').then((res) => {
        if (res.status === 200) {
          this.usedSpace = res.data.totalSizeMB;
        }
      });
    },
    queryFolder() {
      apiQueryPost('/api/file/queryFolder').then((res) => {
        if (res.status === 200) {
          this.folderList = res.data.items;
        }
      });
    },
  },
});

export const noteStore = defineStore('note', {
  state: () =>
    <
      {
        headings?: { element: Element; text: string; level: number }[];
      }
    >{
      headings: [],
    },
  getters: {},
  actions: {
    generateTOC() {
      nextTick(() => {
        const container = document.getElementById('editor-container');
        if (!container) return;
        const hTags = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        this.headings = Array.from(hTags)
          .filter((heading: any) => heading.innerText.trim() !== '' || heading.textContent.trim() !== '')
          .map((heading: any, index) => {
            const level = parseInt((heading.tagName as string).replace('H', ''), 10);
            return { element: heading, text: heading.innerText || heading.textContent || '', level };
          });
      });
    },
  },
});

interface FormEditData {
  labelCol?: number;
  wrapperCol?: number;
  modalId?: string;
  visible?: boolean;
  formData?: any;
  confirmLoading?: boolean;
  title?: string;
  initData?: any;
  formState?: any;
  layout?: 'horizontal' | 'vertical' | 'inline';
  formRules?: any;
  footer?: string | null;
  validate?: () => Promise<{ [key: string]: any }> | undefined;

  onsubmit?(): void;

  beforePost?(data: any): any;
}

export type ModalOption = FormEditData & {
  onMounted?: () => void;
  onCancel?: () => void;
  width?: string | number;
  prop?: any;
  center?: boolean;
  fields: any[];
  originalForm: FormInstance;
};
export const getFormStoreById = function (id: string) {
  const useStore = defineStore(id, {
    state: () => <ModalOption>{},
    actions: {
      updateFormData(data: any) {
        Object.assign(
          this.fields.reduce((pre, v) => {
            pre[v.name] = undefined;
            return pre;
          }, this.formData),
          data,
        );
      },
    },
  });
  return useStore();
};

export const setFormStoreById = function (id: string, data: ModalOption) {
  let store = getFormStoreById(id);
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      store[key as keyof any] = data[key as keyof any];
    }
  }
  return store;
};

export const tourStore = defineStore('dom', {
  state: () =>
    <
      {
        steps?: TourProps['steps'];
        open: boolean; // 是否显示
        current: number; // 当前步骤
        close: any; // 自定义关闭
        finish: any; // 自定义
      }
    >{
      steps: [],
      open: false,
      current: 0,
      close: () => {
        tourStore().open = false;
      },
      finish: () => {
        tourStore().open = false;
      },
    },
  actions: {
    // 跨页面时需要重新赋值一次配置才能获取到页面的dom
    resetSteps() {
      const steps = cloneDeep(this.steps);
      this.steps = [];
      nextTick(() => {
        this.steps = steps;
      }).then();
    },
  },
});
