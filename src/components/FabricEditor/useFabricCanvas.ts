import { ref, onUnmounted } from 'vue';
import { fabric } from 'fabric';

const useFabricCanvas = () => {
  const fabricCanvas = ref<fabric.Canvas>();

  /**
   * 根据Dom元素生成
   * @param canvasEle canvas Dom元素
   */
  const initFabricCanvas = (canvasEle: HTMLCanvasElement | null, options?: fabric.ICanvasOptions) => {
    if (canvasEle) {
      fabricCanvas.value = new fabric.Canvas(canvasEle, {
        fireRightClick: true, // 启用右键，button的数字为3
        stopContextMenu: true, // 禁止默认右键菜单
        controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
        imageSmoothingEnabled: false, // 解决文字导出后不清晰问题
        // preserveObjectStacking: true, // 默认false(元素对象被选中时保持在当前z轴，不会跳到最顶层)
        ...options,
      });
    }
  };

  /**
   * 清空画布
   * @param canvasIns canvas
   */
  const clearFabricCanvas = (canvasIns: fabric.Canvas) => {
    if (canvasIns) {
      canvasIns.clear();
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

  /**
   * 向canvas添加图片
   * @param canvasIns canvas
   * @param imgInstance 图片
   */
  const addImage = (canvasIns: fabric.Canvas, imgInstance: fabric.Image) => {
    // 设置缩放
    canvasIns.add(imgInstance);
    // canvasIns.setActiveObject(imgInstance);
    canvasIns.renderAll();
  };

  /**
   * 向canvas添加图片
   * @param canvasIns canvas
   * @param imgInstance 图片
   */
  const addImageOfNoSelected = (canvasIns: fabric.Canvas, imgInstance: fabric.Image) => {
    // 设置缩放
    imgInstance.set('selectable', false);
    canvasIns.add(imgInstance);
    // canvasIns.setActiveObject(imgInstance);
    canvasIns.renderAll();
  };

  /**
   * 向canvas设置背景
   * @param canvasIns canvas
   * @param imgInstance 图片
   */
  const setBackgroundImage = (canvasIns: fabric.Canvas, imgInstance: fabric.Image) => {
    // 设置背景图像
    canvasIns.setBackgroundImage(imgInstance, () => {
      canvasIns.renderAll();
    });
  };

  /**
   * 向canvas设置宽高
   * @param canvasIns canvas
   * @param options 宽高
   */
  const setCanvasDimensions = (canvasIns?: fabric.Canvas, options?: fabric.ICanvasDimensions) => {
    // 设置宽高
    console.log(options);
    if (canvasIns && options) {
      canvasIns.setDimensions(options);
    }
  };

  /**
   * 设置框选的样式
   * @param canvasIns canvas
   */
  const setSelectionStyle = (canvasIns?: fabric.Canvas) => {
    if (canvasIns) {
      canvasIns.selection = true; // 画布是否可选中。默认true；false 不可选中
      canvasIns.selectionColor = 'rgba(106, 101, 216, 0.3)'; // 画布鼠标框选时的背景色
      canvasIns.selectionBorderColor = '#1d2786'; // 画布鼠标框选时的边框颜色
      canvasIns.selectionLineWidth = 6; // 画布鼠标框选时的边框厚度
      canvasIns.selectionDashArray = [30, 4, 10]; // 画布鼠标框选时边框虚线规则
      canvasIns.selectionFullyContained = true; // 只选择完全包含在拖动选择矩形中的形状
    }
  };

  /**
   * 向canvas新增放大缩小事件(ctrl)
   * @param canvasIns canvas
   */
  const registerZoomMouseWheel = (canvasIns?: fabric.Canvas) => {
    if (canvasIns) {
      canvasIns.on('mouse:wheel', (opt) => {
        // 鼠标按下时触发
        const delta = opt.e.deltaY; // 滚轮向上滚一下是 -100，向下滚一下是 100
        let zoom = canvasIns.getZoom(); // 获取画布当前缩放值

        // 控制缩放范围在 0.01~20 的区间内
        zoom *= 0.999 ** delta;
        if (zoom > 20) {
          zoom = 20;
        }
        if (zoom < 0.01) {
          zoom = 0.01;
        }

        // 设置画布缩放比例
        // 关键点！！！
        // 参数1：将画布的所放点设置成鼠标当前位置
        // 参数2：传入缩放值
        canvasIns.zoomToPoint(
          {
            x: opt.e.offsetX, // 鼠标x轴坐标
            y: opt.e.offsetY, // 鼠标y轴坐标
          },
          zoom // 最后要缩放的值
        );
      });
    }
  };

  /**
   * 向canvas卸载放大缩小事件
   * @param canvasIns canvas
   */
  const releaseZoomMouseWheel = (canvasIns: fabric.Canvas) => {
    canvasIns.off('mouse:wheel');
  };

  /**
   * 向canvas新增平移事件(alt)
   * @param canvasIns canvas
   */
  const registerTransformMouseWheel = (canvasIns?: fabric.Canvas) => {
    if (canvasIns) {
      canvasIns.on('mouse:down', (opt) => {
        // 鼠标按下时触发
        const evt = opt.e;
        if (evt.altKey === true) {
          // 是否按住alt
          canvasIns.isDragging = true; // isDragging 是自定义的，开启移动状态
          canvasIns.lastPosX = evt.clientX; // lastPosX 是自定义的
          canvasIns.lastPosY = evt.clientY; // lastPosY 是自定义的
        }
      });

      canvasIns.on('mouse:move', (opt) => {
        // 鼠标移动时触发
        if (canvasIns.isDragging) {
          const evt = opt.e;
          const vpt = canvasIns.viewportTransform as number[]; // 聚焦视图的转换
          vpt[4] += evt.clientX - (canvasIns.lastPosX as number);
          vpt[5] += evt.clientY - (canvasIns.lastPosY as number);
          canvasIns.requestRenderAll(); // 重新渲染
          canvasIns.lastPosX = evt.clientX;
          canvasIns.lastPosY = evt.clientY;
        }
      });

      canvasIns.on('mouse:up', () => {
        // 鼠标松开时触发
        canvasIns.setViewportTransform(canvasIns.viewportTransform as number[]); // 设置此画布实例的视口转换
        canvasIns.isDragging = false; // 关闭移动状态
      });
    }
  };

  /**
   * 向canvas卸载放大缩小事件
   * @param canvasIns canvas
   */
  const releaseTransformMouseWheel = (canvasIns: fabric.Canvas) => {
    canvasIns.off('mouse:down');
    canvasIns.off('mouse:move');
    canvasIns.off('mouse:up');
  };

  /**
   * canvas转JSON
   * @param canvasIns canvas
   * @param customKeys keys(序列化JSON添加的key)
   * @returns
   */
  const canvasToJSON = (canvasIns: fabric.Canvas, customKeys?: string[]) => {
    return canvasIns.toJSON(customKeys);
  };

  /**
   * 反序列化
   * @param canvasIns canvas
   * @param strJSON JSON
   */
  const canvasLoadJSON = (canvasIns: fabric.Canvas, strJSON: string) => {
    canvasIns.loadFromJSON(strJSON, () => {
      canvasIns.renderAll();
    });
  };

  onUnmounted(() => {
    releaseZoomMouseWheel(fabricCanvas.value as fabric.Canvas);
    releaseTransformMouseWheel(fabricCanvas.value as fabric.Canvas);
  });

  return {
    fabricCanvas,
    initFabricCanvas,
    clearFabricCanvas,
    addRect,
    addImage,
    setBackgroundImage,
    setCanvasDimensions,
    addImageOfNoSelected,
    registerZoomMouseWheel,
    releaseZoomMouseWheel,
    registerTransformMouseWheel,
    releaseTransformMouseWheel,
    setSelectionStyle,
    canvasToJSON,
    canvasLoadJSON,
  };
};

export default useFabricCanvas;
