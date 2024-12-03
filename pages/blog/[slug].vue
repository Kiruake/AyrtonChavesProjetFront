<script setup lang="ts">

import type { SanityDocument } from "@sanity/client";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const  route  = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {slug: route.params.slug});

</script>

<template>
  <main>
    <div v-if ="post" class="blog-slug">
      <h1 class="blog-slug__title" >{{ post.title }}</h1>
      <p class="blog-slug__date">{{ new Date(post.publishedAt).toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
      <p class="blog-slug__content"><SanityContent  :blocks="post.body"/></p>
      <SanityImage v-if="post.image" :asset-id="post.image.asset._ref" />
    </div>

   
  </main>
</template>

<style lang="scss">

.blog-slug {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
  &__title {
    font-family: $fontTitleFamily;
    color: $primaryColor;
    text-align: center;
    margin-bottom: 5px;
    font-size: $fontTitleSize;
  }
  &__date {
    font-size: 1.2rem;
  }
  &__content {
    font-size: 1.6rem;
    width: 80%;
    display: block;
    margin: auto;
    text-align: center;
  }
}


</style>