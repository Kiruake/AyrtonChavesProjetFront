<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, image, "categories": categories[]->{_id,title, slug}, title, slug, publishedAt}`;

const CATEGORIES_QUERY = groq`*[
  _type == "category"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id ,title, slug}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
const { data: categories } = await useSanityQuery<SanityDocument[]>(CATEGORIES_QUERY);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

</script>

<template>

    <main>

        <h1 class="a-title">Tous les articles</h1>

        <div class="c-categories">
        <div class="c-categories__item" v-for="category in categories" :key="category._id">
            <NuxtLink :to="`/blog/category/${category.slug.current}`">
            <button class="button -small">{{ category.title }}</button>
            </NuxtLink>
        </div>
        </div>

        <div class="c-blog">
        <div v-for="post in posts" :key="post._id">
            <div>
            <NuxtLink :to="`/blog/${post.slug.current}`">  
                <h1 class="c-blog__title">{{ post.title }}</h1>
            </NuxtLink>
            </div>

            <img class="c-blog__image" v-if="post.image" :src="urlFor(post.image)?.url()">  
            <div v-else>Pas d'image</div>     

            <div class="c-blog__categories">
            <div v-for="category in post.categories" :key="category._id">
                <NuxtLink :to="`/blog/category/${category.slug.current}`">
                <button class="button -small">{{ category.title }}</button>
                </NuxtLink>
            </div>
            </div>
        </div>
        </div>


    </main>

</template>

<style lang="scss">

.a-title {
  font-family: $fontTitleFamily;
  text-align: center;
  margin-bottom: 3rem;
  font-size: $fontTitleSize;
}

.c-categories {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;

  &__item {
    color: $primaryColor;
    text-align: center;
    margin-bottom: 5px;
    font-size: 1.2rem;
  }
}

.c-blog {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  margin: auto;
  text-align: center;

  &__title {
    font-family: $fontTitleFamily;
    color: $primaryColor;
    text-align: center;
    margin-bottom: 5px;
    font-size: $fontSubTitleSize;
  }

  &__image {
    width: 300px;
    height: 300px;
    object-fit: cover;
    display: block;
    margin: auto;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  &__categories {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  &__category {
    color: $primaryColor;
    text-align: center;
    margin-bottom: 5px;
    font-size: 1.2rem;
  }
}


</style>
