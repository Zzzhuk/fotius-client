<template>
  <main class="d-flex justify-center align-center">
    <div class="background"></div>
    <div class="foreground"></div>
    <form @submit.prevent="submit" class="form reg-form">
      <h2>Sign Up in
        <router-link tag="span" to="/">fotius</router-link>
      </h2>
      <v-text-field color="#fff" label="Name:" v-model.trim="$v.name.$model" :error="$v.name.$anyError"></v-text-field>
      <v-text-field color="#fff" label="Email:" v-model.trim="$v.email.$model"
                    :error="$v.email.$anyError || error"
                    @input="error = false"
                    :error-messages="error ? 'Internal Error' : null"></v-text-field>
      <v-text-field color="#fff" label="Password:"
                    :error-messages="$v.password.$anyError ?
                    (!$v.password.minLength ? 'Password will be at least 6 symbols' : 'Password is required') : null"
                    v-model.trim="$v.password.$model" :error="$v.password.$anyError"></v-text-field>
      <v-btn rounded large color="#9AE84D" type="submit" :disabled="$v.$invalid" :loading="pending">Sign Up</v-btn>
    </form>
  </main>
</template>

<script>
import {validationMixin} from 'vuelidate';
import {required, email, minLength} from 'vuelidate/lib/validators';
import {mapActions} from 'vuex';

export default {
  name: 'sign-up',
  mixins: [validationMixin],
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      // minLength: minLength(6)
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      pending: false,
      error: false
    }
  },
  methods: {
    ...mapActions(['signUp']),
    async submit() {
      this.pending = true;
      const response = await this.signUp({
        email: this.email,
        name: this.name,
        password: this.password
      });

      if (!response.error) {
        await this.$router.push('/box')
      } else {
        this.error = true
      }
      this.pending = false;
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
