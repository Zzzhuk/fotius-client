<template>
  <div class="cards-box">
    <v-card class="card-item" v-for="(post, idx) in posts" :key="`post-${idx}`">
      <div class="card-menu" v-if="user._id === post.user" @click.stop="editPost(post)">
        <v-btn fab color="#9ae84d" dark>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab small color="red" dark @click.stop="selectForDelete(post._id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
      <v-carousel hide-delimiters v-if="post.images.length > 0">
        <v-carousel-item class="img-card" v-for="(img, idxImg) in post.images" :key="`image-${idxImg}`">
          <img :src="replaceImg(img)">
        </v-carousel-item>
      </v-carousel>
      <div class="card-title-container">
        <h3 class="card-title">{{ post.title }}</h3>
        <div class="likes-container">
          <p class="likes">Likes: {{ post.likes }}</p>
          <button class="like" :class="{active: post.isLikedByUser}" @click="like(post._id)">
            <v-icon class="like" dense>mdi-thumb-up</v-icon>
          </button>
        </div>

      </div>
      <p class="card-text">{{ post.body }}</p>
      <div class="comments-container">
        <p class="comment" v-for="(comment, idx) in post.comments" :key="`comment-${idx}`">
          <strong>{{ comment.user.name }}</strong>: {{ comment.body }}
        </p>
        <v-text-field
            :ref="`comment-input-${post._id}`"
            color="green"
            class="comment-input"
            clearable
            dense
            placeholder="Comment..."
            append-outer-icon="mdi-send"
            @click:append-outer="sendCommentAction(post._id)"
        ></v-text-field>
      </div>
    </v-card>
    <v-dialog max-width="400" persistent v-model="deleteDialog">
      <v-card>
        <v-card-title class="text-h5">
          Delete post?
        </v-card-title>
        <v-card-text>Are you sure you want to delete this post?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              @click="cancelDialog"
          >
            Cancel
          </v-btn>
          <v-btn
              color="red darken-1"
              text
              @click="deletePostAction"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {eventBus} from '../main';

export default {
  name: "box",
  data() {
    return {
      posts: [],
      pending: false,
      deleteId: null,
      deleteDialog: false,
      pendingDelete: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['getPosts', 'setLike', 'sendComment', 'deletePost']),
    async setPosts() {
      this.pending = true
      const response = await this.getPosts()
      if (response.data) {
        this.posts = response.data.posts
      }
      this.pending = false
    },
    async like(id) {
      const response = await this.setLike(id);
      if (!response.error) {
        await this.setPosts()
      }
    },

    selectForDelete(id) {
      this.deleteDialog = true;
      this.deleteId = id;
    },
    cancelDialog() {
      this.deleteDialog = false;
      this.deleteId = null;
    },

    replaceImg(img) {
      return img.replace('E:\\WEB\\fotius\\server\\src\\public', 'http://localhost:3000/static')
    },

    editPost(post) {
      eventBus.$emit('openCreatePost', post)
    },

    async deletePostAction() {
      this.pendingDelete = true
      const response = await this.deletePost(this.deleteId)
      if (!response.error) {
        this.pendingDelete = false
        this.cancelDialog()
        await this.setPosts();
      }
    },
    async sendCommentAction(postId) {
      const body = this.$refs[`comment-input-${postId}`][0].$el.querySelector('input').value;
      if (body.length > 0) {
        const response = await this.sendComment({
          body,
          postId
        });
        if (!response.error) {
          console.log(this.$refs[`comment-input-${postId}`][0].$el.querySelector('input'), response)
          this.$refs[`comment-input-${postId}`][0].$el.querySelector('input').value = ''
          await this.setPosts();
        }
      }
    }
  },
  created() {
    eventBus.$on('updatePosts', () => {
      this.setPosts()
    })
    this.setPosts()
  }
}
</script>

<style scoped lang="scss">
.img-card {
  img {
    max-width: 100%;
  }
}
.likes-container {
  display: flex;
  align-items: center;
}

.likes {
  font-size: 14px;
  margin: 5px 10px 0 0;
}

.like {
  &:hover {
    color: #2c4528;
  }

  &:active {
    color: #172314 !important;
  }

  &.active .v-icon {
    color: #9ae84d
  }
}

.card-title-container {
  display: flex;
}

.card-title {
  flex: 1;
  margin: 20px 10px 0 0;
}

.cards-box {
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
}

.card-item {
  max-width: 600px;
  width: 100%;
  padding: 16px 16px 0;
  margin-bottom: 24px;

  &:hover {
    .card-menu {
      opacity: 1;
      visibility: visible;
    }
  }
}

.comment-input {
  margin-top: 10px;
  font-size: 12px;
}

.comment {
  margin-bottom: 5px;
  font-size: 12px;
}

.card-text {
  margin: 10px 0 5px;
  font-size: 12px;
}

.card-menu {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: -65px;
  transition: .2s linear;
  top: 0;

  .v-btn {
    margin-bottom: 10px;
  }
}
</style>
