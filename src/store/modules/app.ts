import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAppStore = defineStore('app', () => {
  const count = ref(0);

  const addCount = () => {
    count.value += 1;
  };

  return {
    count,
    addCount,
  };
});

export default useAppStore;
