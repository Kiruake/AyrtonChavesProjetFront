<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const  route  = useRoute();

const { data: post } = useSanityQuery(POST_QUERY, {slug: route.params.slug}
);
//const { projectId, dataset } = useSanity().client.config();
//const urlFor = (source: SanityImageSource) =>
 // projectId && dataset
  //  ? imageUrlBuilder({ projectId, dataset }).image(source)
   // : null;
</script>

<template>
  <main>
    <div>
     <h1> Une page d'article de blog :{{route.params.slug}}</h1>
      <h1>Contenu du post : {{ post }}</h1>
    </div>
  </main>
</template>