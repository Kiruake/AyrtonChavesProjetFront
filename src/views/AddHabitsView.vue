<script setup lang="ts">
import CardAddHabit from '../components/CardAddHabit.vue';

const variants = [
  { icon: '💪🏾', title: 'Musculation' },
  { icon: '🏃🏾', title: 'Course à pieds' },
  { icon: '🚴🏽‍♂️', title: 'Vélo' },
  { icon: '⚽', title: 'Football' },
  { icon: '🤸🏽‍♂️', title: 'Gym' },
  { icon: '🏊🏽', title: 'Natation' },
  { icon: '🧘🏻', title: 'Yoga' },
  { icon: '🥊', title: 'Boxe' },
  { icon: '💧', title: 'Hydratation' },
  { icon: '🪢', title: 'Corde à sauter' },
  { icon: '👟', title: 'HIIT' },
  { icon: '🎾', title: 'Tennis' },
];
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

    
    <div class="cards">
      <CardAddHabit
        v-for="(variant, index) in variants"
        :key="index"
        :variant="variant"
      />
    </div>
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
    font-size: $fontTitleSize;

    @include large-up {
      font-size: $fontTitleSizeLarge;
        margin-left: 3.5rem;
        text-align: start;
        margin-bottom: -30px;
    }

  }

  &__subhead {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    @include large-up {
        justify-content: flex-start;;
        margin-left:3.3rem;
      }

    &-icon {
      font-size: $fontSubTitleSize;
      margin-right: 0.7rem;

      @include large-up {
        font-size: 2.3rem;
      }

      @include medium-only {
        font-size: 1.8rem;
      }
    }

    &-text {
      font-family: $fontTitleFamily;
      color: $black;
      font-size: $fontSubTitleSize;

      @include large-up {
        font-size: $fontTitleSizeLarge;;
      }

    }
  }
}

.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @include large-up {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

  }
  
  @include medium-only {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }
}



</style>
