// src/store/user.js
import { defineStore } from 'pinia';
import { FormInstance } from 'ant-design-vue';
import { TagInterface } from '@/config/bookmarkCfg';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    userName: '默认用户名',
    alias: '默认昵称',
    password: '',
    role: 'user',
    headPicture: '',
    email: '',
    tagTotal: 0,
    bookmarkTotal: 0,
  }),
  actions: {
    setUserInfo(val) {
      this.id = val.id ?? '';
      this.userName = val.userName ?? '默认用户名';
      this.alias = val.alias ?? '默认昵称';
      this.password = val.password ?? '';
      this.role = val.role ?? 'user';
      this.headPicture = val.headPicture ?? '';
      this.email = val.email ?? '';
      this.tagTotal = val.tagTotal ?? 0;
      this.bookmarkTotal = val.bookmarkTotal ?? 0;
    },
    resetUserInfo() {
      this.id = '';
      this.userName = '默认用户名';
      this.alias = '默认昵称';
      this.password = '';
      this.role = 'user';
      this.headPicture = '';
      this.email = '';
      this.tagTotal = 0;
      this.bookmarkTotal = 0;
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
        type?: 'all' | 'normal' | 'search';
        bookmarkSearch?: any;
        screenWidth: number;
        screenHeight: number;
        isFold?: boolean; // 手机模式下菜单的折叠状态
        theme: 'day' | 'night'; // 主题
      }
    >{
      tagData: {
        associatedTagList: [],
      }, // 当前选中标签详情
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
    },
  getters: {
    isPhone() {
      return this.screenWidth <= 600;
    },
    isPad() {
      return this.screenWidth > 600 && this.screenWidth <= 1400;
    },
    iconColor() {
      return this.theme === 'day' ? 'black' : 'white';
    },
  },
  actions: {
    refreshData() {
      this.refreshKey = !this.refreshKey;
    },
    refreshTag() {
      this.refreshTagKey = !this.refreshTagKey;
    },
    reset() {
      this.tagData = {
        associatedTagList: [],
      };
      this.tagList = [];
      this.bookmarkList = [];
      this.refreshKey = false;
      this.refreshTagKey = false;
      this.type = 'all';
      this.bookmarkSearch = '';
      this.theme = 'day';
    },
  },
});

export const domStore = defineStore('dom', {
  state: () =>
    <
      {
        domScroll?: boolean; // 主要用于判断元素设置scrollTop = 0时是否处于滚动状态，移动端设置scrollTop = 0时若处于滚动状态会导致白屏
      }
    >{
      domScroll: false,
    },
  getters: {},
  actions: {},
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
