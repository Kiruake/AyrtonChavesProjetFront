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

  @media (min-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 3rem;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }
}
</style>
