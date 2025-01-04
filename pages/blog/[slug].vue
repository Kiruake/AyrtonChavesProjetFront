<script setup lang="ts">

import type { SanityDocument } from "@sanity/client";


const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    publishedAt,
    body,
    image,
    "categories": categories[]->{
        title,
      slug
    }
    }`;
const  route  = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {slug: route.params.slug});

if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' });
}

const { urlFor } = useSanityImage();

useSeoMeta({
    title: "Tracking App | " + post.value.title,
    ogTitle: "Tracking App | " + post.value.title,
    ogImage: post.value.image && urlFor(post.value.image) ? urlFor(post.value.image)?.url() : '/images/LogoTracker.svg'
})
</script>

<template>
  <main class="blog">
      <div v-if="post" class="blog__slug">

          <h1 class="blog__title">{{ post.title }}</h1>

          <p class="blog__date">
              {{ new Date(post.publishedAt).toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>

          <div v-for="category in post.categories" :key="category._id" class="blog__categories">
              <NuxtLink :to="`/blog/category/${category.slug.current}`">
                  <Button class="button -small -blogslug" :label="category.title" />
              </NuxtLink>
          </div>

          <SanityImage v-if="post.image" class="blog__image" :asset-id="post.image.asset._ref" />
          <p class="blog__content"><SanityContent :blocks="post.body" /></p>
      </div>
  </main>
</template>

  

<style lang="scss">

.blog {
    line-height: 1.6;
    background-color: #F1F7F7;
    padding: 2rem;
    padding-bottom: 7rem;
    border-radius: 12px;

    &__slug {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 3rem;
        max-width: 90%;
        border-radius: 6px;
        margin: 0 auto;
        background-color: white;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    &__title {
        font-family: $fontTitleFamily;
        color: orange;
        text-align: center;
        margin-bottom: 1rem;
        font-size: clamp(2rem, 4vw, 3rem); /* Adjust size for responsive */
        font-weight: 700;
        line-height: 1.2;
    }

    &__date {
        font-size: 1rem;
        color: #777;
        font-style: italic;
        margin-top: -1rem;
    }

    &__categories {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    &__content {
        font-size: 1.2rem;
        line-height: 1.8;
        color: #333;
        text-align: justify;
        width: 100%;
        margin-top: 2rem;
    }

    &__image {
        width: 100%;
        max-width: 100%;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        margin-top: 1rem;
        height: 350px;
        object-fit: cover;
    }
}

/* Gestion des erreurs */
.error-404 {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    text-align: center;

    &__title {
        font-family: 'Poppins', sans-serif;
        color: #ff6f61;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }

    &__content {
        font-size: 1rem;
        color: #777;
        line-height: 1.6;
    }
}

</style>