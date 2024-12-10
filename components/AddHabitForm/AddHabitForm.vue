<script setup lang="ts">
const habitTitle = ref('');
const habitDescription = ref('');
const habitIsGlobal = ref(false);
const feedbackMessage = ref('');


const emit = defineEmits(['habit:created']);
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

    emit('habit:created');

} catch (error) {
    feedbackMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
}
}


</script>

<template>
    <div class="c-add-habit-form">
        <h2>Ajouter une Habitude</h2>
        <form @submit.prevent="addHabit">
            <div class="c-add-habit-formgroup">
                <label for="title">Titre</label>
                <input id="title" v-model="habitTitle" type="text" placeholder="Entrez le titre de la Habitude">
            </div>
            <div class="c-add-habit-formgroup">
                <label for="description">Description</label>
                <input id="description" v-model="habitDescription" type="text"  placeholder="Entrez la description de la Habitude">
            </div>
            <Button >Ajouter</Button>
        </form>
    </div>
</template>

<style lang="scss">
</style>