<script setup>

const globalHabits = ref([]);
const personalHabits = ref([]);

async function fetchData() {
  try {
    const response = await fetch('http://localhost:4000/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      }
    });

    if (!response.ok) {
      console.error('Erreur lors de la récupération des données:', await response.json());
      return;
    }

    const data = await response.json();
    globalHabits.value = data.globalHabits || []; 
    personalHabits.value = data.personalHabits || [];

  } catch (error) {
    console.error(error);
  }
}

onMounted(fetchData);

const habitTitle = ref('');
const habitDescription = ref('');
const habitIsGloable = ref(false);
const feedbackMessage = ref('');

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
        is_global: habitIsGloable.value

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
      <li v-for="habit in globalHabits" :key="habit.id">
        <h3>{{ habit.title }}</h3>
        <p>{{ habit.description }}</p>
      </li>
    </ul>
  </div>

  <div>
    <h2>Habitudes personlles</h2>
    <ul>
      <li v-for="habit in personalHabits" :key="habit.id">
        <h3>{{ habit.title }}</h3>
        <p>{{ habit.description }}</p>
      </li>
    </ul>
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
        <label for="habitIsGloable">Rendre publique?</label>    
        <input
          id="habitIsGloable"
          v-model="habitIsGloable"
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