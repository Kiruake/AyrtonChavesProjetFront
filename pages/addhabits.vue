<script setup lang="ts">
import { ref } from 'vue';
import CardAddHabit from '../components/CardAddHabit.vue';

const variants = ref([
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
]);
</script>

<template>
  <main>
    <!-- Header -->
    <div class="head">
      <h1 class="head__title">Ajouter une habitude</h1>
      <div class="head__subhead">
        <h2 class="head__subhead-icon">🔥</h2>
        <h2 class="head__subhead-text">Les plus populaires</h2>
      </div>
    </div>

    <!-- Cards Section -->
    <div class="cards">
      <CardAddHabit
        v-for="(variant, index) in variants"
        :key="index"
        :variant="variant"
      />
    </div>

    <!-- Floating Button -->
    <div class="fixed-button">
      <button class="fixed-button__btn">
        <p>Custom habits</p>
      </button>
    </div>
  </main>
</template>

<style lang="scss">
/* Head Section */
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
      justify-content: flex-start;
      margin-left: 3.3rem;
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
        font-size: $fontTitleSizeLarge;
      }
    }
  }
}

/* Cards Section */
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

/* Floating Button */
.fixed-button {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  &__btn {
    background-color: orange;
    color: #f7f7f7;
    border: none;
    font-weight: 700;
    border-radius: 64px;
    width: 140px;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: scale(1);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
