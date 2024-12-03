<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError

})

 const handleError = () => {
     clearError({ redirect: '/' })
 }

</script>

<template>
    <main>
        <div class ="error" v-if="error">
            <h1 class="error__title">{{ error.statusCode }}</h1>
            <p class="error__content">{{ error.message }}</p>
        </div>
        <button class="button -center"click="handleError">Retour</button>
    </main>
</template>

<style lang="scss">


.error {
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
  &__content {
    font-size: 1.6rem;
    width: 80%;
    display: block;
    margin: auto;
    margin-bottom: 10rem;
    text-align: center;
  }
}   


</style>