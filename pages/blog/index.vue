<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, image, title, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

</script>

<template>

    <div>
       <h1> page des Blogs</h1>
       <ul>
           <div v-for="post in posts" :key="post._id">
                <NuxtLink :to="`/blog/${post.slug.current}`">  
                    <h1>{{ post.title }}</h1>
                
                <img v-if="post.image" :src="urlFor(post.image)?.url()">  
                <div v-else>Pas d'image</div>       
                </NuxtLink>
            </div>
       </ul>
    </div>
</template>

<style lang="scss"></style>