export function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    // 这两个属性只有一个有用, 另一个肯定是0, 直接相加
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    };
  }
}

// 添加事件, 判断是不是服务器环境
export function on(element, event, handler) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}
// 移除事件
export function off(element, event, handler) {
  if (element && event) {
    element.removeEventListener(event, handler, false)
  }
}
