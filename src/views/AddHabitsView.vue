<script setup lang="ts">


import CardAddHabit from '../components/CardAddHabit.vue'


</script>

<template>
  <main>

  <div class="head">
  <h1 class="head__title">Ajouter une habitude</h1>
    <div class="head__subhead">
      <h2 class="head__subhead-icon">🔥</h2>
      <h2 class="head__subhead-text">Les plus populaires</h2>
    </div>
  </div>


  

<CardAddHabit/>

  </main>
</template>

<style lang="scss">

.head {
display: block;

&__title {
  font-family: $fontTitleFamily;
  color: $primaryColor;
  text-align: center; 
  margin-bottom: 5px;

}

&__subhead {
  display: flex;
  justify-content: center;
  align-items: center;

&-icon {
  font-size: $fontSubTitleSize;
  margin-right: 0.7rem;
}

&-text {
  font-family: $fontTitleFamily;
  color: $black;
  font-size: $fontSubTitleSize;
}

}

}
</style>
