// import { fabric } from 'fabric';
// import { convertImageFileToBase64 } from '/@/utils/common';

const useFabricImage = () => {
  /**
   * @description: 图片文件转字符串
   * @param {Blob|File} file 文件
   * @return {String}
   */
  // const getImgStr = (file: File): Promise<FileReader['result']> => {
  //   return convertImageFileToBase64(file);
  // };

  const createFabricImageOfBgd = () => {};

  // 插入图片文件
  // const insertImgFile = (file: string) => {
  //   if (!file) throw new Error('file is undefined');
  //   const imgEl = document.createElement('img');
  //   imgEl.src = file;
  //   // 插入页面
  //   document.body.appendChild(imgEl);
  //   imgEl.onload = () => {
  //     // 创建图片对象
  //     const imgInstance = new fabric.Image(imgEl, {
  //       name: '图片1',
  //       left: 100,
  //       top: 100,
  //     });
  //     // 设置缩放
  //     canvasEditor.canvas.add(imgInstance);
  //     canvasEditor.canvas.setActiveObject(imgInstance);
  //     canvasEditor.canvas.renderAll();
  //     // 删除页面中的图片元素
  //     imgEl.remove();
  //   };
  // };

  const createFabricImage = () => {};

  return {
    createFabricImage,
    createFabricImageOfBgd,
  };
};

export default useFabricImage;
