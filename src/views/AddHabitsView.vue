<script setup lang="ts">


import CardAddHabit from '../components/CardAddHabit.vue'


</script>

<template>
  <main>

    
    <h1 class="title">ajouter une habitude</h1>
  

<CardAddHabit/>

  </main>
</template>

<style lang="scss">

.title {
  font-family: $fontTitleFamily;
  text-align: center;
  color: $primaryColor;
  font-size: 2rem
}

</style>
