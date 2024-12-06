// 实现使用函数调用message组件的逻辑
//   引入 创建虚拟节点 和渲染方法
import { createVNode, render } from 'vue';
// 引入信息提示组件
import message from './Message.vue';

// 准备dom容器
const div = document.createElement('div');
// 添加类名
div.setAttribute('class', 'message-container');
// 添加到body上
document.body.appendChild(div);

// 定时器标识
let timer = null;

function sendInfo(type, text) {
  const divs: any = document.getElementsByClassName('message');
  if (divs.length > 0) {
    clearTimeout(timer);
    render(null, div);
  }
  // 创建虚拟节点   第一个参数为要创建的虚拟节点  第二个参数为props的参数
  const vNode = createVNode(message, { type, text });
  // 把虚拟节点渲染DOM容器中
  render(vNode, div);
  // 开启定时器，移出DOM容器内容
  clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, div);
  }, 3000);
}
export default {
  success(text) {
    sendInfo('success', text);
  },
  warn(text) {
    sendInfo('warn', text);
  },
  error(text) {
    sendInfo('error', text);
  },
};
