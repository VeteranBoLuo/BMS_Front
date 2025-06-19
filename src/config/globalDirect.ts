import { apiBasePost } from '@/http/request';

export default function (app) {
  app.directive('drag', (el, binding) => {
    /*
     * 如果绑定了一个值，则将target设置为这个值，否则设置为el本身（即被拖拽的元素）,传值主要用于只能按住元素上某个图标这种来拖动整个
     * 元素的场景，此时需要把v-drag写在图标上，但是需要被拖动的元素需要传值给v-drag="拖动的元素"
     * */
    const target = binding.value ? binding.value : el;

    // 要实现拖动改变位置还需设置元素为绝对定位
    target.style.position = 'fixed';

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
        let l = e.clientX - disX;
        let t = e.clientY - disY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const elementWidth = target.offsetWidth;
        const elementHeight = target.offsetHeight;

        const maxLeft = screenWidth - elementWidth;
        const maxTop = screenHeight - elementHeight;

        // 使用Math.max和Math.min方法来确保元素不会被拖出屏幕
        l = Math.max(0, Math.min(l, maxLeft));
        t = Math.max(0, Math.min(t, maxTop));

        if (l > 5 || t > 5) {
          // 判断移动的距离是否超过5像素，避免过于微小的移动
          target.style.left = l + 'px';
          target.style.top = t + 'px';
        }
      };

      // 为document添加鼠标释放事件监听，用于结束拖拽
      document.onmouseup = () => {
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
    let isMouseDown = false;
    el.onmousedown = () => {
      isMouseDown = true;
    };
    el.onmouseup = () => {
      if (isMouseDown) {
          console.log(binding)
        // apiBasePost('/api/common/recordOperationLogs', binding.value).then(() => {});
      }
      isMouseDown = false;
    };
    // 如果鼠标按下后移出元素再释放，也需要重置状态
    el.onmouseleave = () => {
      isMouseDown = false;
    };
  });
}
