<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
  >
    <v-card>
      <v-card-title class="create-post">
        <h2>{{edit ? 'Edit post' : 'Create post'}}</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field color="green" v-model.trim="$v.title.$model" placeholder="Title"></v-text-field>
        <v-textarea color="green" v-model.trim="$v.body.$model" no-resize placeholder="Content"></v-textarea>
        <v-file-input
            v-if="!edit"
            v-model="images"
            multiple
            color="green"
            label="Images"
            prepend-icon="mdi-camera"
            accept="image/png, image/jpeg, image/bmp"
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="darken-1"
            text
            @click="clear"
        >
          Close
        </v-btn>
        <v-btn
            :disabled="$v.$invalid"
            color="green darken-1"
            text
            @click="addPostAction"
        >
          {{edit ? 'Edit' : 'Create'}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {eventBus} from '../main';
import {mapActions} from 'vuex';
import {validationMixin} from 'vuelidate';
import {required} from 'vuelidate/lib/validators';


export default {
  name: "AddPost",
  mixins: [validationMixin],
  validations: {
    title: {
      required
    },
    body: {
      required
    }
  },
  data() {
    return {
      dialog: false,
      title: '',
      body: '',
      id: null,
      images: [],
      edit: false
    }
  },
  methods: {
    ...mapActions(['addPost', 'editPost']),
    async addPostAction() {
      const response = this.edit ?
          await this.editPost({
            title: this.title,
            body: this.body,
            _id: this.id
          })
          : await this.addPost({
            title: this.title,
            body: this.body,
            images: this.images
          });
      if (!response.error) {
        this.clear();
        eventBus.$emit('updatePosts')
      }
    },
    clear() {
      this.dialog = false
      this.edit = false
      this.title = ''
      this.body = ''
      this.id = null
      this.images = []
    }
  },
  created() {
    eventBus.$on('openCreatePost', data => {
      this.dialog = true;
      if (data) {
        this.edit = true;
        this.title = data.title
        this.body = data.body
        this.id = data._id
      }
    })
  }
}
</script>

<style scoped lang="scss">
.create-post {
  background-color: #9AE84D;
  font-family: 'Allerta Stencil', sans-serif;
}
</style>
