import { getScrollOffset } from './tools'
export function getPopoverPosition (popover, content, direction, CONTANT) {
  let result = { show: true }
  getOptions(result, popover, content, direction,CONTANT)
  let { left, top } = getScrollOffset()
  result.left += left
  result.top += top
  return result
}
// 循环省性能
const list = [
  'top-end',
  'left-end',
  'top-start',
  'right-end',
  'top-middle',
  'bottom-end',
  'left-start',
  'right-start',
  'left-middle',
  'right-middle',
  'bottom-start',
  'bottom-middle'
]
// 只要获取一次就行
function getOptions(result, popover, content, direction,CONTANT = 10) {
  let myList = list.concat()
  let client = popover.getBoundingClientRect()
  myList.splice(list.indexOf(direction), 1)
  getDirection(result, {
    myList,
    direction,
    CONTANT,
    top: client.top,
    left: client.left,
    popoverWidth: popover.offsetWidth,
    contentWidth: content.offsetWidth,
    popoverHeight: popover.offsetHeight,
    contentHeight: content.offsetHeight
  })
}

/**
 * 获取
 * @param {*} result 
 * @param {*} options 
 */
function getDirection(result, options) {
  let {
    top,
    left,
    CONTANT,
    direction,
    contentWidth,
    popoverWidth,
    contentHeight,
    popoverHeight
  } = options
  result.options = options
  let main = direction.split('-')[0]
  let around = direction.split('-')[1]
  if (main === 'top' || main === 'bottom') {
    if (around === 'start') {
      result.left = left
    } else if (around === 'end') {
      result.left = left + popoverWidth - contentWidth
    } else if (around === 'middle') {
      result.left = left + popoverWidth / 2 - contentWidth / 2
    }
    if (main === 'top') {
      result.top = top - contentHeight - CONTANT
    } else {
      result.top = top + popoverHeight + CONTANT
    }
  } else if (main === 'left' || main === 'right') {
    if (around === 'start') {
      result.top = top
    } else if (around === 'end') {
      result.top = top + popoverHeight - contentHeight
    } else if (around === 'middle') {
      result.top = top + popoverHeight / 2 - contentHeight / 2;
    }
    if (main === 'left') {
      result.left = left - contentWidth - CONTANT
    } else {
      result.left = left + popoverWidth + CONTANT
    }
  }
  testDirection(result, options)
}

function testDirection(result, options) {
  let { left, top } = result
  let width = document.documentElement.clientWidth
  let height = document.documentElement.clientHeight
  if (top < 0 || left < 0 || top + options.contentHeight > height || left + options.contentWidth > width) {
    // 还有可以循环的
    if (options.myList.length) {
      options.direction = options.myList.shift()
      getDirection(result, options)
    } else {
      // 实在不行就在父级身上
      result.left = options.left
      result.right = options.right
    }
  } else {
    result.show = true
  }
}
