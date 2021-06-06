<template>
  <div class="home">
    <header class="home-header d-flex align-center justify-space-between">
      <img class="home-header-logo" src="@/assets/logo.png" alt="fotius">
      <div v-if="!auth" class="home-header-buttons">
        <v-btn large rounded color="rgba(255,255,255,.5)" to="/login">
          Login
        </v-btn>
        <v-btn large rounded color="#9AE84D" class="btn-header-reg" to="/sign-up">
          Sign Up
        </v-btn>
      </div>
      <div v-else class="home-header-buttons">
        <v-btn large rounded color="#9AE84D" to="/box">
          Go To Box
        </v-btn>
      </div>
    </header>
    <main>
      <div class="home-main-text-container">
        <h1 class="home-title">Find your inspiration</h1>
        <p class="home-text">Join to fotius community and enjoy the sophistication of photos</p>
        <v-btn large rounded color="#9AE84DFF" to="/sign-up">
          Start for free
        </v-btn>
      </div>
      <v-carousel cycle class="home-carousel" height="100vh" :show-arrows="false" hide-delimiters>
        <v-carousel-item v-for="(img, idx) in images" :key="`img-${idx}`">
          <img class="carousel-img" :src="img" :alt="`Photo ${idx}`">
        </v-carousel-item>
      </v-carousel>
    </main>
    <footer class="home-footer">
      <p class="footer-text">fotius 2021 @ All rights reserved</p>
    </footer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      images: [
          require('@/assets/bg-1.jpg'),
          require('@/assets/bg-2.jpg'),
          require('@/assets/bg-3.jpg'),
          require('@/assets/bg-4.jpg')
      ]
    }
  },
  computed: {
    ...mapGetters(['auth'])
  }
}
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
}
.btn-header-reg {
  margin-left: 16px;
}
.home-header-logo {
  margin: -50px 0;
  width: 150px;
}
.carousel-img {
  width: 100%;
}
.home-header {
  padding: 10px 16px 0;
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(255,255,255,.3);
  box-shadow: 0 0 20px 20px rgba(255,255,255, .3);
}
.home-header-buttons {
  font-family: 'Allerta Stencil', sans-serif;
}
.home-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(255,255,255,.2);
  box-shadow: 0 0 20px 20px rgba(255,255,255, .2);
  padding-bottom: 10px;
}
.footer-text {
  text-align: center;
  font-family: 'Allerta Stencil', sans-serif;
  font-size: 16px;
  margin: 5px 0;
  color: #fff
}
.home-main-text-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  z-index: 10;
  color: #fff;
  text-shadow: 0px 3px 10px rgb(38, 38, 38);
  font-family: 'Allerta Stencil', sans-serif;
}
main {
  position: relative;
}
</style>
