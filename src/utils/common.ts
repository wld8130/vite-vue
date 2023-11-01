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
