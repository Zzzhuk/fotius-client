<template>
  <v-app>
    <router-view/>
    <transition name="fade">
      <Preloader v-if="preloaderVisible"/>
    </transition>
  </v-app>
</template>

<script>
import Preloader from './components/Preloader';

export default {
  name: 'app',
  components: {
    Preloader
  },
  data() {
    return {
      preloaderVisible: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.preloaderVisible = false
    }, 1000)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Allerta+Stencil&family=Noto+Sans+JP:wght@500;700&display=swap');
</style>
