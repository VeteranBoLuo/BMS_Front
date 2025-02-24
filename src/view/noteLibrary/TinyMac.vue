<template>
  <div style="overflow: auto">
    <editor v-model="myValue" :init="init" :id="tinymceId"></editor>
  </div>
</template>

<script setup>
  import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'; //全屏
  import tinymce from 'tinymce/tinymce';
  import Editor from '@tinymce/tinymce-vue';
  import 'tinymce/icons/default/icons';
  import 'tinymce/models/dom'; // 一定要引入
  import 'tinymce/themes/silver'; // 界面UI主题
  import 'tinymce/plugins/image';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/lists'; // 列表插件
  import 'tinymce/plugins/preview'; // 预览
  import 'tinymce/plugins/emoticons'; // emoji表情
  import 'tinymce/plugins/emoticons/js/emojis.js'; //必须引入这个文件才有表情图库
  import 'tinymce/plugins/code'; // 编辑源码
  import 'tinymce/plugins/link'; // 链接插件
  import 'tinymce/plugins/advlist'; //高级列表
  import 'tinymce/plugins/codesample'; //代码示例
  import 'tinymce/plugins/autoresize'; // 自动调整编辑器大小
  import 'tinymce/plugins/quickbars'; // 光标处快捷提示
  import 'tinymce/plugins/nonbreaking'; //插入不间断空格
  import 'tinymce/plugins/searchreplace'; //查找替换
  import 'tinymce/plugins/autolink'; //自动链接
  import 'tinymce/plugins/visualblocks'; //显示元素范围
  import 'tinymce/plugins/visualchars'; //显示不可见字符
  import 'tinymce/plugins/charmap'; // 特殊符号
  import 'tinymce/plugins/insertdatetime'; //插入日期时间
  import 'tinymce/plugins/importcss'; //引入自定义样式的css文件
  import 'tinymce/plugins/fullscreen';
  import { apiBasePost } from '@/http/request';
  import { bookmarkStore, noteStore, useUserStore } from '@/store';

  const emits = defineEmits(['update:modelValue', 'setHtml', 'setNoteId', 'saveData']);
  //这里我选择将数据定义在props里面，方便在不同的页面也可以配置出不同的编辑器，当然也可以直接在组件中直接定义
  const props = defineProps({
    value: {
      type: String,
      default: () => {
        return '';
      },
    },
    // 编辑器初始可编辑状态
    editable_root: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    noteId: {
      type: String,
      default: '',
    },
  });
  const loading = ref(false);
  const tinymceId = ref('vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''));
  const note = noteStore();
  const user = useUserStore();
  const contentStyle = computed(() => {
    if (bookmark.theme === 'day') {
      return `body {font-family:Helvetica,Arial,sans-serif; font-size:16px;}
      p {line-height:1rem}
      body::-webkit-scrollbar {
        display: none;
      }
  }
      `;
    }
    return `body {font-family:Helvetica,Arial,sans-serif; font-size:16px;background-color:#222222; color:white;}
      p {line-height:1rem}
      body::-webkit-scrollbar {
        display: none;
      }
     .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
    color: #666666 !important;}
    .mce-content-body *[contentEditable=false]{
    background-color: #1e1f22 !important;
    text-shadow:unset;
    color:white;
    }
  .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string{
  color:unset;
  background-color: unset !important;
  }
    `;
  });
  const toolBar = computed(() => {
    if (props.readonly) {
      return false;
    } else {
      return String(
        'undo redo| forecolor backcolor removeformat | blocks fontfamily fontsize| bold italic underline strikethrough  align numlist bullist |  lineheight   outdent indent| link image table  | codesample emoticons',
      );
    }
  });

  const handleImageUpload = (blobInfo, progress) => {
    return new Promise((resolve, reject) => {
      let file = blobInfo.blob();
      if (file.size / 1024 / 1024 > 200) {
        reject({
          message: '上传失败，图片大小请控制在 200M 以内',
          remove: true,
        });
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('noteId', props.noteId);
      apiBasePost('/api/note/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          progress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        },
      })
        .then((res) => {
          if (res.data.noteId) {
            emits('setNoteId', res.data.noteId);
          }
          resolve(res.data.url);
        })
        .catch();
    });
  };
  const initConfig = {
    language_url: '/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/tinymce/skins/ui/oxide',
    branding: false,
    height: 'calc(100% - 20px)',
    promotion: false,
    menubar: '',
    paste_data_images: true,
    image_dimensions: false,
    link_default_target: '_blank',
    link_context_toolbar: true,
    contextmenu: 'bold copy paste remove',
    placeholder: '输入内容',
    quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
    editimage_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    font_family_formats:
      'Arial=arial,helvetica,sans-serif; 宋体=SimSun; 微软雅黑=Microsoft Yahei; Impact=impact,chicago;',
    font_size_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px',
    image_caption: true,
    editimage_cors_hosts: ['picsum.photos'],
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'wrap',
    content_style: contentStyle,
    image_advtab: true,
    importcss_append: true,
    paste_webkit_styles: 'all',
    paste_merge_formats: true,
    nonbreaking_force_tab: false,
    paste_auto_cleanup_on_paste: false,
    quickbars_insert_toolbar: '', // 禁用换行菜单
    file_picker_types: 'file',
    quickbars_selection_toolbar:
      'forecolor backcolor removeformat | bold italic underline strikethrough | quicklink  blockquote codesample',
    content_css: '/tinymce/skins/content/default/content.css',
  };

  //定义一个对象 init初始化
  const init = reactive({
    ...initConfig,
    selector: '#' + tinymceId.value,
    editable_root: props.editable_root,
    readonly: props.readonly,
    plugins:
      'importcss quickbars searchreplace autolink  code visualblocks visualchars fullscreen image link codesample table charmap nonbreaking  insertdatetime advlist lists charmap emoticons',
    toolbar: toolBar.value,
    setup: function (editor) {
      editor.on('init', function () {
        // 停用缓存才会生效
        note.generateTOC();
      });
      // 添加自定义快捷键
      editor.addShortcut('meta+s', 'Save shortcut', function () {
        emits('saveData');
      });
    },
    //图片上传  -实列 具体请根据官网补充-
    images_upload_handler: handleImageUpload,
  });

  // 外部传递进来的数据变化
  const myValue = computed({
    get() {
      return props.value;
    },
    set(val) {
      emits('update:value', val);
    },
  });

  // 设置编辑器只读模式
  watch(
    () => props.readonly,
    (newValue, oldValue) => {
      nextTick(() => {
        tinymce.activeEditor.mode.set(newValue ? 'readonly' : 'design');
        let iframeDom = document.querySelector('iframe');
        iframeDom && (iframeDom.contentWindow.document.body.style.margin = newValue ? 0 : '16px');
      });
    },
    { immediate: true },
  );
  const bookmark = bookmarkStore();

  function setFirefoxScroll() {
    setTimeout(() => {
      try {
        const iframe = document.getElementsByClassName('tox-edit-area__iframe')[0];
        const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;
        const style = iframeDocument.createElement('style');
        style.innerHTML = `
            * {
            scrollbar-width: none;
          }`;
        iframeDocument.head.appendChild(style);
      } catch (e) {
        setFirefoxScroll();
      }
    }, 500);
  }

  //初始化编辑器
  onMounted(() => {
    const isFirefox = typeof window?.InstallTrigger !== 'undefined';
    if (isFirefox) {
      setFirefoxScroll();
    }
  });
</script>

<style lang="less" scoped>
  :deep(.tox-tinymce) {
    border: none;
    border-radius: 0;

    .tox-statusbar {
      display: none;
    }

    .tox-edit-area::before {
      border: none !important;
    }

    .tox-toolbar {
      background-color: var(--tox-toolbar-bg);
    }

    .tox-editor-header {
      background-color: var(--tox-toolbar-bg) !important;
      border: 1px solid var(--tox-toolbar-header-border-color) !important;
      border-radius: 6px;
    }

    .tox-toolbar__group {
      gap: var(--tox-toolbar__group-gap) !important;
    }
  }
</style>
