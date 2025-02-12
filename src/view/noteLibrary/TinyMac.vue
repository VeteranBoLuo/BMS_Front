<template>
  <div style="overflow: auto">
    <editor v-model="myValue" :init="init" :id="tinymceId"></editor>
  </div>
</template>

<script setup>
  import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'; //全屏
  import tinymce from 'tinymce/tinymce';
  // import "tinymce/skins/content/default/content.css";
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
  import 'tinymce/plugins/directionality'; //文字方向
  import 'tinymce/plugins/visualblocks'; //显示元素范围
  import 'tinymce/plugins/visualchars'; //显示不可见字符
  import 'tinymce/plugins/charmap'; // 特殊符号
  import 'tinymce/plugins/insertdatetime'; //插入日期时间
  import 'tinymce/plugins/importcss'; //引入自定义样式的css文件
  import 'tinymce/plugins/accordion'; // 可折叠数据手风琴模式
  import 'tinymce/plugins/anchor'; //锚点
  import 'tinymce/plugins/fullscreen';
  import { apiBasePost } from '@/http/request';
  import { bookmarkStore, noteStore } from '@/store';

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
  const contentStyle = computed(() => {
    if (bookmark.theme === 'day') {
      return `body {font-family:Helvetica,Arial,sans-serif; font-size:16px;}
    p {line-height:1rem}
    body::-webkit-scrollbar {
      display: none;
    }`;
    }
    return `body {font-family:Helvetica,Arial,sans-serif; font-size:16px;background-color:#222222; color:white;}
    p {line-height:1rem}
    body::-webkit-scrollbar {
      display: none;
    }`;
  });
  //定义一个对象 init初始化
  const init = reactive({
    selector: '#' + tinymceId.value, //富文本编辑器的id,
    language_url: '/tinymce/langs/zh_CN.js', // 语言包的路径，具体路径看自己的项目
    language: 'zh_CN',
    skin_url: '/tinymce/skins/ui/oxide', // skin路径，具体路径看自己的项目
    editable_root: props.editable_root,
    branding: false, // 是否禁用“Powered by TinyMCE”
    height: 'calc(100% - 20px)',
    promotion: false, //去掉 upgrade
    // toolbar_sticky: true,
    // toolbar_sticky_offset: 100,
    menubar: '', //'edit view insert format tools',
    paste_data_images: true, //允许粘贴图像
    image_dimensions: false, //去除宽高属性
    plugins:
      'importcss quickbars  searchreplace autolink directionality code visualblocks visualchars fullscreen image link codesample table charmap nonbreaking anchor insertdatetime advlist lists charmap  emoticons accordion',
    toolbar:
      'undo redo| forecolor backcolor removeformat | blocks fontfamily fontsize| bold italic underline strikethrough  align numlist bullist |  lineheight   outdent indent| link image table  | codesample emoticons ',
    // 取消图片资源路径转换
    convert_urls: false,
    // table边框位0是否展示网格线
    // visual: false,
    // 超链接默认打开方式
    link_default_target: '_blank',
    link_context_toolbar: true,
    contextmenu: 'bold copy paste remove',
    // 默认快捷菜单
    quickbars_insert_toolbar: false,
    placeholder: '输入内容',
    // 选中图片的快捷提示
    quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
    editimage_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    // 文字样式
    font_family_formats:
      'Arial=arial,helvetica,sans-serif; 宋体=SimSun; 微软雅黑=Microsoft Yahei; Impact=impact,chicago;', //字体
    font_size_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px', //文字大小
    image_caption: true,
    editimage_cors_hosts: ['picsum.photos'],
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'wrap', // 工具栏模式 floating / sliding / scrolling / wrap
    // 默认样式
    content_style: contentStyle,
    image_advtab: true,
    importcss_append: true,
    paste_webkit_styles: 'all',
    paste_merge_formats: true,
    nonbreaking_force_tab: false,
    paste_auto_cleanup_on_paste: false,
    file_picker_types: 'file',
    // 选中文字的快捷提示
    quickbars_selection_toolbar:
      'forecolor backcolor removeformat | bold italic underline strikethrough | quicklink  blockquote codesample',
    // 编辑器高度自适应
    content_css: '/tinymce/skins/content/default/content.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
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
    images_upload_handler: function (blobInfo, progress) {
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
    },
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

  // //监听富文本中的数据变化
  // watch(
  //     () => myValue.value,
  //     () => {
  //       emits(
  //           "setHtml",
  //           tinymce.activeEditor.getContent({format: "text"}),
  //           myValue.value
  //       );
  //     }
  // );

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

  //初始化编辑器
  onMounted(() => {
    setTimeout(() => {
      const iframe = document.getElementsByClassName('tox-edit-area__iframe')[0];
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      const style = iframeDocument.createElement('style');
      style.innerHTML = `
          * {
          scrollbar-width: none;
        }`;
      iframeDocument.head.appendChild(style);
    }, 500);
  });

  // 设置值
  const handleSetContent = (content) => {
    tinymce.activeEditor.setContent(content);
  };

  // 获取值
  const handleGetContent = () => {
    return tinymce.activeEditor.getContent();
  };

  defineExpose({
    handleSetContent,
    handleGetContent,
  });

  onUnmounted(() => {
    if (tinymce.get(tinymceId.value)) {
      tinymce.get(tinymceId.value).remove();
    }
  });
</script>

<style lang="less" scoped>
  :deep(.tox-tinymce) {
    border: none;
    border-radius: 0px;

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
