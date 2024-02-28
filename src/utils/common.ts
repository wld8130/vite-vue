/**
 * 对比两个内容是否全等
 * @param origin 旧数据
 * @param current 新数据
 * @returns true | false
 */
export const isEqual = (origin: any, current: any) => {
  if (origin === current) {
    return true;
  }
  return false;
};

/**
 * 检查图片是否有效
 * @param url 图片地址
 * @returns promise
 */
export const checkImageExists = (url: string) => {
  return new Promise((resolve, reject) => {
    const imgObj: HTMLImageElement = new Image();
    imgObj.src = url;
    imgObj.onload = res => {
      resolve(res);
    };
    imgObj.onerror = err => {
      reject(err);
    };
  });
};

/**
 * 判断类型为数字类型
 * @param value 数据
 * @returns boolean
 */
export const typeofNumber = (value: any) => {
  return typeof value === 'number';
};

/**
 * 判断类型为字符串类型
 * @param value 数据
 * @returns boolean
 */
export const typeofString = (value: any) => {
  return typeof value === 'string';
};

/**
 * 判断类型为布尔类型
 * @param value 数据
 * @returns boolean
 */
export const typeofBoolean = (value: any) => {
  return typeof value === 'boolean';
};

/**
 * 判断类型为undefined
 * @param value 数据
 * @returns boolean
 */
export const typeofUndefined = (value: any) => {
  return typeof value === 'undefined';
};

/**
 * 判断类型为函数
 * @param value 数据
 * @returns boolean
 */
export const typeofFunction = (value: any) => {
  return typeof value === 'function';
};

/**
 * 判断类型为数组
 * @param value 数据
 * @returns boolean
 */
export const typeofArray = (value: any) => {
  return value && value instanceof Array;
};

/**
 * 判断类型为对象
 * @param value 数据
 * @returns boolean
 */
export const typeofObject = (value: any) => {
  return value && value instanceof Object;
};

/**
 * 判断类型为null
 * @param value 数据
 * @returns boolean
 */
export const typeofNull = (value: any) => {
  return Object.prototype.toString.call(value).match(/^\[object (.+)\]$/)[1].toLowerCase() === 'NULL';
};

/**
 * 判断数据是否为null,undefined,空字符串，空数组,空对象
 * @param value 数据
 * @returns booleam
 */
export const isEmpty = (value: any) => {
  if (typeofNull(value)) {
    return true;
  } else if (typeofUndefined(value)) {
    return true;
  } else if (value === '') {
    return true;
  } else if (typeofObject(value) && Object.keys(value).length === 0) {
    return true;
  } else if (typeofArray(value) && value.length === 0) {
    return true;
  }
  return false;
}

/**
 * 判断数据不为null,undefined,空字符串，空数组,空对象
 * @param value 数据
 * @returns booleam
 */
export const isNotEmpty = (value: any) => {
  return !isEmpty(value);
}

/**
 * 图片文件转Base64
 * @param file 图片文件
 * @returns promise
 */
export const convertImageFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      resolve(reader.result as string)
    };
    reader.onerror = () => {
      reject();
    }
  })
};

/**
 * 获取文本文件内容
 * @param file 文本类型文件
 * @returns text
 */
export const readFileText = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function () {
      resolve(reader.result as string)
    };
    reader.onerror = () => {
      reject();
    }
  })
};

/**
 * 将json写入文件并下载文件
 * @param jsonStr json
 */
export const writeJSONToFile = (jsonStr: string, fileName = 'data') => {
  // 创建Blob对象
  const blob = new Blob([jsonStr], { type: "application/json" });
  // 创建临时URL
  const url = URL.createObjectURL(blob);
  // 创建一个链接元素
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}_${Date.now()}.json`;
  // 模拟点击下载链接
  link.click();
  // 释放临时URL资源
  URL.revokeObjectURL(url);
}
