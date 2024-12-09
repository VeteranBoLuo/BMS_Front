import { apiBasePost, apiQueryPost } from '@/http/request';

export default function (app) {
  app.directive('drag', (el, binding) => {
    // 定义一个变量target来存储元素或者绑定的值
    let target: any = null;

    // 如果绑定了一个值，则将target设置为这个值，否则设置为el本身（即被拖拽的元素）
    target = binding.value ? binding.value : el;

    // 要实现拖动改变位置还需设置元素为绝对定位
    // target.style.position = 'absolute';

    // 为元素添加鼠标按下事件监听，用于开始拖拽
    el.onmousedown = (e) => {
      // 阻止选择文本，防止在拖拽过程中选中文字
      document.onselectstart = () => {
        return false;
      };

      // 计算鼠标与目标元素之间的水平方向和垂直方向的距离
      const disX = e.clientX - target.offsetLeft;
      const disY = e.clientY - target.offsetTop;

      // 为document添加鼠标移动事件监听
      document.onmousemove = (e) => {
        // 拖拽时要清空元素的外边距，否则位置会错乱
        target.style.margin = '0';
        // 计算移动后的位置，并设置元素的新位置
        const l = e.clientX - disX;
        const t = e.clientY - disY;
        if (l > 5 && t > 5) {
          // 判断移动的距离是否超过10像素，避免过于微小的移动
          target.style.left = l + 'px';
          target.style.top = t + 'px';
        }
      };

      // 为document添加鼠标释放事件监听，用于结束拖拽
      document.onmouseup = (e) => {
        // 停止监听鼠标移动和释放事件，以及恢复onselectstart的行为
        document.onmousemove = null;
        document.onmouseup = null;
        document.onselectstart = null;
      };

      // 阻止默认的鼠标按下事件行为
      // return false不加的话可能导致黏连，即拖拽结束后鼠标依然被绑定在元素上
      return false;
    };
  });

  app.directive('click-log', (el, binding) => {
    el.onmousedown = (e) => {
      apiBasePost('/api/common/recordOperationLogs', binding.value).then((r) => {});
    };
  });
}
