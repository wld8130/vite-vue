/// <reference types="vite/client" />

// ts 无法识别.vue文件
declare module '*.vue' {
  import { defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare namespace fabric {
  export interface IRectOptions {
    alpha_id?: string;
  }

  export interface Canvas {
    isDragging?: boolean;
    lastPosX?: number;
    lastPosY?: number;
  }
}
