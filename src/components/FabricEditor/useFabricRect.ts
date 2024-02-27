import { fabric } from 'fabric';

const useFabricRect = () => {
  const createRect = (options: fabric.IRectOptions): fabric.Rect => {
    const rect = new fabric.Rect(options);
    // 设置选中时的样式
    rect.set({
      // borderColor: 'red', // 边框颜色
      // cornerColor: 'green', // 控制角颜色
      // cornerSize: 10, // 控制角大小
      // transparentCorners: false, // 控制角填充色不透明
      // selectionBackgroundColor: 'orange', // 选中后，背景色变橙色
      transparentCorners: false,
      borderColor: '#51B9F9',
      cornerColor: '#FFF',
      borderScaleFactor: 2.5,
      cornerStyle: 'circle',
      cornerStrokeColor: '#0E98FC',
      borderOpacityWhenMoving: 1,
    });

    // rect.hasBorders = false // 取消边框
    // rect.hasControls = false // 禁止控制角(没有控制角将意味着无法用鼠标直接操作缩放和旋转，只允许移动操作。)
    // rect.hoverCursor = 'wait' // 设置等待指针(自定义光标在对象悬停)
    // canvas.selection = false // 不允许直接从画布框选(不允许从画布框选，但允许选中元素。)
    return rect;
  };

  const createBackgroundRect = (options: fabric.IRectOptions): fabric.Rect => {
    const rect = new fabric.Rect(options);
    rect.set('selectable', false);
    rect.set('hasControls', false);
    rect.hoverCursor = 'default';
    return rect;
  };

  return {
    createRect,
    createBackgroundRect,
  };
};

export default useFabricRect;
