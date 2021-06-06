<template>
  <main class="d-flex justify-center align-center">
    <div class="background"></div>
    <div class="foreground"></div>
    <form @submit.prevent="submit" class="form login-form">
      <h2>Login to
        <router-link tag="span" to="/">fotius</router-link>
      </h2>
      <v-text-field
          color="#fff"
          label="Email:"
          v-model.trim="$v.email.$model"
          :error="$v.email.$anyError || error"
          @change="error = false"
      ></v-text-field>
      <v-text-field
          type="password"
          color="#fff"
          label="Password:"
          v-model.trim="$v.password.$model"
          :error="$v.password.$anyError || error"
          @change="error = false"
          :error-messages="error ? 'User does not exist' : null"
      ></v-text-field>
      <v-btn rounded large color="#9AE84D" type="submit" :disabled="$v.$invalid" :loading="pending">Login</v-btn>
    </form>
  </main>
</template>

<script>
import {validationMixin} from 'vuelidate';
import {email, required} from 'vuelidate/lib/validators';
import {mapActions} from 'vuex';

export default {
  name: 'login',
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  data() {
    return {
      email: '',
      password: '',
      pending: false,
      error: false
    }
  },
  methods: {
    ...mapActions(['login']),
    async submit() {
      this.pending = true
      const response = await this.login({
        email: this.email,
        password: this.password
      });
      if (!response.error) {
        await this.$router.push('/box')
      } else {
        this.error = true
      }
      this.pending = false
    }
  }
}
</script>

<style scoped lang="scss">
.submit-btn {
  color: #ffffff;
  font-family: 'Allerta Stencil', sans-serif;
}

main {
  position: relative;
  height: 100vh;
  z-index: 1;
}

h2 {
  font-family: 'Allerta Stencil', sans-serif;
  color: #fff;
  text-shadow: 0 2px 5px rgba(0, 0, 0, .5);
  margin-bottom: 30px;

  span {
    color: $c-green;
    font-size: 30px;
    cursor: pointer;
  }
}

.background {
  position: absolute;
  z-index: -2;
  background-image: url("../assets/bg-auth.jpg");
  background-size: cover;
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  left: 0;
}

.foreground {
  backdrop-filter: blur(10px);
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  left: 0;
}
</style>
