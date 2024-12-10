<script setup>



const {data, refresh } = await useAsyncData('dashboard', async () => { 
    return await useTrackingApi('/dashboard', {method:'GET'});
});

const habitTitle = ref('');
const habitDescription = ref('');
const habitIsGlobal = ref(false);
const feedbackMessage = ref('');


const habitTitleEdit = ref('');
const habitDescriptionEdit = ref('');
const habitIsGlobalEdit = ref(false);



const selectedHabit = ref(null);


async function editHabit() {
  try {
  
    const response = await fetch(`http://localhost:4000/habits/${selectedHabit.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      },
      body: JSON.stringify({
        title: habitTitleEdit.value,
        description: habitDescriptionEdit.value,
        is_global: habitIsGlobalEdit.value,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      feedbackMessage.value = `Erreur : ${error.message}`;
      console.error('Erreur:', error);
      return;
    }

    const habit = await response.json();
    feedbackMessage.value = `Habitude modifiée : ${habit.title}`;
   
  
    const habitIndex = data.value.globalHabits.findIndex(h => h.id === selectedHabit.value.id);
    if (habitIndex !== -1) {
      data.value.globalHabits[habitIndex] = habit; 
    }

    refresh();

    selectedHabit.value = null;
    habitTitleEdit.value = '';
    habitDescriptionEdit.value = '';
    habitIsGlobalEdit.value = false;
  } catch (error) {
    feedbackMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
  }
}

function selectHabitForEdit(habit) {
  selectedHabit.value = habit;
  habitTitleEdit.value = habit.title;
  habitDescriptionEdit.value = habit.description;
  habitIsGlobalEdit.value = habit.is_global === 1;
}

async function deleteHabit(habit) {
  try {
    const response = await fetch(`http://localhost:4000/habits/${habit.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      feedbackMessage.value = `Erreur : ${error.message}`;
      console.error('Erreur:', error);
      return;
    }

    const EditHab = await response.json();
    feedbackMessage.value = `Habitude supprimée`;

    refresh();

    const habitIndex = data.value.globalHabits.findIndex(h => h.id === habit.id);
    if (habitIndex !== -1) {
      data.value.globalHabits.splice(habitIndex, 1);
    }

  } catch (error) {
    feedbackMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
  }
}



function onHabitCreated() {
    console.log('une nouvelle habitude a été créée');
    refresh();
}

function onHabitUpdated() {
    console.log('une habitude a été modifiée');
    refresh();
}

</script>





<template>
<main>
<h1>Dashboard</h1>

  <div>
    <h2>Habitudes globales</h2>
    <ul>
      <li v-for="habit in data.globalHabits" :key="habit.id">
        <h3>{{ habit.title }}</h3>
        <p>{{ habit.description }}</p>
      </li>
    </ul>
  </div>

  <div>
    <h2>Habitudes personnelles</h2>
    <ul>
      <li v-for="habit in data.personalHabits" :key="habit.id">
        <h3>{{ habit.title }}</h3>
        <p>{{ habit.description }}</p>
        <button @click="selectHabitForEdit(habit)">Modifier</button>
        <button @click="deleteHabit(habit)">Supprimer</button>
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