import { IDomEditor, DomEditor, SlateEditor } from '@wangeditor/editor';
import { Transforms } from 'slate';
import icon from '@/config/icon.ts';
import type { IButtonMenu } from 'node_modules/.pnpm/@wangeditor+core@1.1.19_@uppy+core@2.3.4_@uppy+xhr-upload@2.1.3_dom7@3.0.0_is-hotkey@0.2.0_lo_lf5i4i5pzogr67jshptmitu5fq/node_modules/@wangeditor/core/dist/core/src/menus/interface.d.ts';
export const selectAllBtn = {
  key: 'selectAll',
  factory() {
    return new (class wangEditorTableSelectAllHoverMenu implements IButtonMenu {
      readonly tag: string;
      readonly title: string;
      readonly iconSvg: string;
      constructor() {
        this.title = '全选'; // 自定义菜单标题
        this.iconSvg =
          '<svg t="1715422038657" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1472" width="200" height="200"><path d="M736 96h192v192h-192v-192zM416 736h192v192h-192v-192zM608 96h-192v192h192v-192zM96 736h192v192h-192v-192zM288 96h-192v192h192v-192zM736 736h192v192h-192v-192zM288 416h-192v192h192v-192zM608 416h-192v192h192v-192zM736 416h192v192h-192v-192z" fill="#000000" p-id="1473"></path></svg>';
        this.tag = 'button';
      }

      // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
      getValue(editor: IDomEditor): string | boolean {
        return 'selectAll';
      }

      // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
      isActive(editor: IDomEditor): boolean {
        return false;
      }

      // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
      isDisabled(editor: IDomEditor): boolean {
        return false;
      }

      // 点击菜单时触发的函数
      exec(editor: IDomEditor, value: string | boolean) {
        if (this.isDisabled(editor)) return;

        // 代码参考
        const [cellEntry] = SlateEditor.nodes(editor, {
          match: (n) => DomEditor.checkNodeType(n, 'table-cell'),
          universal: true,
        });
        const [selectedCellNode, selectedCellPath] = cellEntry;

        const rowNode = DomEditor.getParentNode(editor, selectedCellNode);
        if (rowNode == null) return;
        const tableNode = DomEditor.getParentNode(editor, rowNode);
        if (tableNode == null) return;

        const selectedTablePath = DomEditor.findPath(editor, tableNode);
        editor.select(selectedTablePath);
      }
    })();
  },
};

export const insertRowAboveBtn = {
  key: 'insertRowAbove',
  factory() {
    return new (class WangEditorInsertRowAboveMenu implements IButtonMenu {
      readonly tag: string;
      readonly title: string;
      readonly iconSvg: string;
      constructor() {
        this.title = '在上方插入行';
        this.iconSvg = icon.noteDetail.table_insert_top;
        this.tag = 'button';
      }

      getValue(editor: IDomEditor): string | boolean {
        return 'insertRowAbove';
      }

      isActive(editor: IDomEditor): boolean {
        return false;
      }

      isDisabled(editor: IDomEditor): boolean {
        // 当不在表格内时禁用按钮
        const [cellEntry] = SlateEditor.nodes(editor, {
          match: (n) => DomEditor.checkNodeType(n, 'table-cell'),
          universal: true,
        });
        return !cellEntry;
      }

      exec(editor: IDomEditor) {
        if (this.isDisabled(editor)) return;

        // 1. 获取当前选中的单元格
        const [cellEntry] = SlateEditor.nodes(editor, {
          match: (n) => DomEditor.checkNodeType(n, 'table-cell'),
          universal: true,
        });
        const [selectedCellNode, selectedCellPath] = cellEntry;

        // 2. 获取当前行和行路径
        const rowNode = DomEditor.getParentNode(editor, selectedCellNode);
        if (!rowNode) return;
        const rowPath = DomEditor.findPath(editor, rowNode);

        // 3. 获取表格节点
        const tableNode = DomEditor.getParentNode(editor, rowNode);
        if (!tableNode) return;
        const tablePath = DomEditor.findPath(editor, tableNode);

        // 4. 找出当前选中单元格是第几列（根据 path 的最后一个索引）
        const colIndex = selectedCellPath[selectedCellPath.length - 1];

        // 5. 创建新行（复制当前行的结构）
        const newRow = {
          type: 'table-row',
          children: rowNode.children.map((cell: any) => ({
            type: 'table-cell',
            children: [{ text: '' }], // 创建空单元格
          })),
        };

        // 6. 在当前行上方插入新行
        SlateEditor.withoutNormalizing(editor, () => {
          // 在行路径位置插入新行
          Transforms.insertNodes(editor, newRow, {
            at: rowPath,
          });

          // 7. 移动光标到新行的与当前单元格同列的位置
          const newRowPath = [...rowPath]; // 新插入行的路径
          const newCellPath = [...newRowPath, colIndex, 0]; // 新插入行中对应列的文本节点路径

          const range = {
            anchor: { path: newCellPath, offset: 0 },
            focus: { path: newCellPath, offset: 0 },
          };

          // 使用 Transforms.select 设置光标位置
          Transforms.select(editor as any, range);
        });
      }
    })();
  },
};

