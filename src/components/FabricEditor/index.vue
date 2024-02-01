<template>
  <div>
    <canvas width="1600" height="900" ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts" name="FabricEditor">
  import { FabricImage, StaticCanvas } from 'fabric';
  import { ref, onMounted } from 'vue';
  import IMG_EXAMPLE from '/@/assets/img/example.png';

  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const canvasInstance = ref<any>();

  const init = async () => {
    canvasInstance.value = new StaticCanvas(canvasRef.value as unknown as HTMLCanvasElement);
    const oImg = await FabricImage.fromURL(IMG_EXAMPLE);
    if (oImg) {
      console.log(oImg)
      canvasInstance.value.add(oImg);
    }
  };

  onMounted(() => {
    init();
  });
</script>
