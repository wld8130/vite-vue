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
      <div class="editor-content-left">
        <Menu mode="inline" :items="items" class="left-menu"></Menu>
        <div v-show="leftExtendFlag" class="left-extend"> </div>
        <div :class="`close-btn left-btn ${leftExtendFlag && 'left-btn-open'}`" @click="handleCollapsedLeft"></div>
      </div>
      <div class="editor-content-center">
        <div class="workspace" ref="workspaceRef">
          <div class="inside-shadow"></div>
          <canvas ref="canvasRef" class="workspace-canvas"></canvas>
        </div>
      </div>
      <div class="editor-content-right">
        <div v-show="rightExtendFlag" class="right-bar"> </div>
        <div :class="`close-btn right-btn ${rightExtendFlag && 'right-btn-open'}`" @click="handleCollapsedRight"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="FabricEditor">
  import { Button, Divider, Menu } from 'ant-design-vue';
  import { ref, onMounted, h } from 'vue';
  import { PieChartOutlined } from '@ant-design/icons-vue';
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
    const leftExtendFlag = ref<boolean>(false);
    const rightExtendFlag = ref<boolean>(false);

    const items = [
      {
        key: '1',
        icon: () => h(PieChartOutlined),
        label: 'One',
        title: 'One',
      },
    ];

    const handleCollapsedLeft = () => {
      leftExtendFlag.value = !leftExtendFlag.value;
    };

    const handleCollapsedRight = () => {
      rightExtendFlag.value = !rightExtendFlag.value;
    };

    const handleSaveJSON = () => {
      const canvasJSON = canvasToJSON(fabricCanvas.value as fabric.Canvas);
      console.log(canvasJSON);
    };

    const init = async () => {
      // 初始化fabric
      initFabricCanvas(canvasRef.value, { width: workspaceRef.value?.clientWidth, height: workspaceRef.value?.clientHeight, backgroundColor: '#f1f1f1' });
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
      display: flex;
      width: 100%;
      height: calc(100% - @header_height);

      &-left {
        display: flex;
        position: relative;

        .left-menu {
          width: 65px;
        }

        .left-extend {
          flex: 1;
          width: 220px;
          height: 100%;
          padding: 10px;
          padding: 0 10px 10px;
          overflow-y: auto;
          -webkit-box-flex: 1;
        }

      }

      &-center {
        flex: 1;

        .workspace {
          position: relative;
          width: 100%;
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
      }

      &-right {
        position: relative;

        .right-bar {
          width: 284px;
          height: 100%;
          padding: 10px;
          overflow-y: auto;
          background: #fff;
        }
      }

      .close-btn {
        position: absolute;
        z-index: 1;
        top: 50%;
        right: -20px;
        width: 20px;
        height: 64px;
        margin-top: -10px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAACACAMAAABOb9vcAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAADHx8cODg50dHTx8fF2dnZ1dXWWlpZHR0c4ODhQpkZ5AAAAIXRSTlMA9t+/upkRAnPq5NXDfDEsKQjMeGlRThkMsquljTwzIWhBHpjgAAABJElEQVRYw+3YyW7CQBCEYbxig8ELGJyQkJRJyPb+75dj3zy/lD7kMH3+ZEuzSFO1mlZwhjOE2uwhVHJYMygNVwilhz2EUvNaMigledUFoE1anKYAtA9nVRuANpviOQBt0t2ZQSnZ9QxK6Qih9LSGUHkJobYlhGp6CPW4hlAVhckLhMop1InCjEK1FBYU1hSqo/BI4YXCjMIthTWFijDCCB3g7fuO4O1t/rkvQXPz/LUIzX0oAM0tQHOfCkBzC9DcuwLQXACao9Dv1yb9lsek2xaaxMcMH1x6Ff79dY0wwgj/DGv3p2tG4cX9wd55h4rCO/hk3uEs9w6QlXPIbXrfIJ6XrmVBOtJCA1YkXqVLkh1aUgyNk1fV1BxLxzpsuNLKzrME/AWr0ywwvyj83AAAAABJRU5ErkJggg==");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        cursor: pointer;

        &.left-btn {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAACACAYAAAB5sSvuAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAgAAAAAAobJzlAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAADf0lEQVR4Ae2cvYsTQRjGE7FQkICFB1pZRyzEJkUKmzOpBEHwX9DCQkmChf4JahewsLpWFOQUzwMRPEgEy0PLpPADvEISDrVyfZ6cK0tIZrI7u7MPMi+8mb35uPnlmXczyeXmrURRdKyibAB8Dz8pywg42if4OUnIGd7Bww8Ut+GHpEATgPEll/y8DGRMtaB8hrryl30B2HzVW1Rcgx8vQ9UqaVac+Cf67cC34C+q1erHFcc5dUsDOD/RGBWv4M/hrwG8jzJ3cwFMwlDdd/BN+BZgd5ONLtd5Ac4zfEYFld0ALMMisxUFmAQa44dHdMB+TTasdM2bxJNxI7gDP7ISWNzJE1xymhF+uBzPbyvL2NZOA+oJIO/BrfP7iEGTSNtovIrY/L6sU9mA5PoAby6DtEq87JnlWF/H7+K+v/DmUQDkc23CNxbFpAogIa/Ab/IiaQoxmOThlnkG8TiKK5UUJNNR+MMYjqUaIJnWEYuXeEFTBCTXv1hUi0HCxXYWsbirqiAhb/BBWcE9KLimDEgB68pLTMAL6oBNdcBT6oBr6oAn1O9i2a2Od/DM1Jc4KBivVOYyLHFm6f4ODAoGBV0VcB0fYjAo6KqA6/gQg0FBVwVcx4cYDAq6KuA6/v+Mwel0Wmm325XhcOgqkH08/h6cyiaTSdRoNPhvBFGtVosGg0Gq8Wk7V9IO6Pf7MzgC+oBMDcgn1Ov1vEFmAvQJmRmQkN1ut3AlnQB9QDoDErLT6RSmZC6ARULmBlgUpPxWl5uCRcVhLoBFwTFsnAGLfi10AiwazklBX/txJgV9wWVSUP7tlvwbVspOyFarVfi7ac4Vvquzfyoy95DfiwOgeQHtrUFBu0bmHkFBsz721qCgXSNzj6CgWR97a1DQrpG5R1DQrI+9NSho18jcIyho1sfauqeuoDzgN3UFv6gD7qh/cK8rA84OGygv8VO+CCkrKH3g5Q1P41BB1SV+QDia4hJvQ72LB3h6gPIH/+5CvVGsntoSPwYQzxr/VgRkJoF1wP1KwvFa4SaRPgDNI+RLT2dTwTJfB+9j/jaWden5dgIe5oNnG2O+WwCb7bXWuflliSfLlAjCh4JULHMqjaIAc0tGkhdgnM6FyXI2EV+5pXNxAeTSMSHOSzg3+H2UuVsaQKq0A/eaUmiVb9yZlOk6vJSkTCZA2bRWsonBpFOrySan+wNoJmOM0LyBGwAAAABJRU5ErkJggg==");
        }

        &.left-btn-open {
          transform: rotateY(360deg);
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAACACAMAAABOb9vcAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAADHx8cODg50dHTx8fF2dnZ1dXWWlpZHR0c4ODhQpkZ5AAAAIXRSTlMA9t+/upkRAnPq5NXDfDEsKQjMeGlRThkMsquljTwzIWhBHpjgAAABJElEQVRYw+3YyW7CQBCEYbxig8ELGJyQkJRJyPb+75dj3zy/lD7kMH3+ZEuzSFO1mlZwhjOE2uwhVHJYMygNVwilhz2EUvNaMigledUFoE1anKYAtA9nVRuANpviOQBt0t2ZQSnZ9QxK6Qih9LSGUHkJobYlhGp6CPW4hlAVhckLhMop1InCjEK1FBYU1hSqo/BI4YXCjMIthTWFijDCCB3g7fuO4O1t/rkvQXPz/LUIzX0oAM0tQHOfCkBzC9DcuwLQXACao9Dv1yb9lsek2xaaxMcMH1x6Ff79dY0wwgj/DGv3p2tG4cX9wd55h4rCO/hk3uEs9w6QlXPIbXrfIJ6XrmVBOtJCA1YkXqVLkh1aUgyNk1fV1BxLxzpsuNLKzrME/AWr0ywwvyj83AAAAABJRU5ErkJggg==");
        }

        &.right-btn {
          right: 0;
          transform: rotateY(180deg);
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAACACAYAAAB5sSvuAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAgAAAAAAobJzlAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAADf0lEQVR4Ae2cvYsTQRjGE7FQkICFB1pZRyzEJkUKmzOpBEHwX9DCQkmChf4JahewsLpWFOQUzwMRPEgEy0PLpPADvEISDrVyfZ6cK0tIZrI7u7MPMi+8mb35uPnlmXczyeXmrURRdKyibAB8Dz8pywg42if4OUnIGd7Bww8Ut+GHpEATgPEll/y8DGRMtaB8hrryl30B2HzVW1Rcgx8vQ9UqaVac+Cf67cC34C+q1erHFcc5dUsDOD/RGBWv4M/hrwG8jzJ3cwFMwlDdd/BN+BZgd5ONLtd5Ac4zfEYFld0ALMMisxUFmAQa44dHdMB+TTasdM2bxJNxI7gDP7ISWNzJE1xymhF+uBzPbyvL2NZOA+oJIO/BrfP7iEGTSNtovIrY/L6sU9mA5PoAby6DtEq87JnlWF/H7+K+v/DmUQDkc23CNxbFpAogIa/Ab/IiaQoxmOThlnkG8TiKK5UUJNNR+MMYjqUaIJnWEYuXeEFTBCTXv1hUi0HCxXYWsbirqiAhb/BBWcE9KLimDEgB68pLTMAL6oBNdcBT6oBr6oAn1O9i2a2Od/DM1Jc4KBivVOYyLHFm6f4ODAoGBV0VcB0fYjAo6KqA6/gQg0FBVwVcx4cYDAq6KuA6/v+Mwel0Wmm325XhcOgqkH08/h6cyiaTSdRoNPhvBFGtVosGg0Gq8Wk7V9IO6Pf7MzgC+oBMDcgn1Ov1vEFmAvQJmRmQkN1ut3AlnQB9QDoDErLT6RSmZC6ARULmBlgUpPxWl5uCRcVhLoBFwTFsnAGLfi10AiwazklBX/txJgV9wWVSUP7tlvwbVspOyFarVfi7ac4Vvquzfyoy95DfiwOgeQHtrUFBu0bmHkFBsz721qCgXSNzj6CgWR97a1DQrpG5R1DQrI+9NSho18jcIyho1sfauqeuoDzgN3UFv6gD7qh/cK8rA84OGygv8VO+CCkrKH3g5Q1P41BB1SV+QDia4hJvQ72LB3h6gPIH/+5CvVGsntoSPwYQzxr/VgRkJoF1wP1KwvFa4SaRPgDNI+RLT2dTwTJfB+9j/jaWden5dgIe5oNnG2O+WwCb7bXWuflliSfLlAjCh4JULHMqjaIAc0tGkhdgnM6FyXI2EV+5pXNxAeTSMSHOSzg3+H2UuVsaQKq0A/eaUmiVb9yZlOk6vJSkTCZA2bRWsonBpFOrySan+wNoJmOM0LyBGwAAAABJRU5ErkJggg==");
        }

        &.right-btn-open {
          right: 304px;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAACACAMAAABOb9vcAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAADHx8cODg50dHTx8fF2dnZ1dXWWlpZHR0c4ODhQpkZ5AAAAIXRSTlMA9t+/upkRAnPq5NXDfDEsKQjMeGlRThkMsquljTwzIWhBHpjgAAABJElEQVRYw+3YyW7CQBCEYbxig8ELGJyQkJRJyPb+75dj3zy/lD7kMH3+ZEuzSFO1mlZwhjOE2uwhVHJYMygNVwilhz2EUvNaMigledUFoE1anKYAtA9nVRuANpviOQBt0t2ZQSnZ9QxK6Qih9LSGUHkJobYlhGp6CPW4hlAVhckLhMop1InCjEK1FBYU1hSqo/BI4YXCjMIthTWFijDCCB3g7fuO4O1t/rkvQXPz/LUIzX0oAM0tQHOfCkBzC9DcuwLQXACao9Dv1yb9lsek2xaaxMcMH1x6Ff79dY0wwgj/DGv3p2tG4cX9wd55h4rCO/hk3uEs9w6QlXPIbXrfIJ6XrmVBOtJCA1YkXqVLkh1aUgyNk1fV1BxLxzpsuNLKzrME/AWr0ywwvyj83AAAAABJRU5ErkJggg==");
        }
      }
    }
  }
</style>