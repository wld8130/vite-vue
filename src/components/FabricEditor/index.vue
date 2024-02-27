<template>
  <div class="fabric-editor-container">
    <div class="editor-header">
      <div class="editor-header-left">
        <Button type="link">导入</Button>
        <Divider type="vertical" />
        <Button type="link">插入</Button>
      </div>
      <div class="editor-header-right">
        <Button type="link">预览</Button>
        <Divider type="vertical" />
        <Button type="link">清空</Button>
        <Divider type="vertical" />
        <Button type="primary" @click="handleSaveJSON">保存</Button>
      </div>
    </div>
    <div class="editor-content">
      <div class="editor-content-left"> </div>
      <div class="workspace" ref="workspaceRef">
        <div class="inside-shadow"></div>
        <canvas ref="canvasRef" class="workspace-canvas"></canvas>
      </div>
      <div class="editor-content-right"> </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="FabricEditor">
  import { Button, Divider } from 'ant-design-vue';
  import { ref, onMounted } from 'vue';
  import { v4 as uuid } from 'uuid';
  import useFabricCanvas from './useFabricCanvas';
  import useFabricRect from './useFabricRect';
  import useFabricImage from './useFabricImage';
  import IMG_EXAMPLE from '/@/assets/img/example.png';
  import { fabric } from 'fabric';

    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const workspaceRef = ref<HTMLDivElement | null>(null);
    const { fabricCanvas, initFabricCanvas, addRect, addImageOfNoSelected, registerZoomMouseWheel, registerTransformMouseWheel, setSelectionStyle, canvasToJSON } = useFabricCanvas();
    const { createBackgroundRect, createRect } = useFabricRect();
    const { createFabricImage } = useFabricImage();

    const handleSaveJSON = () => {
      const canvasJSON = canvasToJSON(fabricCanvas.value as fabric.Canvas);
      console.log(canvasJSON);
    };

    const init = async () => {
      // 初始化fabric
      console.log(canvasRef.value?.clientWidth)
      initFabricCanvas(canvasRef.value, { width: canvasRef.value?.clientWidth, height: canvasRef.value?.clientHeight, backgroundColor: '#f1f1f1' });
      // , { width: canvasRef.value?.clientWidth, height: canvasRef.value?.clientHeight, backgroundColor: '#f1f1f1' }
      console.log(canvasRef.value?.clientWidth)
      registerZoomMouseWheel(fabricCanvas.value);
      registerTransformMouseWheel(fabricCanvas.value);
      setSelectionStyle(fabricCanvas.value);
      // 初始化编辑器
      const BgdRecet = createBackgroundRect({
        fill: 'rgba(255,255,255,1)',
        width: 100,
        height: 100,
        strokeWidth: 0,
      });
      addRect(fabricCanvas.value as any, BgdRecet);

      const textBox = createRect({
        alpha_id: uuid(),
        left: 100,
        top: 100,
        fill: 'red',
        width: 100,
        height: 100,
      });
      addRect(fabricCanvas.value as any, textBox);

      const result = await createFabricImage(IMG_EXAMPLE, {
        name: uuid(),
        left: 100,
        top: 100
      });

      if (result) {
        addImageOfNoSelected(fabricCanvas.value as any, result);
      }
    };

    onMounted(() => {
      init();
    });
</script>

<style lang="less">
  @header_height: 48px;

  .fabric-editor-container {
    width: 100%;
    height: 100%;
    border: 1px solid #eef2f8;

    .editor-header {
      display: flex;
      justify-content: center;
      height: @header_height;
      padding: 0 10px;
      border-bottom: 1px solid #eef2f8;
      background: #fff;
      line-height: @header_height;

      &-left {
        flex: auto;
      }
    }

    .editor-content {
      // display: flex;
      width: 100%;
      height: calc(100% - @header_height);

      &-left {
        display: inline-block;
        width: 220px;
        height: 100%;
        // padding: 10px;
        overflow-y: auto;
        background-color: #fff;
      }

      .workspace {
        display: inline-block;
        position: relative;
        width: calc(100% - 220px - 284px);
        height: 100%;
        overflow: hidden;
        background: #f1f1f1;

        .inside-shadow {
          position: absolute;
          z-index: 2;
          width: 100%;
          height: 100%;
          box-shadow: inset 0 0 9px 2px #0000001f;
          pointer-events: none;
        }

        &-canvas {
          width: 100%;
          height: 100%;
        }
      }

      &-right {
        display: inline-block;
        width: 284px;
        height: 100%;
        // padding: 10px;
        overflow-y: auto;
        background: #fff;
      }
    }
  }
</style>