<template>
  <div class="fabric-editor-container">
    <div class="editor-header">
      <div class="editor-header-left">
        <FabricImport :after-get-file="handleImportJSONFile" />
        <Divider type="vertical" />
        <FabricImage :after-get-image="handleInsertImage" />
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
  // import useFabricRect from './useFabricRect';
  import useFabricImage from './useFabricImage';
  import { fabric } from 'fabric';
  import FabricImport from './components/FabricImport.vue';
  import FabricImage from './components/FabricImage.vue';
  import { isNotEmpty, writeJSONToFile } from '/@/utils/common';

  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const workspaceRef = ref<HTMLDivElement | null>(null);
  const {
    fabricCanvas,
    initFabricCanvas,
    // addRect,
    addImageOfNoSelected,
    registerZoomMouseWheel,
    registerTransformMouseWheel,
    setSelectionStyle,
    canvasToJSON,
    canvasLoadJSON
  } = useFabricCanvas();
  // const { createBackgroundRect, createRect } = useFabricRect();
  const { createFabricImage } = useFabricImage();

  /**
   * 将有效的JSON文件转译
   * @param file JSON文件
   */
  const handleImportJSONFile = (jsonstr: string) => {
    if (isNotEmpty(jsonstr) && fabricCanvas.value) {
      canvasLoadJSON(fabricCanvas.value, jsonstr);
    }
  };

  /**
   * 插入背景图（不可选中）
   * @param imgBase64String 图片base64形式
   */
  const handleInsertImage = async (imgBase64String: string) => {
    if (isNotEmpty(imgBase64String) && fabricCanvas.value) {
      const result = await createFabricImage(imgBase64String, {
        alpha_id: uuid(),
        left: 100,
        top: 100
      });
      if (result) {
        addImageOfNoSelected(fabricCanvas.value as any, result);
      }
    }
  };

  // 将文件保存JSON
  const handleSaveJSON = () => {
    const canvasJSON = canvasToJSON(fabricCanvas.value as fabric.Canvas, ['alpha_id', 'selectable']);
    writeJSONToFile(JSON.stringify(canvasJSON), 'canvasFabric');
  };

  const init = async () => {
    // 初始化fabric
    initFabricCanvas(canvasRef.value, { width: canvasRef.value?.clientWidth, height: canvasRef.value?.clientHeight, backgroundColor: '#f1f1f1' });
    registerZoomMouseWheel(fabricCanvas.value);
    registerTransformMouseWheel(fabricCanvas.value);
    setSelectionStyle(fabricCanvas.value);
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