export const insertRowBelowBtn = {
  key: 'insertRowBelow',
  factory() {
    return new (class WangEditorInsertRowBelowMenu implements IButtonMenu {
      readonly tag: string;
      readonly title: string;
      readonly iconSvg: string;
      constructor() {
        this.title = '在下方插入行'; // 修改标题
        this.iconSvg = icon.noteDetail.table_insert_bottom; // 可更换为下方插入行的图标
        this.tag = 'button';
      }

      getValue(editor: IDomEditor): string | boolean {
        return 'insertRowBelow'; // 修改返回值
      }

      isActive(editor: IDomEditor): boolean {
        return false;
      }

      isDisabled(editor: IDomEditor): boolean {
        // 当不在表格内时禁用按钮
        const [cellEntry] = SlateEditor.nodes(editor, {
          match: (n) => DomEditor.checkNodeType(n, 'table-cell'),
          universal: true,
        });
        return !cellEntry;
      }

      exec(editor: IDomEditor) {
        if (this.isDisabled(editor)) return;

        // 1. 获取当前选中的单元格
        const [cellEntry] = SlateEditor.nodes(editor, {
          match: (n) => DomEditor.checkNodeType(n, 'table-cell'),
          universal: true,
        });
        const [selectedCellNode, selectedCellPath] = cellEntry;

        // 2. 获取当前行和行路径
        const rowNode = DomEditor.getParentNode(editor, selectedCellNode);
        if (!rowNode) return;
        const rowPath = DomEditor.findPath(editor, rowNode);

        // 3. 获取表格节点
        const tableNode = DomEditor.getParentNode(editor, rowNode);
        if (!tableNode) return;
        const tablePath = DomEditor.findPath(editor, tableNode);

        // 4. 找出当前选中单元格是第几列（根据 path 的最后一个索引）
        const colIndex = selectedCellPath[selectedCellPath.length - 1];

        // 5. 创建新行（复制当前行的结构）
        const newRow = {
          type: 'table-row',
          children: rowNode.children.map((cell: any) => ({
            type: 'table-cell',
            children: [{ text: '' }], // 创建空单元格
          })),
        };

        // 6. 在当前行下方插入新行（关键修改）
        SlateEditor.withoutNormalizing(editor, () => {
          // 计算插入位置：当前行的下一行
          const insertPath = [...rowPath];
          insertPath[insertPath.length - 1] += 1;

          // 在计算出的位置插入新行
          Transforms.insertNodes(editor, newRow, {
            at: insertPath,
          });

          // 7. 移动光标到新行的与当前单元格同列的位置
          const newRowPath = insertPath; // 新插入行的路径
          const newCellPath = [...newRowPath, colIndex, 0]; // 新插入行中对应列的文本节点路径

          const range = {
            anchor: { path: newCellPath, offset: 0 },
            focus: { path: newCellPath, offset: 0 },
          };

          // 使用 Transforms.select 设置光标位置
          Transforms.select(editor as any, range);
        });
      }
    })();
  },
};

