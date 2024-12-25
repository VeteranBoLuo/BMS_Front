// noinspection JSUnusedGlobalSymbols

export const copyTextToClipboard = function (text) {
  // 检查浏览器是否支持Clipboard API
  if (navigator.clipboard) {
    try {
      // 使用navigator.clipboard.writeText()来复制文本
      navigator.clipboard.writeText(text).then(() => {});
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

// 获取浏览器类型
export function getBrowserType() {
  let browserType = null;
  try {
    let ua = navigator.userAgent.toLocaleLowerCase();
    function _mime(option, value) {
      const mimeTypes = navigator.mimeTypes;
      for (let mt in mimeTypes) {
        if (mimeTypes[mt][option] == value) {
          return true;
        }
      }
      return false;
    }
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
      browserType = 'IE';
    } else if (ua.match(/firefox/) != null) {
      browserType = 'firefox';
    } else if (ua.match(/ucbrowser/) != null) {
      browserType = 'UC';
    } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
      browserType = 'opera';
    } else if (ua.match(/bidubrowser/) != null) {
      browserType = 'baidu';
    } else if (ua.match(/metasr/) != null) {
      browserType = 'sougou';
    } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
      browserType = 'QQ';
    } else if (ua.match(/maxthon/) != null) {
      browserType = 'maxthon';
    } else if (ua.match(/chrome/) != null) {
      const is360 = _mime('type', 'application/vnd.chromium.remoting-viewer');
      if (is360) {
        browserType = '360';
      } else {
        browserType = 'chrome';
      }
    } else if (ua.match(/safari/) != null) {
      browserType = 'Safari';
    } else {
      browserType = 'others';
    }
  } catch (e) {}
  return browserType;
}

export function getUserOsInfo() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Windows NT 10.0') !== -1) return 'Windows 10';
  if (userAgent.indexOf('Windows NT 6.2') !== -1) return 'Windows 8';
  if (userAgent.indexOf('Windows NT 6.1') !== -1) return 'Windows 7';
  if (userAgent.indexOf('Windows NT 6.0') !== -1) return 'Windows Vista';
  if (userAgent.indexOf('Windows NT 5.1') !== -1) return 'Windows XP';
  if (userAgent.indexOf('Windows NT 5.0') !== -1) return 'Windows 2000';
  if (userAgent.indexOf('Mac') !== -1) return 'Mac/iOS';
  if (userAgent.indexOf('X11') !== -1) return 'UNIX';
  if (userAgent.indexOf('Linux') !== -1) return 'Linux';
  return 'Other';
}
