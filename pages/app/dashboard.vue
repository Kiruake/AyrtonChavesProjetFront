<script setup lang="ts">
import type { DashboardPayload, PersonalHabit } from '~/@types/dashboard';

const {data, refresh} = await useAsyncData<DashboardPayload>('dashboard', async () => { 
    return await useTrackingApi('/dashboard', {method: 'GET'});
});

const habitTitleEdit = ref('');
const habitDescriptionEdit = ref('');
const habitIsGlobalEdit = ref(false);

const selectedHabit = ref<PersonalHabit|null>(null);
function selectHabitForEdit(habit: PersonalHabit) {
  selectedHabit.value = habit;
  habitTitleEdit.value = habit.title;
  habitDescriptionEdit.value = habit.description;
  habitIsGlobalEdit.value = habit.is_global === 1;
}

function onHabitCreated() {
    console.log('une nouvelle habitude a été créée');
    refresh();
}

function onHabitUpdated() {
    console.log('une habitude a été modifiée');
    refresh();
}

function onHabitDeleted() {
    console.log('une habitude a été supprimée');
    refresh();
}

function OnHabitTracking() {
    console.log('une habitude a été suivie');
    refresh();
}

function OnHabitHistory() {
    console.log('une habitude a besoin d\'un historique');
    refresh();
}
</script>

<template>
<main v-if="data">
  <div class="cards_global-habits">
    <GlobalHabitsList :habits="data.globalHabits" />
  </div>

  <div>
    <PersonalHabitsList
      :habits="data.personalHabits"
      @edit="selectHabitForEdit"
      @habit:created="onHabitCreated"
      @habit:updated="onHabitUpdated"
      @habit:deleted="onHabitDeleted"
      @tracking:updated="OnHabitTracking"
      @tracking:history="OnHabitHistory"
    />
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
