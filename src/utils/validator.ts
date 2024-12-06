import { message as AntMessage } from 'ant-design-vue/es/components';

export interface endCondition {
  endCondition: any;
  message: string;
  type?: 'warning' | 'success' | 'error';
}

// 此函数用于遍历一个条件对象数组，只要数组中任意一个对象满足结束条件，就会显示相应的消息并退出函数。
export function checkEndCondition(objects: endCondition[]) {
  for (let obj of objects) {
    // 如果对象满足结束程序条件
    if (obj.endCondition) {
      const type = obj.type || 'warning';
      AntMessage[type](obj.message);
      // 返回true
      return true;
    }
  }
  return false;
}

// 判断对象是否有某个属性
export function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

// 判断入参是否为空
export function isEmpty(val) {
  if (val === '' || val === null || val === undefined) {
    return true;
  }
  if (typeof val === 'object' && !Object.keys(val).length) {
    return true;
  }
  if (Array.isArray(val) && !val.length) {
    return true;
  }
  return false;
}


