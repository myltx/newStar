<template>
  <canvas id="canvas"></canvas>
</template>

<script setup>
import { onMounted } from "vue";
import { useStar } from "../../use/useStar";
let { initCanvas, init, loop } = useStar();
onMounted(() => {
  initCanvas();
  init();
  loop();
});
</script>

<style lang="scss" scoped>
#canvas {
  background: #000;
}
</style>