<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

useSeoMeta({
    title: "Blog | Tracking App",
    description: "Tout les articles pour vous aider dans votre quotidien",
    ogDescription: "Tout les articles pour vous aider dans votre quotidien",
    ogImage: "/images/LogoTracker.svg",
});

const filter= ref<string>('');

const page = ref<number>(1);
const perPage = 3;

const start = computed(() => (page.value - 1) * perPage);
const end = computed(() => page.value * perPage);

function onPageClick(index: number) {
    page.value = index;
}


const { data: posts } = await useSanityQuery<SanityDocument[]>(groq`*[
    _type == "post"
    && defined(slug.current)
    && ($filter == '' || $filter in (categories[]->slug.current))
    ]|order(publishedAt desc)[$start...$end]{_id, image, "categories": categories[]->{_id,title, slug}, title, slug, publishedAt} `
    ,{filter, start: start, end: end}); 
    
    const { data: postsCount } = await useSanityQuery<number>(groq`count(*[
    _type == "post"
    && defined(slug.current)
    && ($filter == '' || $filter in (categories[]->slug.current))
    
])`, {filter});

const NbMaxPages = computed(() => {
    if (!postsCount.value) return 1;
    return Math.ceil(postsCount.value / perPage);
});

const { data: categories } = await useSanityQuery<SanityDocument[]>(groq`*[
    _type == "category"
    && defined(slug.current)
    ]{_id ,title, slug}`);
    
    const { urlFor } = useSanityImage();
    
function onCategoryClick(category: SanityDocument) {
    page.value = 1;
    if (filter.value === category.slug.current) {
        filter.value = '';
    } else {
        filter.value = category.slug.current;
    }    
}

</script>

<template>

    <main>

        <h1 class="a-title">Tous les articles</h1>

        <div class="c-categories">
        <div v-for="category in categories" :key="category._id" :class="['c-categories__item' , {'-is-active': filter === category.slug.current}]" @click="onCategoryClick(category)">
            <Button class="button -outline" :label="category.title" :active="filter === category.slug.current"/>
        </div>
        </div>

        <div class="c-blog">
        <div v-if="!posts || posts.length === 0">Il n'y a pas d'articles</div>
        <div v-for="post in posts" :key="post._id">
            <div>
            <NuxtLink :to="`/blog/${post.slug.current}`">  
                <h1 class="c-blog__title">{{ post.title }}</h1>
            </NuxtLink>
            </div>

            <img v-if="post.image" class="c-blog__image" :src="urlFor(post.image)?.url()">  
            <div v-else>Pas d'image</div>     

            <div class="c-blog__categories">
            <div v-for="category in post.categories" :key="category._id">
                <Button class="button -small -blog" :label="category.title"/>
            </div>
            </div>
        </div>

        
        
    </div>
    
    <div class="c-blog__pagination">
        <div v-for="i in NbMaxPages" :key="i" @click="onPageClick(i)">
            <Button class="button -outline" :active="page === i" :number="i"/>
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
    position:relative;
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

  &__pagination {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
}


</style>
