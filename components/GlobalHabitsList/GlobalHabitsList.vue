<script setup lang="ts">
import type { GlobalHabit } from '~/@types/dashboard';
defineProps<{ habits: GlobalHabit[] }>();

</script>

<template>

<div class="head">
      <div class="head__subhead">
          <h2 class="head__subhead-text">Les habitudes de la communauté</h2>
      </div>
    </div>

   <div class="global-habits-list">
      <div v-for="habit in habits" :key="habit.id" class="global-habits-list__habit">
        <h3 class="global-habits-list__habit-title">{{ habit.title }}</h3>
        <p class="global-habits-list__habit-description">{{ habit.description }}</p>
      </div>
  </div>

  <div class="fixed-button">
    <NuxtLink to="/app/dashboard" class="fixed-button__link">
      <button class="fixed-button__btn">
        <p>Custom habits</p>
      </button>
    </NuxtLink>
    </div>

</template>

<style lang="scss">

.head {
  display: block;

  &__subhead {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    @include large-up {
      justify-content: flex-start;
      margin-left: 3.3rem;
    }


    &-text {
      font-family: $fontTitleFamily;
      color: orange;
      font-size: 2.1rem;
      margin-bottom: 1rem;

      @include large-up {
        font-size: $fontTitleSizeLarge;
      }
    }
  }
}


.global-habits-list {
    border-radius: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
    padding: 0 2rem 2rem 2rem ;

    @include large-up {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        margin-left: 3rem;
        margin-right: 3rem;
        padding: 0;
    }

    @include medium-only {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
       
    }
    

  &__title {
    color: $primaryColor;
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    $fontTextFamily: "Nunito", sans-serif;
    }


  &__habit {
    background-color: white;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &-title {
      margin: 0 0 0.5rem;
      color: $primaryColor;
      font-size: 1rem;
    }

    &-description {
      margin: 0;
      font-size: 0.8rem;
      line-height: 1.5;
    }
  }
}

.fixed-button {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  @include large-up {
    position: relative;
    margin: 0 auto;
    justify-content: center;
    display: flex;
    margin-top: 5rem;
  }

  @include medium-only {
    position: relative;
    margin: 0 auto;
    justify-content: center;
    display: flex;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem
  }

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
