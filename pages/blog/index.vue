<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

useSeoMeta({
  title: "Blog | Tracking App",
  description: "Tous les articles pour vous aider dans votre quotidien",
  ogDescription: "Tous les articles pour vous aider dans votre quotidien",
  ogImage: "/images/LogoTracker.svg",
});

const filter = ref<string>("");

const page = ref<number>(1);
const perPage = 4;

const start = computed(() => (page.value - 1) * perPage);
const end = computed(() => page.value * perPage);

function onPageClick(index: number) {
  page.value = index;
}

const { data: posts } = await useSanityQuery<SanityDocument[]>(
  groq`*[
      _type == "post"
      && defined(slug.current)
      && ($filter == '' || $filter in (categories[]->slug.current))
      ]|order(publishedAt desc)[$start...$end]{
        _id, image, "categories": categories[]->{_id, title, slug}, title, slug, publishedAt
      }`,
  { filter, start: start, end: end }
);

const { data: postsCount } = await useSanityQuery<number>(
  groq`count(*[
      _type == "post"
      && defined(slug.current)
      && ($filter == '' || $filter in (categories[]->slug.current))
    ])`,
  { filter }
);

const NbMaxPages = computed(() => {
  if (!postsCount.value) return 1;
  return Math.ceil(postsCount.value / perPage);
});

const { data: categories } = await useSanityQuery<SanityDocument[]>(
  groq`*[
      _type == "category"
      && defined(slug.current)
    ]{_id, title, slug}`
);

const { urlFor } = useSanityImage();

function onCategoryClick(category: SanityDocument) {
  page.value = 1;
  if (filter.value === category.slug.current) {
    filter.value = "";
  } else {
    filter.value = category.slug.current;
  }
}
</script>

<template>
  <main>
    <h1 class="a-title">Tous les articles</h1>

    <div class="c-categories">
      <div
        v-for="category in categories"
        :key="category._id"
        :class="['c-categories__item', { '-is-active': filter === category.slug.current }]"
        @click="onCategoryClick(category)"
      >
        <Button
          class="button -orange"
          :label="category.title"
          :active="filter === category.slug.current"
        />
      </div>
    </div>

    <div class="c-blog">
      <div v-if="!posts || posts.length === 0">Il n'y a pas d'articles</div>
      <div v-for="post in posts" :key="post._id" class="c-blog__card">
        <NuxtLink :to="`/blog/${post.slug.current}`">
          <div class="c-blog__card-image">
            <img
              v-if="post.image"
              :src="urlFor(post.image)?.url()"
              alt="Post image"
              class="c-blog__card-img"
            />
            <div v-else class="c-blog__card-no-image">Pas d'image</div>
          </div>
          <div class="c-blog__card-content">
            <div v-for="category in post.categories" :key="category._id">
              <Button class="button -small -blog" :label="category.title" />
            </div>
            <h2 class="c-blog__card-title">{{ post.title }}</h2>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div class="c-blog__pagination">
      <div v-for="i in NbMaxPages" :key="i" @click="onPageClick(i)">
        <Button class="button -outline" :active="page === i" :number="i" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.a-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: $secondaryColor;
  font-family: $fontTitleFamily;
}

.c-categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 6rem;

  &__item {
    color: #007bff;
    text-align: center;
    font-size: 1.2rem;
  }
}

.c-blog {
  max-width: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  &__card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    &-title {
      font-size: 1.2rem;
      color: $primaryColor;
      margin: 0.5rem 0;

    }

    &-image {
      width: 100%;
      height: 160px;
      background: #f0f0f0;

      .c-blog__card-img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      &-no-image {
        font-size: 0.9rem;
        color: #6c757d;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    }

    &-content {
      padding: 1rem;

      &-title {
        font-size: 1.2rem;
        color: #007bff;
        margin: 0.5rem 0;
        text-align: left;
      }

      &-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 5rem;
    margin-bottom: 7rem;
  }
}

</style>
