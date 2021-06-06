<template>
  <div>
    <header>
      <router-link to="/" style="flex: 1">
        <img class="header-logo" src="@/assets/logo.png" alt="fotius">
      </router-link>

      <div class="header-profile" style="flex: 1">
        <h3 class="header-name">{{ user.name }}</h3>
        <v-btn @click="openDialog" fab small><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn rounded color="#9AE84D" @click="logoutAction">Logout</v-btn>
      </div>
    </header>
    <main>
      <transition name="slide-left">
        <router-view/>
      </transition>
    </main>
    <AddPost />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {eventBus} from '../main';
import AddPost from './AddPost';

export default {
  name: "BoxLayout",
  components: {AddPost},
  data() {
    return {
      transition: 'slide-left',
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['logout']),
    logoutAction() {
      this.logout();
      this.$router.replace('/login')
    },
    openDialog() {
      eventBus.$emit('openCreatePost')
    }
  }
}
</script>

<style scoped lang="scss">
.input {
  background-color: #fff;
}

.header-logo {
  margin: -50px 0;
  width: 150px;
}

header {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
}
main {
  margin-top: 50px;
}

.header-profile {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .v-btn {
    margin-left: 20px;
  }
}

.header-search {
  max-width: 500px;
  flex: 2;
}

</style>
