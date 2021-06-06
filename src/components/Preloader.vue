<template>
  <div class="preloader d-flex justify-center align-center">
    <img src="@/assets/logo.png" alt="fotius">
  </div>
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style scoped lang="scss">
.preloader {
  position: fixed;
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 9999;

  img {
    box-shadow: 0 0 0 0 rgba(154, 232, 77, 1);
    transform: scale(1);
    animation: pulse 1.5s infinite;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(154, 232, 77, .7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(154, 232, 77, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
