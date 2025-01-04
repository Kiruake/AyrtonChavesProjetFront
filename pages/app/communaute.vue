<script setup lang="ts">
import type { DashboardPayload } from '~/@types/dashboard';

const {data} = await useAsyncData<DashboardPayload>('dashboard', async () => { 
    return await useTrackingApi('/dashboard', {method: 'GET'});
});


</script>

<template>
<main v-if="data">
  <div class="cards_global-habits">
    <GlobalHabitsList :habits="data.globalHabits" />
  </div>

</main>
</template>

<style lang="scss">
.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @include large-up {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 3rem;
  }

@include medium-only {
  flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
}

}
</style>
