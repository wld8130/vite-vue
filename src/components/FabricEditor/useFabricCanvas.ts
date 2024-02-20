import { ref } from 'vue';
import { fabric } from 'fabric';

const useFabricCanvas = () => {
  const fabricCanvas = ref<fabric.Canvas>();

  /**
   * 根据Dom元素生成
   * @param canvasEle canvas Dom元素
   */
  const initFabricCanvas = (canvasEle: HTMLCanvasElement | null) => {
    if (canvasEle) {
      fabricCanvas.value = new fabric.Canvas(canvasEle, {
        fireRightClick: true, // 启用右键，button的数字为3
        stopContextMenu: true, // 禁止默认右键菜单
        controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
        imageSmoothingEnabled: false, // 解决文字导出后不清晰问题
      });
    }
  };

  /**
   * 向canvas添加对象
   * @param canvasIns canvas
   * @param rect 对象
   */
  const addRect = (canvasIns: fabric.Canvas, rect: fabric.Rect) => {
    canvasIns.add(rect);
    canvasIns.renderAll();
  };

  return {
    fabricCanvas,
    initFabricCanvas,
    addRect,
  };
};

export default useFabricCanvas;
