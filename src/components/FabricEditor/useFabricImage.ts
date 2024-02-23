import { fabric } from 'fabric';
import { convertImageFileToBase64 } from '/@/utils/common';
import { v4 as uuid } from 'uuid';

const useFabricImage = () => {
  /**
   * @description: 图片文件转字符串
   * @param {Blob|File} file 文件
   * @return {String}
   */
  const getImgStr = (file: File): Promise<FileReader['result']> => {
    return convertImageFileToBase64(file);
  };

  const createFabricImage = (file: string, options?: fabric.IImageOptions): Promise<fabric.Image> => {
    return insertImgFile(file, options);
  };

  // 插入图片文件
  const insertImgFile = (file: string, options?: fabric.IImageOptions): Promise<fabric.Image> => {
    if (!file) throw new Error('file is undefined');
    return new Promise((resolve, reject) => {
      const imgEl = document.createElement('img');
      imgEl.src = file;
      // 插入页面
      document.body.appendChild(imgEl);
      imgEl.onload = () => {
        // 创建图片对象
        const imgInstance = new fabric.Image(
          imgEl,
          options || {
            name: uuid(),
            left: 100,
            top: 100,
          }
        );
        // 删除页面中的图片元素
        imgEl.remove();
        resolve(imgInstance);
      };
      imgEl.onerror = () => {
        reject();
      };
    });
  };

  return {
    getImgStr,
    createFabricImage,
  };
};

export default useFabricImage;
