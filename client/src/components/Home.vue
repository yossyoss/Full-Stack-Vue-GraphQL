<template>
  <v-container text-xs-center v-if="getPosts">
    <v-flex xs12>
      <v-carousel v-bind="{ 'cycle': true}" interval="3000">
        <v-carousel-item v-for="post in getPosts" :key="post._id" :src="post.imageUrl">
          <h1 id="carousel__title">{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>

  </v-container>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "home",
  data() {
    return {
      posts: []
    };
  },
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            imageUrl
            description
            likes
          }
        }
      `,
      result({ data, loading, networkStatus }) {
        if (!loading) {
          this.posts = data.getPosts;
          console.log("[networkStatus]", networkStatus); //7 means that it's working fine
        }
      },
      error(err) {
        console.error("[ERROR!!]", err);
        console.dir(err);
      }
    }
  }
};
</script>
<style>
#carousel__title {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
