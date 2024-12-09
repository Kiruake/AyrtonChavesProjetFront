<script setup lang="ts">

import type { SanityDocument } from "@sanity/client";


const { data: homepage } = await useSanityQuery<SanityDocument>(groq`
  *[_type == "homepage" && defined(hero)][0] {
    title,
    hero {
      title,
      text,
      stats[] {
        value,
        text
      }
    }
  }
`);
 

</script>

<template>
  <main>

  <div class="homepage">
    <h1>{{ homepage?.title }}</h1> 
  </div>
  
  <div>
    <p>{{ homepage?.hero.title }}</p>
    <p>{{ homepage?.hero.text }}</p>
  </div>


  <div>
    <ul>
      <li v-for="stat in homepage?.hero.stats" :key="stat._key">
        <p>{{ stat.value }}</p>
        <p>{{ stat.text }}</p>
      </li>
    </ul>
  </div>


  </main>
</template>