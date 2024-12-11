<script setup lang="ts">
import type { NuxtError } from '#app'

 defineProps({
  error : {
    type: Object as () => NuxtError,
    default: null
  }})

 const handleError = () => {
     clearError({ redirect: '/' })
 }

</script>

<template>
    <main>
        <div v-if="error" class ="error">
            <h1 class="error__title">{{ error.statusCode }}</h1>
            <p class="error__content">{{ error.message }}</p>
        </div>
        <Button class="button -center" :label="'Retourner à l\'accueil'" @click="handleError"/>
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