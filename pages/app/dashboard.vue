<script setup>



const { data, error, refresh } = await useAsyncData(
  'fetchDashboard', // Clé unique
  () =>
    $fetch('http://localhost:4000/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
      },
    })
);

const habitTitle = ref('');
const habitDescription = ref('');
const habitIsGlobal = ref(false);
const feedbackMessage = ref('');


const habitTitleEdit = ref('');
const habitDescriptionEdit = ref('');
const habitIsGlobalEdit = ref(false);

async function addHabit() {
  try {
    const response = await fetch('http://localhost:4000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      },
      body: JSON.stringify({
        title: habitTitle.value,
        description: habitDescription.value,
        is_global: habitIsGlobal.value

      })
    });

    if (!response.ok) {
      const error = await response.json();
      feedbackMessage.value = `Erreur : ${error.message}`;
      console.error('Erreur:', error);
      return;
    }
    
    const data = await response.json();
    feedbackMessage.value = `Habitude ajoutée : ${data.title}`;
    console.log('Succès:', data);
    
    // Réinitialiser les champs du formulaire
    habitTitle.value = '';
    habitDescription.value = '';
    refresh();
} catch (error) {
    feedbackMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
}
}

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

  <!-- Formulaire d'édition -->
  <div v-if="selectedHabit">
    <h2>Modifier une habitude</h2>
    <form @submit.prevent="editHabit">
      <div>
        <label for="habitTitle">Titre :</label>
        <input
          id="habitTitle"
          v-model="habitTitleEdit"
          type="text"
          placeholder="Titre de l'habitude"
          required
        />
      </div>
      <div>
        <label for="habitDescription">Description :</label>
        <textarea
          id="habitDescription"
          v-model="habitDescriptionEdit"
          placeholder="Description de l'habitude"
        ></textarea>
      </div>

      <div>
        <label for="habitIsGlobal">Rendre publique?</label>
        <input
          id="habitIsGlobal"
          v-model="habitIsGlobalEdit"
          type="checkbox"
        />
      </div>

      <button type="submit">Modifier</button>
      <button type="button" @click="selectedHabit = null">Annuler</button>
    </form>
  </div>


  <div>
    <h2>Ajouter une habitude</h2>
    <form @submit.prevent="addHabit">
      <div>
        <label for="habitTitle">Titre :</label>
        <input
          id="habitTitle"
          v-model="habitTitle"
          type="text"
          placeholder="Titre de l'habitude"
          required
        />
      </div>
      <div>
        <label for="habitDescription">Description :</label>
        <textarea
          id="habitDescription"
          v-model="habitDescription"
          placeholder="Description de l'habitude"
        ></textarea>
      </div>

      <div>
        <label for="habitIsGlobal">Rendre publique?</label>    
        <input
          id="habitIsGlobal"
          v-model="habitIsGlobal"
          type="checkbox"
        />
      </div>

      <button type="submit">Ajouter</button>
    </form>
    <p v-if="feedbackMessage">{{ feedbackMessage }}</p>
  </div>



</main>
</template>



<style lang="scss">

</style>