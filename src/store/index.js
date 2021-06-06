import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import encode from '../utils/encode';

Vue.use(Vuex)

const token = () => localStorage.getItem('token');

const options = (headers = {}) => {
  return {
    headers: {
      'Authorization': `Bearer ${token()}`,
      ...headers
    }
  }
};


export default new Vuex.Store({
  state: {
    isLogged: token() && token() !== 'undefined' ? true : false,
    user: {}
  },
  getters: {
    auth(state) {
      return state.isLogged
    },
    user(state) {
      return state.user
    }
  },
  mutations: {
    LOGIN(state, token) {
      localStorage.setItem('token', token)
      state.isLogged = true
    },
    LOGOUT(state, payload) {
      localStorage.removeItem('token')
      state.isLogged = false
      state.user = {}
    },
    SET_USER(state, payload) {
      state.user = payload || {}
    }
  },
  actions: {
    async login({commit}, data) {
      try {
        const response = await axios.post('/signin', encode(data));
        commit('LOGIN', response.data.token);
        return {data: response.data};
      } catch (e) {
        console.error('Error', e)
        return {error: e}
      }
    },
    async signUp({commit}, data) {
      try {
        const response = await axios.post('/signup', encode({userData: JSON.stringify(data)}));
        commit('LOGIN', response.data.token);
        return {data: response.data};
      } catch (e) {
        console.error('Error', e);
        return {error: e}
      }
    },
    async getUser({commit}) {
      try {
        const response = await axios.get('/profile', options());
        commit('SET_USER', response.data)
        return {data: response.data};
      } catch (e) {
        console.error('Error', e);
        return {error: e}
      }
    },
    logout({commit}) {
      commit('LOGOUT')
    },
    async getPosts({commit}) {
      try {
        const response = await axios.get('/posts', options());
        return {data: response.data};
      } catch (e) {
        console.error('Error', e);
        return {error: e}
      }
    },
    async deletePost({commit}, _id) {
      try {
        const response = await axios.delete('/post', {...options(), data: encode({_id})});
        return {data: response.data};
      } catch (e) {
        console.error('Error', e);
        return {error: e}
      }
    },
    async editPost({commit}, data) {
      try {
        const response = await axios.put('/post', encode(data), options());
        return {data: response.data};
      } catch (e) {
        console.error('Error', e);
        return {error: e}
      }
    },
    async addPost({commit}, data) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('body', data.body);
      data.images.forEach(x => formData.append('images', x))
      try {
        const response = await axios.post('/post', formData, options({
          'Content-Type': 'multipart/form-data'
        }));
        return {data: response.data};
      } catch (e) {
        console.error('Error', e);
        return {error: e}
      }
    },
    async setLike({commit}, _id) {
      try {
        const response = await axios.post('/like', encode({_id}), options());
        return {...response.data};
      } catch (e) {
        console.error('Error', e)
        return {error: e}
      }
    },
    async sendComment({commit}, data) {
      try {
        const response = await axios.post('/comments/comment', encode(data), options());
        return {...response.data};
      } catch (e) {
        console.error('Error', e)
        return {error: e}
      }
    },
  },
  modules: {}
})
