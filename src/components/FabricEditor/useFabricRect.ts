import { fabric } from 'fabric';

const useFabricRect = () => {
  const createRect = (options: fabric.IRectOptions): fabric.Rect => {
    const rect = new fabric.Rect(options);
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
