// 定义一个基础操作类型
type Operation = {
  module: string;
  operation: string;
};
function createModule<T extends Record<string, string>>(module: string, operations: T): { [K in keyof T]: Operation } {
  const result = {} as { [K in keyof T]: Operation };

  for (const key in operations) {
    result[key] = {
      module,
      operation: operations[key],
    };
  }

  return result;
}
export const OPERATION_LOG_MAP = {
  navigation: createModule('导航栏', {
    home: '跳转首页',
    note: '跳转笔记',
  }),
  login: createModule('登录', {
    previewMobile: '移动端预览',
  }),
  register: createModule('注册', {
    register: '注册',
  }),
  bookmarkMg: createModule('书签管理', {
    toAddBtn: '添加书签',
    exportToExcel: '导出书签',
  }),
  bookmarkDetail: createModule('书签详情', {
    save: '保存书签',
  }),
  tagMg: createModule('标签管理', {
    addTag: '添加标签',
  }),
  tagDetail: createModule('标签详情', {
    saveTag: '保存标签',
  }),
  noteLibrary: createModule('笔记库', {
    addNote: '添加笔记',
    deleteNote: '删除笔记',
    filterNote: '筛选笔记',
    searchNote: '搜索笔记',
  }),
  note: createModule('笔记', {
    updateTag: '更新标签',
    exportPdf: '导出PDF',
    deleteNote: '删除笔记',
    saveNote: '保存笔记',
  }),
};