export const insertColumnLeftBtn = {
  key: 'insertColumnLeft',
  factory() {
    return new (class WangEditorInsertColumnLeftMenu implements IButtonMenu {
      readonly tag: string;
      readonly title: string;
      readonly iconSvg: string;
      constructor() {
        this.title = '在左侧插入列';
        this.iconSvg = icon.noteDetail.table_insert_left; // 替换为你自己的图标
        this.tag = 'button';
      }

      getValue(editor: IDomEditor): string | boolean {
        return 'insertColumnLeft';
      }

      isActive(editor: IDomEditor): boolean {
        return false;
      }

      isDisabled(editor: IDomEditor): boolean {
        // 当不在表格内时禁用按钮
        const [cellEntry] = SlateEditor.nodes(editor, {
          match: (n) => DomEditor.checkNodeType(n, 'table-cell'),
          universal: true,
        });
        return !cellEntry;
      }

      exec(editor: IDomEditor) {
        if (this.isDisabled(editor)) return;

        // 1. 获取当前选中的单元格
        const [cellEntry] = SlateEditor.nodes(editor, {
          match: (n) => DomEditor.checkNodeType(n, 'table-cell'),
          universal: true,
        });
        const [selectedCellNode, selectedCellPath] = cellEntry;

        // 2. 获取当前行和行路径
        const rowNode = DomEditor.getParentNode(editor, selectedCellNode);
        if (!rowNode) return;
        const rowPath = DomEditor.findPath(editor, rowNode);

        // 3. 获取表格节点
        const tableNode = DomEditor.getParentNode(editor, rowNode);
        if (!tableNode) return;
        const tablePath = DomEditor.findPath(editor, tableNode);

        // 4. 找出当前选中单元格是第几列（根据 path 的最后一个索引）
        const colIndex = selectedCellPath[selectedCellPath.length - 1];

        // 5. 遍历表格中的每一行，在指定列位置插入新单元格
        SlateEditor.withoutNormalizing(editor, () => {
          for (let i = 0; i < tableNode.children.length; i++) {
            const currentRow = tableNode.children[i];
            const currentRowPath = [...tablePath, i];

            // 创建新的单元格
            const newCell = {
              type: 'table-cell',
              children: [{ text: '' }],
            };

            // 在当前列位置插入新单元格
            Transforms.insertNodes(editor, newCell, {
              at: [...currentRowPath, colIndex],
            });
          }

          // 6. 移动光标到当前行、新列的第一个单元格内部
          // 确保使用的是原始选中的单元格所在行的路径
          const newRowPath = [...rowPath]; // 使用原始选中的单元格所在的行路径
          const newCellPath = [...newRowPath, colIndex]; // 新插入的单元格路径
          const newTextNodePath = [...newCellPath, 0]; // 文本节点路径

          const range = {
            anchor: { path: newTextNodePath, offset: 0 },
            focus: { path: newTextNodePath, offset: 0 },
          };

          // 使用 Transforms.select 设置光标位置
          Transforms.select(editor as any, range);
        });
      }
    })();
  },
};

export const insertColumnRightBtn = {
  key: 'insertColumnRight',
  factory() {
    return new (class WangEditorInsertColumnRightMenu implements IButtonMenu {
      readonly tag: string;
      readonly title: string;
      readonly iconSvg: string;
      constructor() {
        this.title = '在右侧插入列';
        this.iconSvg = icon.noteDetail.table_insert_right; // 替换为你自己的图标
        this.tag = 'button';
      }

      getValue(editor: IDomEditor): string | boolean {
        return 'insertColumnRight';
      }

      isActive(editor: IDomEditor): boolean {
        return false;
      }

      isDisabled(editor: IDomEditor): boolean {
        // 当不在表格内时禁用按钮
        const [cellEntry] = SlateEditor.nodes(editor, {
          match: (n) => DomEditor.checkNodeType(n, 'table-cell'),
          universal: true,
        });
        return !cellEntry;
      }

      exec(editor: IDomEditor) {
        if (this.isDisabled(editor)) return;

        // 1. 获取当前选中的单元格
        const [cellEntry] = SlateEditor.nodes(editor, {
          match: (n) => DomEditor.checkNodeType(n, 'table-cell'),
          universal: true,
        });
        const [selectedCellNode, selectedCellPath] = cellEntry;

        // 2. 获取当前行和行路径
        const rowNode = DomEditor.getParentNode(editor, selectedCellNode);
        if (!rowNode) return;
        const rowPath = DomEditor.findPath(editor, rowNode);

        // 3. 获取表格节点
        const tableNode = DomEditor.getParentNode(editor, rowNode);
        if (!tableNode) return;
        const tablePath = DomEditor.findPath(editor, tableNode);

        // 4. 找出当前选中单元格是第几列（根据 path 的最后一个索引）
        const colIndex = selectedCellPath[selectedCellPath.length - 1];

        // 5. 遍历表格中的每一行，在当前列的右侧插入新单元格
        SlateEditor.withoutNormalizing(editor, () => {
          for (let i = 0; i < tableNode.children.length; i++) {
            const currentRow = tableNode.children[i];
            const currentRowPath = [...tablePath, i];

            // 创建新的单元格
            const newCell = {
              type: 'table-cell',
              children: [{ text: '' }],
            };

            // 在当前列右侧插入新单元格
            Transforms.insertNodes(editor, newCell, {
              at: [...currentRowPath, colIndex + 1],
            });
          }

          // 6. 移动光标到当前行、新列的第一个单元格内部
          // 确保使用的是原始选中的单元格所在行的路径
          const newRowPath = [...rowPath]; // 使用原始选中的单元格所在的行路径
          const newCellPath = [...newRowPath, colIndex + 1]; // 新插入的单元格路径
          const newTextNodePath = [...newCellPath, 0]; // 文本节点路径

          const range = {
            anchor: { path: newTextNodePath, offset: 0 },
            focus: { path: newTextNodePath, offset: 0 },
          };

          // 使用 Transforms.select 设置光标位置
          Transforms.select(editor as any, range);
        });
      }
    })();
  },
};
