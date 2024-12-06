export const copyTextToClipboard = function (text) {
  // 检查浏览器是否支持Clipboard API
  if (navigator.clipboard) {
    try {
      // 使用navigator.clipboard.writeText()来复制文本
      navigator.clipboard.writeText(text).then((r) => {});
      // 复制文本成功，直接返回true
      return true;
    } catch (err) {
      // 复制文本失败，处理错误
      console.error('复制文本失败：', err);
      // 根据需要，你可以在这里执行其他错误处理逻辑
      return false;
    }
  } else {
    console.error('浏览器不支持Clipboard API');
    // 如果不支持Clipboard API，返回false或抛出错误
    return false;
  }
};

export interface resType {
  data: any;
  msg?: string;
  status: number;
}

export const allTheme = [
  { title: '简约', background: '#4e4b46', color: '#fff8e8' },
  { title: '经典', background: '#7666fa', color: 'white' },
  { title: '古朴', background: '#dd6050', color: 'white' },
];

//  防抖函数
export function debounce(func, time) {
  let timer: any;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
      clearTimeout(timer);
    }, time);
  };
}
export function throttle(func, time) {
  let timer = null;

  return function () {
    if (timer) {
      return;
    } else {
      func.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, time);
    }
  };
}
