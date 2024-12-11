<script setup>

const {data, refresh } = await useAsyncData('dashboard', async () => { 
    return await useTrackingApi('/dashboard', {method:'GET'});
});

const feedbackMessage = ref('');

const habitTitleEdit = ref('');
const habitDescriptionEdit = ref('');
const habitIsGlobalEdit = ref(false);

const selectedHabit = ref(null);
function selectHabitForEdit(habit) {
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
    console.log('une habitude a été suprimmée');
    refresh();
}

</script>

<template>
<main>
<h1>Dashboard</h1>

  <div>
    <GlobalHabitsList :habits="data.globalHabits" />
  </div>

  <div>
    <h2>Habitudes personnelles</h2>
    <ul>
      <li v-for="habit in data.personalHabits" :key="habit.id">
        <h3>{{ habit.title }}</h3>
        <p>{{ habit.description }}</p>
        <button @click="selectHabitForEdit(habit)">Modifier</button>
        <DeleteHabit
            :id="habit.id"
            @habit:delete="onHabitDeleted"
          />
      </li>
    </ul>
  </div>

  
  <AddHabitForm @habit:created="onHabitCreated" />

  <EditHabitForm
  v-if="selectedHabit"
  :id="selectedHabit.id"
  :title="selectedHabit.title"
  :description="selectedHabit.description"
  :is_global="selectedHabit.is_global === 1" 
  @cancel="selectedHabit = null"
  @habit:updated="onHabitUpdated"
/>





</main>
</template>



<style lang="scss">

</style>